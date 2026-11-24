(function () {
  if (window.__TOPFAST_AI_MOUNTED__) return;
  window.__TOPFAST_AI_MOUNTED__ = true;

  // Unified crisp Lucide-style SVG icon set
  const ICO = {
    spark: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.3L19 10.2l-5.1 1.9L12 17.5l-1.9-5.4L5 10.2l5.1-1.9L12 3z"/><path d="M19 3v3M20.5 4.5h-3M5 18v2M6 19H4"/></svg>',
    audio: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>',
    chat: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    mic: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>',
    play: '<svg class="tfai-ic-fill" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>',
    pause: '<svg class="tfai-ic-fill" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
    download: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    target: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
    alert: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    check: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    close: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    send: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    bot: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="3"/><path d="M12 2v6"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/></svg>',
    back15: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    fwd15: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>',
    vol: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>',
    mute: '<svg class="tfai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',
  };

  const isMdViewer = /report-viewer/i.test(location.pathname) || !!window.__MD_REPORT_DATA__;
  const isBenchmark = !isMdViewer && (/crm-benchmark/i.test(location.pathname) || document.title.includes('بنچمارک'));
  const isIssues = !isMdViewer && (/crm-issues/i.test(location.pathname) || document.title.includes('ایشو') || document.title.includes('مغایرت'));
  const pageKey = isMdViewer ? 'md' : (isBenchmark ? 'benchmark' : (isIssues ? 'issues' : 'benchmark'));

  const cfg = window.TOPFAST_AI_CONFIG || {};
  const endpoint = (cfg.endpoint || '').trim();
  const mdData = window.__MD_REPORT_DATA__ || null;
  const audioSrc = (mdData && mdData.audio) || (cfg.audio && cfg.audio[pageKey]) || '';
  const dataObj = typeof D !== 'undefined' ? D : null;

  // Apply live admin content edits (instant from Cloudflare KV if available, fallback to data-*.json)
  if (!isMdViewer && dataObj && Array.isArray(dataObj.CATEGORIES) && (isBenchmark || isIssues)) {
    const repKey = isBenchmark ? 'benchmark' : 'issues';
    const liveUrl = endpoint ? (endpoint.replace(/\/$/, '') + '/live/data/' + repKey + '?t=' + Date.now()) : '';
    const staticUrl = './data-' + repKey + '.json?t=' + Date.now();
    const fetchPatch = liveUrl
      ? fetch(liveUrl).then((r) => (r.ok ? r.json() : Promise.reject())).catch(() => fetch(staticUrl).then((r) => (r.ok ? r.json() : null)))
      : fetch(staticUrl).then((r) => (r.ok ? r.json() : null));
    fetchPatch
      .then((patch) => {
        if (!patch || !Array.isArray(patch.categories)) return;
        const h1El = document.querySelector('h1');
        const subEl = document.querySelector('.sub');
        if (patch.h1 && h1El) h1El.innerHTML = patch.h1;
        if (patch.sub && subEl) subEl.innerHTML = patch.sub;
        dataObj.CATEGORIES.splice(0, dataObj.CATEGORIES.length, ...patch.categories);
        if (typeof apply === 'function') apply();
      })
      .catch(() => {});
  }

  function buildReportContext() {
    if (window.__MD_REPORT_DATA__ && window.__MD_REPORT_DATA__.markdown) {
      return String(window.__MD_REPORT_DATA__.markdown).slice(0, 110000);
    }
    if (!dataObj || !Array.isArray(dataObj.CATEGORIES)) {
      return (document.body.innerText || '').slice(0, 60000);
    }
    const out = [];
    if (isBenchmark) {
      out.push('گزارش: بنچمارک UX فلوهای CRM TopFast در مقایسه با ۱۰ CRM رقیب');
      for (const cat of dataObj.CATEGORIES) {
        out.push('\n## فلو: ' + (cat.shortFa || cat.title || ''));
        for (const it of (cat.items || [])) {
          out.push('- [' + (it.sev || '') + '] ' + (it.title || ''));
          if (it.tf) out.push('  TopFast: ' + it.tf);
          if (it.best) out.push('  بهترین بازار: ' + it.best);
          if (it.rec) out.push('  پیشنهاد: ' + it.rec);
          if (it.crms) {
            const crmsStr = Object.entries(it.crms)
              .filter(([, v]) => v)
              .map(([k, v]) => k + ': ' + v)
              .join(' | ');
            if (crmsStr) out.push('  رقبا: ' + crmsStr);
          }
        }
      }
    } else {
      out.push('گزارش: بررسی ایشوها و مغایرت‌های پیاده‌سازی TopFast CRM (Live vs Figma)');
      for (const cat of dataObj.CATEGORIES) {
        out.push('\n## دسته: ' + (cat.title || ''));
        for (const it of (cat.items || [])) {
          out.push('- [' + (it.sev || '') + '] ' + (it.title || ''));
          if (it.why) out.push('  اهمیت: ' + it.why);
          if (it.live) out.push('  Live: ' + String(it.live).replace(/<[^>]+>/g, ''));
          if (it.figma) out.push('  Figma: ' + String(it.figma).replace(/<[^>]+>/g, ''));
        }
      }
    }
    return out.join('\n').slice(0, 110000);
  }

  function computeStats() {
    let total = 0, crit = 0, high = 0, med = 0, cats = 0;
    const critList = [];
    if (dataObj && Array.isArray(dataObj.CATEGORIES)) {
      cats = dataObj.CATEGORIES.length;
      for (const c of dataObj.CATEGORIES) {
        for (const it of (c.items || [])) {
          total++;
          const sv = String(it.sev || '').toLowerCase();
          if (sv === 'crit' || sv === 'critical' || sv.includes('بحران')) {
            crit++;
            critList.push({ cat: c.shortFa || c.title, title: it.title, rec: it.rec || it.why || '' });
          } else if (sv === 'high' || sv.includes('مهم') || sv.includes('بالا')) {
            high++;
          } else {
            med++;
          }
        }
      }
    }
    return { total, crit, high, med, cats, critList };
  }

  const stats = computeStats();

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  function renderMd(txt) {
    let h = esc(txt);
    h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    h = h.replace(/`([^`]+)`/g, '<code>$1</code>');
    h = h.replace(/_(.+?)_/g, '<em>$1</em>');
    h = h.replace(/\n/g, '<br>');
    return h;
  }

  function buildSummaryHTML() {
    if (isMdViewer) {
      const m = window.__MD_REPORT_DATA__ || {};
      return `
        <div class="tfai-sum-card">
          <h4>${ICO.target}<span>عصاره گزارش</span></h4>
          <p>${esc(m.summary || 'این گزارش با قالب استاندارد مرکز گزارش‌های TopFast منتشر شده است. برای دریافت خلاصه تخصصی بر اساس نقش تیمی خود می‌توانید مستقیم از تب چت بپرسید.')}</p>
        </div>
        <button type="button" class="tfai-cta-inline" data-go-tab="chat">${ICO.chat}<span>پرسش یا درخواست خلاصه تخصصی از AI</span></button>
      `;
    }

    const topCrits = stats.critList.slice(0, 4).map((x) =>
      `<li><strong>${esc(x.cat)}:</strong> ${esc(x.title)}</li>`
    ).join('');

    if (isBenchmark) {
      return `
        <div class="tfai-sum-kpis">
          <div><b>${stats.cats || 6}</b><span>فلو بررسی‌شده</span></div>
          <div><b>${stats.total}</b><span>معیار مقایسه</span></div>
          <div class="c-red"><b>${stats.crit}</b><span>گپ بحرانی</span></div>
        </div>
        <div class="tfai-sum-card">
          <h4>${ICO.target}<span>عصاره مدیریتی (۱ دقیقه‌ای)</span></h4>
          <p>در این بنچمارک، ۶ فلوی کلیدی <strong>TopFast CRM</strong> با ۱۰ رقیب مطرح مقایسه شده است. پنل TopFast از نظر پوشش ماژول‌ها (Wallet، IB، Club، Web Terminal) قوی است، اما در <strong>اصطکاک ورود، احراز هویت و شفافیت واریز/برداشت</strong> گپ‌های جدی نسبت به الگوهای برتر بازار (Alpari، AMarkets، MatchTrader) دارد.</p>
        </div>
        <div class="tfai-sum-card">
          <h4 class="c-red-h">${ICO.alert}<span>مهم‌ترین گپ‌های بحرانی (اولویت P0)</span></h4>
          <ul>${topCrits || '<li>کاهش فیلدهای ثبت‌نام و حذف ریدایرکت اضافی پس از ثبت‌نام</li><li>ساده‌سازی KYC و اختیاری کردن مراحل پرخطا</li><li>شفاف‌سازی کارمزدها و وضعیت درخواست‌های واریز و برداشت</li>'}</ul>
        </div>
        <div class="tfai-sum-card">
          <h4 class="c-ok-h">${ICO.check}<span>اقدام پیشنهادی سریع</span></h4>
          <p>تمرکز اسپرینت اول روی <strong>رفع اصطکاک Register + KYC</strong> و <strong>شفاف‌سازی فلوهای مالی</strong> بیشترین اثر مستقیم را روی نرخ تبدیل (Conversion) تریدرهای جدید خواهد داشت.</p>
        </div>
        <button type="button" class="tfai-cta-inline" data-go-tab="chat">${ICO.chat}<span>می‌خواهی جزئیات بیشتر یا خلاصه مخصوص تیمت را از AI بپرسی؟</span></button>
      `;
    }
    return `
      <div class="tfai-sum-kpis">
        <div><b>${stats.cats}</b><span>بخش پنل</span></div>
        <div><b>${stats.total}</b><span>ایشو ثبت‌شده</span></div>
        <div class="c-red"><b>${stats.crit}</b><span>مورد بحرانی</span></div>
      </div>
      <div class="tfai-sum-card">
        <h4>${ICO.target}<span>عصاره مدیریتی (۱ دقیقه‌ای)</span></h4>
        <p>این گزارش مغایرت‌های پیاده‌سازی نسخه زنده (Live) <strong>TopFast CRM</strong> را نسبت به طراحی مرجع <strong>Figma</strong> مستند کرده است. از مجموع <strong>${stats.total}</strong> مورد ثبت‌شده، <strong>${stats.crit}</strong> مورد بحرانی و <strong>${stats.high}</strong> مورد با اولویت بالا هستند.</p>
      </div>
      <div class="tfai-sum-card">
        <h4 class="c-red-h">${ICO.alert}<span>بحرانی‌ترین موارد نیازمند اصلاح فوری</span></h4>
        <ul>${topCrits || '<li>مغایرت‌های ساختاری و داده‌ای در صفحات اصلی داشبورد و کیف‌پول</li>'}</ul>
      </div>
      <div class="tfai-sum-card">
        <h4 class="c-ok-h">${ICO.check}<span>پیشنهاد اجرا برای تیم محصول و فرانت</span></h4>
        <p>ابتدا موارد با تگ <strong>بحرانی</strong> (تأثیر مستقیم روی اعتماد و عملکرد کاربر) برطرف شوند و سپس مغایرت‌های ظاهری/توکنی در یک فاز یکپارچه‌سازی دیزاین‌سیستم جمع‌بندی گردند.</p>
      </div>
      <button type="button" class="tfai-cta-inline" data-go-tab="chat">${ICO.chat}<span>سوال مشخصی درباره هر صفحه یا ایشو داری؟ از AI بپرس</span></button>
    `;
  }

  function localSmartAnswer(q) {
    if (isMdViewer && window.__MD_REPORT_DATA__ && window.__MD_REPORT_DATA__.markdown) {
      const paras = String(window.__MD_REPORT_DATA__.markdown).split(/\n\n+/);
      const tokens = q.toLowerCase().replace(/[؟?،,.!]/g, ' ').split(/\s+/).filter((t) => t.length >= 2);
      const hits = paras.map((p) => {
        const low = p.toLowerCase();
        let sc = 0;
        for (const t of tokens) if (low.includes(t)) sc++;
        return { sc, p };
      }).filter((x) => x.sc > 0).sort((a, b) => b.sc - a.sc).slice(0, 3);
      if (hits.length) {
        return 'مرتبط‌ترین بخش‌های گزارش:\n' + hits.map((h) => '\n• ' + h.p.replace(/^#+\s*/gm, '').slice(0, 260)).join('\n');
      }
      return 'پاسخ مستقیمی در جستجوی داخلی پیدا نشد. لطفاً لحظه‌ای دیگر دوباره امتحان کنید.';
    }
    if (!dataObj || !Array.isArray(dataObj.CATEGORIES)) {
      return 'سرویس هوش مصنوعی زنده در حال حاضر در دسترس نیست. لطفاً مجدداً تلاش کنید.';
    }
    const tokens = q.toLowerCase().replace(/[؟?،,.!]/g, ' ').split(/\s+/).filter((t) => t.length >= 2);
    const scored = [];
    for (const cat of dataObj.CATEGORIES) {
      const catName = cat.shortFa || cat.title || '';
      for (const it of (cat.items || [])) {
        const hay = [catName, it.title, it.sev, it.ux, it.tf, it.best, it.rec, it.why, it.live, it.figma]
          .filter(Boolean).join(' ').toLowerCase();
        let score = 0;
        for (const t of tokens) {
          if (hay.includes(t)) score += (it.title && it.title.toLowerCase().includes(t) ? 3 : 1);
        }
        if (/بحران|مهم|اصلی|خلاصه|p0|فوری/.test(q) && (it.sev === 'crit' || it.sev === 'critical')) score += 2;
        if (score > 0) scored.push({ score, catName, it });
      }
    }
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 4);
    if (!top.length) {
      return 'مورد مستقیمی با این کلیدواژه‌ها در گزارش پیدا نشد.';
    }
    const lines = ['بر اساس داده‌های همین گزارش، مرتبط‌ترین موارد:'];
    for (const { catName, it } of top) {
      const detail = it.rec || it.tf || it.why || (it.live ? String(it.live).replace(/<[^>]+>/g, '') : '');
      lines.push(`\n• **${catName} — ${it.title}**\n  ${detail.slice(0, 220)}${detail.length > 220 ? '…' : ''}`);
    }
    return lines.join('\n');
  }

  const style = document.createElement('style');
  style.textContent = `
    .tfai-ic{width:15px;height:15px;flex:0 0 auto;display:inline-block;vertical-align:middle}
    .tfai-ic-fill{width:15px;height:15px;flex:0 0 auto;display:inline-block;vertical-align:middle}

    .tfai-qbar{display:flex;flex-wrap:wrap;gap:9px;margin:18px 0 28px;padding-bottom:22px;border-bottom:1px solid rgba(255,255,255,.08)}
    .tfai-qbtn{display:inline-flex;align-items:center;gap:7px;height:36px;padding:0 15px;border-radius:999px;border:1px solid rgba(22,94,246,.42);background:rgba(22,94,246,.12);color:#dbe8ff;font:600 12.5px/1 'Vazirmatn','Inter',sans-serif;cursor:pointer;transition:background .16s,border-color .16s,color .16s,transform .14s}
    .tfai-qbtn:hover{background:#165EF6;border-color:#165EF6;color:#ffffff;transform:translateY(-1px)}
    .tfai-qbtn.audio-btn,.tfai-qbtn.chat-btn{border-color:rgba(22,94,246,.42);background:rgba(22,94,246,.12);color:#dbe8ff}
    .tfai-qbtn.audio-btn:hover,.tfai-qbtn.chat-btn:hover{background:#165EF6;border-color:#165EF6;color:#ffffff}

    .tfai-fab{position:fixed;left:22px;bottom:22px;z-index:50;display:inline-flex;align-items:center;gap:8px;height:48px;padding:0 18px 0 15px;border-radius:999px;border:1px solid #165EF6;background:#165EF6;color:#ffffff;font:700 13px/1 'Vazirmatn','Inter',sans-serif;cursor:pointer;box-shadow:0 12px 32px rgba(22,94,246,.38),0 4px 16px rgba(0,0,0,.5);transition:transform .18s,box-shadow .18s,background .15s,bottom .2s}
    .tfai-fab:hover{background:#2b6ff8;border-color:#2b6ff8;transform:translateY(-2px);box-shadow:0 16px 38px rgba(22,94,246,.48),0 6px 20px rgba(0,0,0,.6)}
    .tfai-fab .dot-live{width:7px;height:7px;border-radius:50%;background:#ffffff;opacity:.9}

    .tfai-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);z-index:54;display:none}
    .tfai-backdrop.open{display:none}

    .tfai-panel{position:fixed;left:0;top:0;bottom:0;z-index:55;width:min(410px,100vw);height:100vh;height:100dvh;display:flex;flex-direction:column;border-radius:0;background:rgba(11,13,18,.97);border-inline-end:1px solid rgba(255,255,255,.14);-webkit-backdrop-filter:blur(24px) saturate(180%);backdrop-filter:blur(24px) saturate(180%);box-shadow:12px 0 48px rgba(0,0,0,.6);overflow:hidden;direction:rtl;font-family:'Vazirmatn','Inter',system-ui,sans-serif;color:#d6d8de;transform:translateX(-105%);transition:transform .24s cubic-bezier(.2,.8,.2,1);pointer-events:none}
    .tfai-panel.open{transform:translateX(0);pointer-events:auto}
    body{transition:padding-left .24s cubic-bezier(.2,.8,.2,1)}
    @media(min-width:1080px){
      body.tfai-side-open{padding-left:410px}
      body.tfai-side-open .tfai-mini{left:410px}
    }
    body.tfai-side-open .tfai-fab{opacity:0;pointer-events:none;transform:scale(.9)}

    .tfai-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px 12px;border-bottom:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.02)}
    .tfai-head-t{display:flex;align-items:center;gap:10px;min-width:0}
    .tfai-head-ic{width:34px;height:34px;border-radius:10px;background:rgba(87,193,255,.14);border:1px solid rgba(87,193,255,.35);color:#7fd0ff;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
    .tfai-head-t b{display:block;font-size:14px;color:#fff;line-height:1.3}
    .tfai-head-t small{display:block;font-size:11px;color:#9398a3;line-height:1.3}
    .tfai-close{border:0;background:rgba(255,255,255,.06);color:#c8ccd4;width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:0 0 auto}
    .tfai-close:hover{background:rgba(255,255,255,.14);color:#fff}

    .tfai-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.015)}
    .tfai-tabs.two-cols{grid-template-columns:repeat(2,1fr)}
    .tfai-tab{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid transparent;background:transparent;color:#989ca6;border-radius:10px;padding:7px 6px;font:600 12px/1.3 'Vazirmatn',sans-serif;cursor:pointer;transition:background .15s,color .15s,border-color .15s}
    .tfai-tab:hover{color:#fff;background:rgba(255,255,255,.05)}
    .tfai-tab.on{background:rgba(87,193,255,.15);border-color:rgba(87,193,255,.38);color:#fff}

    .tfai-pane{flex:1 1 auto;overflow-y:auto;padding:14px;display:none;flex-direction:column;gap:10px}
    .tfai-pane.on{display:flex}

    /* Summary Pane */
    .tfai-sum-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
    .tfai-sum-kpis div{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:10px 8px;text-align:center}
    .tfai-sum-kpis b{display:block;font-size:20px;color:#fff;line-height:1.2}
    .tfai-sum-kpis .c-red b{color:#ff7070}
    .tfai-sum-kpis span{display:block;font-size:11px;color:#989ca6;margin-top:2px}
    .tfai-sum-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:12px 14px;font-size:13px;line-height:1.75}
    .tfai-sum-card h4{margin:0 0 6px;font-size:13px;color:#fff;display:flex;align-items:center;gap:7px}
    .tfai-sum-card h4 .tfai-ic{color:#57c1ff}
    .tfai-sum-card h4.c-red-h .tfai-ic{color:#ff6b6b}
    .tfai-sum-card h4.c-ok-h .tfai-ic{color:#59d499}
    .tfai-sum-card p{margin:0}
    .tfai-sum-card ul{margin:0;padding:0 16px 0 0}
    .tfai-sum-card li{margin-bottom:5px}
    .tfai-cta-inline{width:100%;display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:11px 14px;border-radius:10px;border:0;background:#165EF6;color:#ffffff;font:700 12.5px/1.4 'Vazirmatn',sans-serif;cursor:pointer;text-align:center;transition:background .15s}
    .tfai-cta-inline:hover{background:#2b6ff8;color:#ffffff}

    /* Spotify-Style Full-Height Audio Pane (#165EF6 Brand Theme) */
    .tfai-pane[data-pane="audio"]{padding:0;background:linear-gradient(180deg,rgba(22,94,246,.28) 0%,rgba(14,22,42,.68) 42%,rgba(11,13,18,.98) 100%)}
    .tfai-sp{display:flex;flex-direction:column;justify-content:space-between;min-height:100%;padding:20px 22px 22px;gap:18px}
    .tfai-sp-top{display:flex;align-items:center;justify-content:space-between;font:600 10.5px/1.2 'Inter',sans-serif;letter-spacing:1.1px;text-transform:uppercase;color:#93bbff}
    .tfai-sp-top span{display:inline-flex;align-items:center;gap:6px}
    .tfai-sp-pill{padding:3px 8px;border-radius:999px;background:rgba(22,94,246,.2);border:1px solid rgba(22,94,246,.38);color:#dbe8ff;letter-spacing:.6px}
    .tfai-sp-art{position:relative;width:100%;aspect-ratio:1/1;max-height:270px;margin:0 auto;border-radius:16px;overflow:hidden;background:radial-gradient(circle at 28% 24%,rgba(22,94,246,.52),transparent 58%),radial-gradient(circle at 78% 76%,rgba(87,193,255,.32),transparent 56%),linear-gradient(145deg,#0f1c38 0%,#0b0e17 100%);border:1px solid rgba(255,255,255,.12);box-shadow:0 22px 54px rgba(0,0,0,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px}
    .tfai-sp-art::before{content:"";position:absolute;inset:14px;border-radius:12px;border:1px solid rgba(255,255,255,.07);pointer-events:none}
    .tfai-sp-disc{width:76px;height:76px;border-radius:999px;background:rgba(22,94,246,.24);border:1px solid rgba(22,94,246,.58);color:#6ea0ff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 38px rgba(22,94,246,.36)}
    .tfai-sp-disc .tfai-ic{width:32px;height:32px}
    .tfai-sp-eq{display:flex;align-items:flex-end;gap:5px;height:28px}
    .tfai-sp-eq i{display:block;width:4px;height:8px;border-radius:999px;background:#4c86ff;opacity:.6;transition:height .2s}
    .tfai-sp.playing .tfai-sp-eq i{opacity:1;background:#6ea0ff;animation:tfaiEq .9s ease-in-out infinite alternate}
    .tfai-sp.playing .tfai-sp-eq i:nth-child(2){animation-delay:.18s}
    .tfai-sp.playing .tfai-sp-eq i:nth-child(3){animation-delay:.36s}
    .tfai-sp.playing .tfai-sp-eq i:nth-child(4){animation-delay:.12s}
    .tfai-sp.playing .tfai-sp-eq i:nth-child(5){animation-delay:.28s}
    @keyframes tfaiEq{0%{height:7px}100%{height:26px}}
    .tfai-sp-meta{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
    .tfai-sp-meta h4{margin:0 0 4px;font-size:17px;line-height:1.35;font-weight:800;color:#fff}
    .tfai-sp-meta p{margin:0;font-size:12.5px;color:#9da5b0}
    .tfai-aud-dl{width:36px;height:36px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#d6d8de;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;flex:0 0 auto;transition:background .15s,color .15s,border-color .15s}
    .tfai-aud-dl:hover{background:rgba(22,94,246,.24);border-color:rgba(22,94,246,.6);color:#fff}
    .tfai-sp-prog{display:flex;flex-direction:column;gap:6px}
    .tfai-range{width:100%;height:5px;accent-color:#165EF6;cursor:pointer;direction:ltr}
    .tfai-time{display:flex;justify-content:space-between;font:500 11.5px/1.2 'Inter',sans-serif;color:#9da5b0;direction:ltr}
    .tfai-aud-ctrl{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:4px 0}
    .tfai-sp-mid{display:flex;align-items:center;gap:16px}
    .tfai-play{width:58px;height:58px;border-radius:999px;border:0;background:#165EF6;color:#ffffff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:0 0 auto;box-shadow:0 10px 28px rgba(22,94,246,.42);transition:transform .14s,background .14s}
    .tfai-play .tfai-ic-fill{width:22px;height:22px}
    .tfai-play:hover{transform:scale(1.06);background:#2b6ff8}
    .tfai-skip,.tfai-vol{width:38px;height:38px;border-radius:999px;border:0;background:transparent;color:#d0d4dc;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;position:relative;transition:background .15s,color .15s}
    .tfai-skip:hover,.tfai-vol:hover{background:rgba(22,94,246,.18);color:#fff}
    .tfai-skip small{position:absolute;bottom:2px;font:700 8.5px/1 'Inter',sans-serif;color:#9da5b0}
    .tfai-spd{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:#e2e6ee;border-radius:999px;height:30px;min-width:44px;padding:0 10px;font:700 11.5px/1 'Inter',sans-serif;cursor:pointer}
    .tfai-spd:hover{border-color:#165EF6;background:rgba(22,94,246,.18);color:#fff}
    .tfai-sp-hint{text-align:center;font-size:11.5px;color:#868d98;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)}
    .tfai-aud-empty{padding:16px;border-radius:12px;border:1px dashed rgba(255,255,255,.2);background:rgba(0,0,0,.28);font-size:12.5px;line-height:1.7;color:#b8bcc6;display:none}
    .tfai-aud-empty.show{display:block}

    /* Chat Pane */
    .tfai-msgs{flex:1 1 auto;display:flex;flex-direction:column;gap:10px;overflow-y:auto;padding-bottom:6px}
    .tfai-msg{max-width:92%;padding:10px 13px;border-radius:13px;font-size:13px;line-height:1.72;word-break:break-word}
    .tfai-msg.bot{align-self:flex-start;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.09);color:#e4e6ec;border-top-right-radius:4px}
    .tfai-msg.user{align-self:flex-end;background:rgba(87,193,255,.18);border:1px solid rgba(87,193,255,.38);color:#fff;border-top-left-radius:4px}
    .tfai-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
    .tfai-chip{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.04);color:#c7cbd4;border-radius:999px;padding:5px 11px;font:500 11.5px/1.4 'Vazirmatn',sans-serif;cursor:pointer}
    .tfai-chip:hover{background:rgba(87,193,255,.16);border-color:rgba(87,193,255,.45);color:#fff}
    .tfai-form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.02)}
    .tfai-in{flex:1 1 auto;min-width:0;height:38px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#fff;padding:0 12px;font:inherit;font-size:13px}
    .tfai-in:focus{outline:2px solid #57c1ff;outline-offset:1px}
    .tfai-send{display:inline-flex;align-items:center;justify-content:center;gap:5px;height:38px;padding:0 14px;border-radius:10px;border:0;background:#165EF6;color:#ffffff;font:700 13px/1 'Vazirmatn',sans-serif;cursor:pointer;flex:0 0 auto}
    .tfai-send:disabled{opacity:.5;cursor:not-allowed}

    /* Persistent Bottom Mini Audio Player (#165EF6 Brand Theme) */
    .tfai-mini{position:fixed;left:0;right:0;bottom:0;z-index:48;display:none;align-items:center;gap:12px;padding:10px 20px;background:rgba(11,14,22,.95);border-top:1px solid rgba(22,94,246,.45);-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);box-shadow:0 -10px 34px rgba(0,0,0,.6);direction:rtl;font-family:'Vazirmatn','Inter',system-ui,sans-serif;color:#e5e7ef}
    .tfai-mini.show{display:flex}
    .tfai-mini-play{width:38px;height:38px;border-radius:999px;border:0;background:#165EF6;color:#ffffff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:0 0 auto;box-shadow:0 4px 16px rgba(22,94,246,.4);transition:transform .14s,background .14s}
    .tfai-mini-play:hover{transform:scale(1.05);background:#2b6ff8}
    .tfai-mini-info{min-width:0;max-width:220px;cursor:pointer;flex:0 1 auto}
    .tfai-mini-info b{display:block;font-size:12.5px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.35}
    .tfai-mini-info small{display:flex;align-items:center;gap:4px;font-size:11px;color:#6ea0ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3}
    .tfai-mini-info small .tfai-ic{width:12px;height:12px}
    .tfai-mini-seekwrap{flex:1 1 auto;display:flex;align-items:center;gap:10px;min-width:120px}
    .tfai-mini-seek{flex:1 1 auto;accent-color:#165EF6;cursor:pointer;direction:ltr;min-width:60px}
    .tfai-mini-time{font:500 11.5px/1 'Inter',sans-serif;color:#9da2ad;direction:ltr;white-space:nowrap;flex:0 0 auto}
    .tfai-mini-btn{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:#e5e7ef;border-radius:8px;height:30px;padding:0 9px;font:600 11.5px/1 'Inter',sans-serif;cursor:pointer;flex:0 0 auto}
    .tfai-mini-btn:hover{background:rgba(255,255,255,.14);color:#fff}
    .tfai-mini-close{border:0;background:rgba(255,255,255,.07);color:#b8bcc6;width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:0 0 auto}
    .tfai-mini-close:hover{background:rgba(255,97,97,.22);color:#fff}
    body.tfai-has-mini{padding-bottom:76px}
    body.tfai-has-mini .tfai-fab{bottom:78px}

    @media(max-width:640px){
      .tfai-backdrop.open{display:block}
      .tfai-fab{left:14px;bottom:14px;height:46px;padding:0 14px;font-size:12.5px}
      body.tfai-has-mini{padding-bottom:108px}
      body.tfai-has-mini .tfai-fab{bottom:106px}
      .tfai-panel{left:0;right:0;top:auto;bottom:0;width:100%;height:82dvh;border-radius:18px 18px 0 0;border-inline-end:0;border-top:1px solid rgba(255,255,255,.16);transform:translateY(105%)}
      .tfai-panel.open{transform:translateY(0)}
      .tfai-qbar{gap:6px}
      .tfai-qbtn{font-size:12px;padding:6px 11px}
      .tfai-mini{flex-wrap:wrap;padding:8px 12px 10px;gap:8px}
      .tfai-mini-info{max-width:none;flex:1 1 auto}
      .tfai-mini-seekwrap{order:10;flex:1 0 100%;gap:8px}
      .tfai-mini-skip{display:none}
    }
    @media print{.tfai-fab,.tfai-panel,.tfai-backdrop,.tfai-qbar,.tfai-mini{display:none!important}}
  `;
  document.head.appendChild(style);

  const hasAudio = !!audioSrc;
  const anchor = document.querySelector('.rep-author') || document.querySelector('.sub');
  if (anchor && anchor.parentNode) {
    const qbar = document.createElement('div');
    qbar.className = 'tfai-qbar';
    qbar.innerHTML = `
      <button type="button" class="tfai-qbtn" data-open-ai="summary">${ICO.spark}<span>خلاصه ۱ دقیقه‌ای AI</span></button>
      ${hasAudio ? `<button type="button" class="tfai-qbtn audio-btn" data-open-ai="audio">${ICO.audio}<span>شنیدن خلاصه صوتی</span></button>` : ''}
      <button type="button" class="tfai-qbtn chat-btn" data-open-ai="chat">${ICO.chat}<span>گفتگو و پرسش از AI</span></button>
    `;
    anchor.insertAdjacentElement('afterend', qbar);
  }

  const starterQs = isBenchmark
    ? ['مهم‌ترین گپ‌های بحرانی TopFast چیه؟', 'اولویت P0 نقشه راه چیه؟', 'تفاوت TopFast با رقبا در واریز و برداشت', 'خلاصه اجرایی برای مدیرعامل بنویس']
    : (isIssues
      ? ['بحرانی‌ترین مغایرت‌ها کدامند؟', 'مشکلات اصلی داشبورد چیست؟', 'اولویت فیکس تیم فرانت چیست؟', 'خلاصه مدیریتی این گزارش را بده']
      : ['خلاصه ۱ دقیقه‌ای این گزارش چیه؟', 'مهم‌ترین نکات و اولویت‌ها کدامند؟', 'پیشنهادهای اجرایی گزارش چیست؟']);

  const backdrop = document.createElement('div');
  backdrop.className = 'tfai-backdrop';

  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'tfai-fab';
  fab.setAttribute('aria-label', 'دستیار هوشمند گزارش');
  fab.innerHTML = `<span class="dot-live"></span>${ICO.bot}<span>دستیار AI گزارش</span>`;

  const panel = document.createElement('aside');
  panel.className = 'tfai-panel';
  panel.setAttribute('aria-label', 'دستیار هوشمند گزارش');
  panel.innerHTML = `
    <div class="tfai-head">
      <div class="tfai-head-t">
        <span class="tfai-head-ic">${ICO.bot}</span>
        <div>
          <b>دستیار هوشمند گزارش</b>
          <small>${endpoint ? 'متصل به Gemini AI · پاسخ دقیق بر اساس گزارش' : 'خلاصه هوشمند و پرسش و پاسخ'}</small>
        </div>
      </div>
      <button type="button" class="tfai-close" aria-label="بستن">${ICO.close}</button>
    </div>
    <div class="tfai-tabs ${hasAudio ? '' : 'two-cols'}" role="tablist">
      <button type="button" class="tfai-tab on" data-tab="summary">${ICO.spark}<span>خلاصه AI</span></button>
      ${hasAudio ? `<button type="button" class="tfai-tab" data-tab="audio">${ICO.audio}<span>فایل صوتی</span></button>` : ''}
      <button type="button" class="tfai-tab" data-tab="chat">${ICO.chat}<span>چت با گزارش</span></button>
    </div>
    <div class="tfai-pane on" data-pane="summary">${buildSummaryHTML()}</div>
    ${hasAudio ? `
    <div class="tfai-pane" data-pane="audio">
      <div class="tfai-sp" id="tfai-sp">
        <div class="tfai-sp-top">
          <span>${ICO.mic}<span>NOW PLAYING · NOTEBOOKLM</span></span>
          <span class="tfai-sp-pill">M4A · فارسی</span>
        </div>
        <div class="tfai-sp-art">
          <div class="tfai-sp-disc">${ICO.audio}</div>
          <div class="tfai-sp-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        </div>
        <audio id="tfai-audio" preload="metadata" src="${esc(audioSrc)}"></audio>
        <div id="tfai-aud-player" style="display:flex;flex-direction:column;gap:14px">
          <div class="tfai-sp-meta">
            <div>
              <h4>${esc(isBenchmark ? 'خلاصه صوتی بنچمارک UX فلوهای CRM' : (isIssues ? 'خلاصه صوتی ایرادات پیاده‌سازی CRM' : (document.title || 'خلاصه صوتی گزارش')))}</h4>
              <p>TopFast Product Intelligence · پادکست فارسی</p>
            </div>
            <a class="tfai-aud-dl" href="${esc(audioSrc)}" download title="دانلود فایل صوتی">${ICO.download}</a>
          </div>
          <div class="tfai-sp-prog">
            <input type="range" class="tfai-range" id="tfai-seek" min="0" max="100" value="0" step="0.1">
            <div class="tfai-time"><span id="tfai-cur">00:00</span><span id="tfai-dur">00:00</span></div>
          </div>
          <div class="tfai-aud-ctrl">
            <button type="button" class="tfai-spd" id="tfai-spd" title="سرعت پخش">1x</button>
            <div class="tfai-sp-mid">
              <button type="button" class="tfai-skip" id="tfai-back" aria-label="۱۵ ثانیه عقب" title="۱۵ ثانیه عقب">${ICO.back15}<small>15</small></button>
              <button type="button" class="tfai-play" id="tfai-play" aria-label="پخش یا توقف">${ICO.play}</button>
              <button type="button" class="tfai-skip" id="tfai-fwd" aria-label="۱۵ ثانیه جلو" title="۱۵ ثانیه جلو">${ICO.fwd15}<small>15</small></button>
            </div>
            <button type="button" class="tfai-vol" id="tfai-vol" aria-label="قطع یا وصل صدا" title="صدا">${ICO.vol}</button>
          </div>
        </div>
        <div class="tfai-aud-empty" id="tfai-aud-empty">
          فایل صوتی این گزارش (<code>${esc(audioSrc)}</code>) در دسترس نیست. لطفاً اتصال اینترنت را بررسی کنید یا صفحه را رفرش کنید.
        </div>
        <div class="tfai-sp-hint">با بستن پنل، پخش در نوار پایین صفحه ادامه می‌یابد</div>
      </div>
    </div>` : ''}
    <div class="tfai-pane" data-pane="chat" style="padding:0">
      <div class="tfai-msgs" id="tfai-msgs" style="padding:14px">
        <div class="tfai-msg bot">
          سلام! هر سوالی درباره این گزارش داری بپرس تا دقیقاً بر اساس داده‌های همین صفحه جواب دهم.
          <div class="tfai-chips">
            ${starterQs.map((q) => `<button type="button" class="tfai-chip">${esc(q)}</button>`).join('')}
          </div>
        </div>
      </div>
      <form class="tfai-form" id="tfai-form">
        <input class="tfai-in" id="tfai-in" type="text" placeholder="سوال خود را درباره گزارش بنویسید..." autocomplete="off">
        <button class="tfai-send" id="tfai-send" type="submit">${ICO.send}<span>ارسال</span></button>
      </form>
    </div>
  `;

  const mini = document.createElement('div');
  mini.className = 'tfai-mini';
  mini.setAttribute('aria-label', 'پخش‌کننده صوتی گزارش');
  mini.innerHTML = `
    <button type="button" class="tfai-mini-play" id="tfai-mplay" aria-label="پخش یا توقف">${ICO.play}</button>
    <div class="tfai-mini-info" id="tfai-minfo" title="باز کردن پنل صوتی">
      <b>${esc(isBenchmark ? 'خلاصه صوتی بنچمارک CRM' : (isIssues ? 'خلاصه صوتی ایشوهای CRM' : (document.title || 'خلاصه صوتی گزارش')))}</b>
      <small>${ICO.mic}<span>NotebookLM Audio</span></small>
    </div>
    <button type="button" class="tfai-mini-btn tfai-mini-skip" id="tfai-mback">-15s</button>
    <button type="button" class="tfai-mini-btn tfai-mini-skip" id="tfai-mfwd">+15s</button>
    <div class="tfai-mini-seekwrap">
      <input type="range" class="tfai-mini-seek" id="tfai-mseek" min="0" max="100" value="0" step="0.1">
      <span class="tfai-mini-time" id="tfai-mtime">00:00 / 00:00</span>
    </div>
    <button type="button" class="tfai-mini-btn" id="tfai-mspd">1x</button>
    <button type="button" class="tfai-mini-close" id="tfai-mclose" aria-label="بستن پخش‌کننده">${ICO.close}</button>
  `;

  document.body.appendChild(backdrop);
  if (hasAudio) document.body.appendChild(mini);
  document.body.appendChild(fab);
  document.body.appendChild(panel);

  let miniActive = false;
  function syncMiniVisibility() {
    if (!hasAudio) return;
    const visible = miniActive && !panel.classList.contains('open');
    mini.classList.toggle('show', visible);
    document.body.classList.toggle('tfai-has-mini', visible);
  }

  function setTab(name) {
    panel.querySelectorAll('.tfai-tab').forEach((b) => b.classList.toggle('on', b.dataset.tab === name));
    panel.querySelectorAll('.tfai-pane').forEach((p) => p.classList.toggle('on', p.dataset.pane === name));
  }

  function openPanel(tab) {
    if (tab) setTab(tab);
    panel.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('tfai-side-open');
    syncMiniVisibility();
    if (tab === 'chat') {
      setTimeout(() => { const inp = panel.querySelector('#tfai-in'); if (inp) inp.focus(); }, 120);
    }
  }

  function closePanel() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('tfai-side-open');
    syncMiniVisibility();
  }

  fab.addEventListener('click', () => (panel.classList.contains('open') ? closePanel() : openPanel('chat')));
  backdrop.addEventListener('click', closePanel);
  panel.querySelector('.tfai-close').addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('open')) closePanel(); });

  document.querySelectorAll('[data-open-ai]').forEach((btn) => {
    btn.addEventListener('click', () => openPanel(btn.dataset.openAi));
  });
  panel.querySelectorAll('.tfai-tab').forEach((btn) => {
    btn.addEventListener('click', () => setTab(btn.dataset.tab));
  });
  panel.querySelectorAll('[data-go-tab]').forEach((btn) => {
    btn.addEventListener('click', () => setTab(btn.dataset.goTab));
  });

  if (hasAudio) {
    const aud = panel.querySelector('#tfai-audio');
    const playBtn = panel.querySelector('#tfai-play');
    const seek = panel.querySelector('#tfai-seek');
    const curEl = panel.querySelector('#tfai-cur');
    const durEl = panel.querySelector('#tfai-dur');
    const spdBtn = panel.querySelector('#tfai-spd');
    const audPlayerWrap = panel.querySelector('#tfai-aud-player');
    const audEmpty = panel.querySelector('#tfai-aud-empty');

    const mPlayBtn = mini.querySelector('#tfai-mplay');
    const mSeek = mini.querySelector('#tfai-mseek');
    const mTime = mini.querySelector('#tfai-mtime');
    const mSpdBtn = mini.querySelector('#tfai-mspd');
    const speeds = [1, 1.25, 1.5, 2];
    let spdIdx = 0;

    function fmtTime(sec) {
      if (!isFinite(sec) || sec < 0) return '00:00';
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }

    function syncAudioUI() {
      const cur = fmtTime(aud.currentTime);
      const dur = fmtTime(aud.duration);
      curEl.textContent = cur;
      durEl.textContent = dur;
      mTime.textContent = cur + ' / ' + dur;
      if (aud.duration) {
        const pct = (aud.currentTime / aud.duration) * 100;
        seek.value = pct;
        mSeek.value = pct;
      }
    }

    function togglePlay() {
      if (aud.paused) aud.play().catch(() => {});
      else aud.pause();
    }

    function cycleSpeed() {
      spdIdx = (spdIdx + 1) % speeds.length;
      aud.playbackRate = speeds[spdIdx];
      const lbl = speeds[spdIdx] + 'x';
      spdBtn.textContent = lbl;
      mSpdBtn.textContent = lbl;
    }

    aud.addEventListener('loadedmetadata', () => {
      syncAudioUI();
      audEmpty.classList.remove('show');
      audPlayerWrap.style.display = '';
    });
    aud.addEventListener('error', () => {
      audPlayerWrap.style.display = 'none';
      audEmpty.classList.add('show');
    });
    aud.addEventListener('timeupdate', syncAudioUI);
    const spWrap = panel.querySelector('#tfai-sp');
    const volBtn = panel.querySelector('#tfai-vol');
    if (volBtn) {
      volBtn.addEventListener('click', () => {
        aud.muted = !aud.muted;
        volBtn.innerHTML = aud.muted ? ICO.mute : ICO.vol;
      });
    }

    aud.addEventListener('play', () => {
      playBtn.innerHTML = ICO.pause;
      mPlayBtn.innerHTML = ICO.pause;
      if (spWrap) spWrap.classList.add('playing');
      miniActive = true;
      syncMiniVisibility();
    });
    aud.addEventListener('pause', () => {
      playBtn.innerHTML = ICO.play;
      mPlayBtn.innerHTML = ICO.play;
      if (spWrap) spWrap.classList.remove('playing');
    });
    aud.addEventListener('ended', () => {
      playBtn.innerHTML = ICO.play;
      mPlayBtn.innerHTML = ICO.play;
      if (spWrap) spWrap.classList.remove('playing');
    });

    playBtn.addEventListener('click', togglePlay);
    mPlayBtn.addEventListener('click', togglePlay);
    panel.querySelector('#tfai-back').addEventListener('click', () => { aud.currentTime = Math.max(0, aud.currentTime - 15); });
    panel.querySelector('#tfai-fwd').addEventListener('click', () => { aud.currentTime = Math.min(aud.duration || 0, aud.currentTime + 15); });
    mini.querySelector('#tfai-mback').addEventListener('click', () => { aud.currentTime = Math.max(0, aud.currentTime - 15); });
    mini.querySelector('#tfai-mfwd').addEventListener('click', () => { aud.currentTime = Math.min(aud.duration || 0, aud.currentTime + 15); });
    spdBtn.addEventListener('click', cycleSpeed);
    mSpdBtn.addEventListener('click', cycleSpeed);
    seek.addEventListener('input', () => {
      if (aud.duration) aud.currentTime = (Number(seek.value) / 100) * aud.duration;
    });
    mSeek.addEventListener('input', () => {
      if (aud.duration) aud.currentTime = (Number(mSeek.value) / 100) * aud.duration;
    });
    mini.querySelector('#tfai-minfo').addEventListener('click', () => openPanel('audio'));
    mini.querySelector('#tfai-mclose').addEventListener('click', () => {
      aud.pause();
      miniActive = false;
      syncMiniVisibility();
    });
  }

  const msgsEl = panel.querySelector('#tfai-msgs');
  const form = panel.querySelector('#tfai-form');
  const input = panel.querySelector('#tfai-in');
  const sendBtn = panel.querySelector('#tfai-send');
  const history = [];
  let cachedContext = null;

  function appendMsg(role, text) {
    const div = document.createElement('div');
    div.className = 'tfai-msg ' + (role === 'user' ? 'user' : 'bot');
    div.innerHTML = renderMd(text);
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return div;
  }

  async function askAI(text) {
    const q = String(text || '').trim();
    if (!q) return;
    appendMsg('user', q);
    input.value = '';
    sendBtn.disabled = true;
    const thinking = appendMsg('bot', 'در حال بررسی گزارش...');

    try {
      let reply = '';
      if (endpoint) {
        if (!cachedContext) cachedContext = buildReportContext();
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: q,
            history: history.slice(-6),
            reportTitle: document.title,
            context: cachedContext,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'خطا در ارتباط با سرویس AI');
        reply = data.reply || 'پاسخی دریافت نشد.';
      } else {
        reply = localSmartAnswer(q);
      }
      thinking.innerHTML = renderMd(reply);
      history.push({ role: 'user', text: q }, { role: 'model', text: reply });
    } catch (err) {
      thinking.innerHTML = renderMd((err.message || 'خطا در دریافت پاسخ') + '\n\n' + localSmartAnswer(q));
    } finally {
      sendBtn.disabled = false;
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    askAI(input.value);
  });
  panel.querySelectorAll('.tfai-chip').forEach((c) => {
    c.addEventListener('click', () => askAI(c.textContent));
  });
})();
