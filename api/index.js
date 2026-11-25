const crypto = require('crypto');

const GITHUB_OWNER = 'sji-design';
const GITHUB_REPO = 'topfast-reports';

function setCors(req, res) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
}

function sendJson(res, status, obj) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').send(JSON.stringify(obj));
}

function toB64(str) {
  return Buffer.from(str, 'utf8').toString('base64');
}

function fromB64(b64) {
  return Buffer.from(String(b64 || '').replace(/\s+/g, ''), 'base64').toString('utf8');
}

function makeSlug(title, id) {
  const clean = String(title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 36);
  return (clean || 'report') + '-' + id.slice(0, 6);
}

function getSiteBase(req) {
  if (process.env.SITE_BASE) return process.env.SITE_BASE.replace(/\/$/, '');
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'sji-design.github.io/topfast-reports';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  return `${proto}://${host}`;
}

async function tgCall(method, payload) {
  const r = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return r.json();
}

async function ghReq(path, opts = {}) {
  const r = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'topfast-reports-vercel',
      ...(opts.headers || {}),
    },
  });
  return r;
}

async function ghGet(path) {
  const r = await ghReq(path);
  if (r.status === 404) return null;
  if (!r.ok) throw new Error('GitHub read error: ' + r.status);
  return r.json();
}

async function ghPut(path, contentStr, message, sha) {
  const body = { message, content: toB64(contentStr), branch: 'main' };
  if (sha) body.sha = sha;
  const r = await ghReq(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`GitHub write error (${r.status}): ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

async function ghDel(path, message, sha) {
  const r = await ghReq(path, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sha, branch: 'main' }),
  });
  if (!r.ok) throw new Error(`GitHub delete error (${r.status}): ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

function checkAdmin(passcode) {
  const expected = process.env.ADMIN_PASSCODE || 'Alirez@4064118';
  return String(passcode || '').trim() === expected;
}

async function publishPending(req, pending) {
  const slug = makeSlug(pending.title, pending.id);
  await ghPut(`reports/${slug}.md`, pending.markdown, `Publish approved report: ${pending.title} (${slug})`);

  const mf = await ghGet('reports-manifest.json');
  let manifest = [];
  if (mf && mf.content) {
    try { manifest = JSON.parse(fromB64(mf.content)); if (!Array.isArray(manifest)) manifest = []; } catch { manifest = []; }
  }
  const nowIso = pending.dateIso || new Date().toISOString().slice(0, 10);
  manifest.unshift({
    slug,
    title: pending.title,
    summary: pending.summary,
    author: pending.author,
    product: pending.product || 'CRM TopFast',
    category: pending.category || 'Report',
    dateFa: pending.dateFa || 'منتشرشده',
    dateEn: pending.dateEn || nowIso,
    dateIso: nowIso,
    kpis: Array.isArray(pending.kpis) ? pending.kpis.slice(0, 3) : [],
    color: '#59d499',
  });
  await ghPut('reports-manifest.json', JSON.stringify(manifest, null, 2) + '\n', `Update manifest: ${slug}`, mf ? mf.sha : undefined);
  return `${getSiteBase(req)}/report-viewer.html?slug=${encodeURIComponent(slug)}`;
}

async function handleChat(body, res) {
  if (!process.env.GEMINI_API_KEY) return sendJson(res, 500, { error: 'کلید GEMINI_API_KEY روی سرور ثبت نشده است.' });
  const message = String(body.message || '').trim().slice(0, 2000);
  const reportTitle = String(body.reportTitle || 'گزارش TopFast CRM').slice(0, 200);
  const context = String(body.context || '').slice(0, 120000);
  const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
  if (!message) return sendJson(res, 400, { error: 'متن پیام خالی است.' });

  const systemInstruction = `تو دستیار هوشمند فارسی‌زبان «مرکز گزارش‌های TopFast CRM» هستی.
وظیفه تو کمک به خواننده برای درک سریع، دقیق و کاربردی گزارش «${reportTitle}» است.
قوانین پاسخ‌دهی:
1. پاسخ را منحصراً بر اساس داده‌های گزارش زیر بنویس و هیچ اطلاعاتی از خودت نساز. اگر موردی در گزارش نبود، صادقانه بگو.
2. کوتاه، ساختاریافته و خوانا بنویس (از بولت‌پوینت و **بولد** برای نکات کلیدی استفاده کن).
3. هر زمان به فلو، رقیب، شدت یا اولویت (P0/P1/P2) اشاره می‌کنی، دقیق نام ببر.

--- محتوای گزارش ---
${context}`;

  const contents = [];
  for (const h of history) {
    if (!h || !h.text) continue;
    contents.push({ role: h.role === 'model' ? 'model' : 'user', parts: [{ text: String(h.text).slice(0, 2000) }] });
  }
  contents.push({ role: 'user', parts: [{ text: message }] });

  const models = Array.from(new Set([process.env.GEMINI_MODEL || 'gemini-3.8-flash', 'gemini-flash-lite-latest', 'gemini-flash-latest']));
  let apiRes = null, data = null;
  for (const model of models) {
    apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: systemInstruction }] }, contents, generationConfig: { temperature: 0.35, maxOutputTokens: 1200 } }),
    });
    data = await apiRes.json();
    if (apiRes.ok) break;
    if (![404, 429, 500, 503].includes(apiRes.status)) break;
  }
  if (!apiRes || !apiRes.ok) return sendJson(res, apiRes?.status === 429 ? 429 : 502, { error: data?.error?.message || 'خطا در ارتباط با سرویس Gemini' });
  const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim() || 'پاسخی از مدل دریافت نشد.';
  return sendJson(res, 200, { reply });
}

module.exports = async (req, res) => {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const sub = url.pathname.replace(/^\/api\/?/, '/');
  const body = (req.body && typeof req.body === 'object') ? req.body : {};

  try {
    if (req.method === 'GET' && (sub === '/' || sub === '')) {
      return sendJson(res, 200, { ok: true, service: 'topfast-reports-vercel', model: process.env.GEMINI_MODEL || 'gemini-3.8-flash' });
    }

    if (req.method === 'GET' && sub === '/live/overrides') {
      const f = await ghGet('report-overrides.json');
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).setHeader('Content-Type', 'application/json; charset=utf-8').send(f && f.content ? fromB64(f.content) : '{}');
    }

    if (req.method === 'GET' && sub.startsWith('/live/data/')) {
      const repId = sub.endsWith('/issues') ? 'issues' : 'benchmark';
      const f = await ghGet(`data-${repId}.json`);
      if (!f || !f.content) return sendJson(res, 404, { empty: true });
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).setHeader('Content-Type', 'application/json; charset=utf-8').send(fromB64(f.content));
    }

    if (req.method === 'GET' && sub.startsWith('/preview/')) {
      const id = sub.slice('/preview/'.length).replace(/[^a-zA-Z0-9]/g, '');
      const f = await ghGet(`pending/${id}.json`);
      if (!f || !f.content) return sendJson(res, 404, { error: 'پیش‌نمایش پیدا نشد یا قبلاً بررسی شده است.' });
      return sendJson(res, 200, JSON.parse(fromB64(f.content)));
    }

    if (req.method === 'POST' && sub === '/submit') {
      const title = String(body.title || '').trim().slice(0, 160);
      const author = String(body.author || '').trim().slice(0, 80);
      const product = String(body.product || 'CRM TopFast').trim().slice(0, 48);
      const category = String(body.category || 'Report').trim().slice(0, 40);
      const summary = String(body.summary || '').trim().slice(0, 400);
      const dateFa = String(body.dateFa || '').trim().slice(0, 40);
      const dateEn = String(body.dateEn || '').trim().slice(0, 30);
      const dateIso = String(body.dateIso || '').trim().slice(0, 20);
      const markdown = String(body.markdown || '');
      const kpis = Array.isArray(body.kpis) ? body.kpis.slice(0, 3) : [];
      if (!title || !author || markdown.trim().length < 40) return sendJson(res, 400, { error: 'عنوان، نویسنده و متن کامل فایل Markdown الزامی است.' });
      if (markdown.length > 512000) return sendJson(res, 413, { error: 'حجم فایل بیشتر از ۵۰۰ کیلوبایت است.' });

      const id = crypto.randomBytes(6).toString('hex');
      const rec = { id, title, author, product, category, summary, dateFa, dateEn, dateIso, kpis, markdown, createdAt: new Date().toISOString() };
      await ghPut(`pending/${id}.json`, JSON.stringify(rec), `Queue pending report: ${title} (${id})`);

      const previewUrl = `${getSiteBase(req)}/report-viewer.html?preview=${id}`;
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.ADMIN_TELEGRAM_CHAT_ID) {
        await tgCall('sendMessage', {
          chat_id: process.env.ADMIN_TELEGRAM_CHAT_ID,
          text: `گزارش جدید برای تأیید ارسال شد:\n\nعنوان: ${title}\nمحصول: ${product}\nنویسنده: ${author}\nدسته‌بندی: ${category}\nخلاصه: ${summary || '-'}\n\nپیش‌نمایش:\n${previewUrl}`,
          reply_markup: { inline_keyboard: [[{ text: 'تأیید و انتشار', callback_data: `approve:${id}` }, { text: 'رد کردن', callback_data: `reject:${id}` }]] },
        });
      }
      return sendJson(res, 200, { ok: true, id, previewUrl });
    }

    if (req.method === 'POST' && sub === '/telegram-webhook') {
      const cb = body?.callback_query;
      if (!cb || !cb.data) return res.status(200).send('ok');
      const fromChat = String(cb.message?.chat?.id || cb.from?.id || '');
      if (String(process.env.ADMIN_TELEGRAM_CHAT_ID) !== fromChat) {
        await tgCall('answerCallbackQuery', { callback_query_id: cb.id, text: 'دسترسی غیرمجاز', show_alert: true });
        return res.status(200).send('ok');
      }
      const [action, id] = String(cb.data).split(':');
      const pf = await ghGet(`pending/${id}.json`);
      if (!pf || !pf.content) {
        await tgCall('answerCallbackQuery', { callback_query_id: cb.id, text: 'این درخواست قبلاً بررسی شده است.' });
        return res.status(200).send('ok');
      }
      const pending = JSON.parse(fromB64(pf.content));
      if (action === 'reject') {
        await ghDel(`pending/${id}.json`, `Reject pending report ${id}`, pf.sha);
        await tgCall('answerCallbackQuery', { callback_query_id: cb.id, text: 'رد و حذف شد.' });
        await tgCall('editMessageText', { chat_id: cb.message.chat.id, message_id: cb.message.message_id, text: `رد شد: ${pending.title} (${pending.author})` });
      } else if (action === 'approve') {
        const liveUrl = await publishPending(req, pending);
        await ghDel(`pending/${id}.json`, `Clear approved pending ${id}`, pf.sha);
        await tgCall('answerCallbackQuery', { callback_query_id: cb.id, text: 'منتشر شد!' });
        await tgCall('editMessageText', { chat_id: cb.message.chat.id, message_id: cb.message.message_id, text: `منتشر شد: ${pending.title}\nنویسنده: ${pending.author}\n\nلینک گزارش:\n${liveUrl}` });
      }
      return res.status(200).send('ok');
    }

    if (req.method === 'POST' && sub.startsWith('/admin/')) {
      if (!checkAdmin(body.passcode)) return sendJson(res, 403, { error: 'رمز ورود ادمین اشتباه است.' });
      if (sub === '/admin/auth') return sendJson(res, 200, { ok: true });

      if (sub === '/admin/overrides-get') {
        const f = await ghGet('report-overrides.json');
        return sendJson(res, 200, { ok: true, overrides: f && f.content ? JSON.parse(fromB64(f.content)) : {} });
      }
      if (sub === '/admin/overrides-save') {
        const ex = await ghGet('report-overrides.json');
        await ghPut('report-overrides.json', JSON.stringify(body.overrides || {}, null, 2) + '\n', 'Admin update overrides', ex ? ex.sha : undefined);
        return sendJson(res, 200, { ok: true });
      }
      if (sub === '/admin/data-get') {
        const repId = body.id === 'issues' ? 'issues' : 'benchmark';
        const f = await ghGet(`data-${repId}.json`);
        if (!f || !f.content) return sendJson(res, 404, { error: `فایل data-${repId}.json پیدا نشد.` });
        return sendJson(res, 200, { ok: true, id: repId, data: JSON.parse(fromB64(f.content)) });
      }
      if (sub === '/admin/data-save') {
        const repId = body.id === 'issues' ? 'issues' : 'benchmark';
        const ex = await ghGet(`data-${repId}.json`);
        await ghPut(`data-${repId}.json`, JSON.stringify(body.data), `Admin edit ${repId} data`, ex ? ex.sha : undefined);
        return sendJson(res, 200, { ok: true, id: repId });
      }
      if (sub === '/admin/list') {
        const mf = await ghGet('reports-manifest.json');
        const items = mf && mf.content ? JSON.parse(fromB64(mf.content)) : [];
        return sendJson(res, 200, { ok: true, items: Array.isArray(items) ? items : [] });
      }
      if (sub === '/admin/pending-list') {
        const dir = await ghGet('pending');
        if (!Array.isArray(dir)) return sendJson(res, 200, { ok: true, items: [] });
        const items = [];
        for (const entry of dir) {
          if (!entry.name.endsWith('.json')) continue;
          const pf = await ghGet(`pending/${entry.name}`);
          if (pf && pf.content) {
            const rec = JSON.parse(fromB64(pf.content));
            items.push({ id: rec.id, title: rec.title, author: rec.author, product: rec.product, category: rec.category, summary: rec.summary, dateFa: rec.dateFa, createdAt: rec.createdAt });
          }
        }
        return sendJson(res, 200, { ok: true, items });
      }
      if (sub === '/admin/pending-approve') {
        const pid = String(body.id || '').replace(/[^a-zA-Z0-9]/g, '');
        const pf = await ghGet(`pending/${pid}.json`);
        if (!pf || !pf.content) return sendJson(res, 404, { error: 'درخواست پیدا نشد.' });
        const liveUrl = await publishPending(req, JSON.parse(fromB64(pf.content)));
        await ghDel(`pending/${pid}.json`, `Clear approved ${pid}`, pf.sha);
        return sendJson(res, 200, { ok: true, liveUrl });
      }
      if (sub === '/admin/pending-reject') {
        const pid = String(body.id || '').replace(/[^a-zA-Z0-9]/g, '');
        const pf = await ghGet(`pending/${pid}.json`);
        if (pf && pf.sha) await ghDel(`pending/${pid}.json`, `Reject ${pid}`, pf.sha);
        return sendJson(res, 200, { ok: true });
      }

      const slug = String(body.slug || '').replace(/[^a-zA-Z0-9_-]/g, '');
      if (!slug) return sendJson(res, 400, { error: 'شناسه گزارش نامعتبر است.' });
      const mdPath = `reports/${slug}.md`;
      if (sub === '/admin/get') {
        const f = await ghGet(mdPath);
        if (!f || !f.content) return sendJson(res, 404, { error: 'فایل گزارش پیدا نشد.' });
        return sendJson(res, 200, { ok: true, slug, markdown: fromB64(f.content) });
      }
      if (sub === '/admin/update') {
        const ex = await ghGet(mdPath);
        await ghPut(mdPath, String(body.markdown || ''), `Admin edit: ${slug}`, ex ? ex.sha : undefined);
        const mf = await ghGet('reports-manifest.json');
        if (mf && mf.content) {
          const manifest = JSON.parse(fromB64(mf.content));
          const i = manifest.findIndex((x) => x.slug === slug);
          if (i >= 0) {
            manifest[i] = { ...manifest[i], title: body.title || manifest[i].title, author: body.author || manifest[i].author, product: body.product || manifest[i].product, category: body.category || manifest[i].category, dateIso: body.dateIso || manifest[i].dateIso, dateFa: body.dateFa || manifest[i].dateFa, dateEn: body.dateEn || manifest[i].dateEn, summary: body.summary ?? manifest[i].summary };
            await ghPut('reports-manifest.json', JSON.stringify(manifest, null, 2) + '\n', `Admin update manifest: ${slug}`, mf.sha);
          }
        }
        return sendJson(res, 200, { ok: true, slug });
      }
      if (sub === '/admin/delete') {
        const ex = await ghGet(mdPath);
        if (ex && ex.sha) await ghDel(mdPath, `Admin delete: ${slug}`, ex.sha);
        const mf = await ghGet('reports-manifest.json');
        if (mf && mf.content) {
          const next = JSON.parse(fromB64(mf.content)).filter((x) => x.slug !== slug);
          await ghPut('reports-manifest.json', JSON.stringify(next, null, 2) + '\n', `Admin remove ${slug}`, mf.sha);
        }
        return sendJson(res, 200, { ok: true, deleted: slug });
      }
      return sendJson(res, 404, { error: 'Unknown admin route' });
    }

    if (req.method === 'POST') return await handleChat(body, res);
    return sendJson(res, 404, { error: 'Not found' });
  } catch (err) {
    return sendJson(res, 500, { error: String(err.message || err) });
  }
};
