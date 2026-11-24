(function () {
  if (window.__TOPFAST_AI_MOUNTED__) return;
  window.__TOPFAST_AI_MOUNTED__ = true;

  const isBenchmark = /crm-benchmark/i.test(location.pathname) || document.title.includes('بنچمارک');
  const isIssues = /crm-issues/i.test(location.pathname) || document.title.includes('ایشو') || document.title.includes('مغایرت');
  const pageKey = isBenchmark ? 'benchmark' : (isIssues ? 'issues' : 'benchmark');

  const cfg = window.TOPFAST_AI_CONFIG || {};
  const endpoint = (cfg.endpoint || '').trim();
  const audioSrc = (cfg.audio && cfg.audio[pageKey]) || ('audio/crm-' + pageKey + '.mp3');
  const dataObj = typeof D !== 'undefined' ? D : null;

  // Build compact plain-text context from page's D object for Gemini
  function buildReportContext() {
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

  // Compute live stats from D
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

  // Pre-baked 1-Minute Executive Summary HTML
  function buildSummaryHTML() {
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
          <h4>🎯 عصاره مدیریتی (۱ دقیقه‌ای)</h4>
          <p>در این بنچمارک، ۶ فلوی کلیدی <strong>TopFast CRM</strong> با ۱۰ رقیب مطرح مقایسه شده است. پنل TopFast از نظر پوشش ماژول‌ها (Wallet، IB، Club، Web Terminal) قوی است، اما در <strong>اصطکاک ورود، احراز هویت و شفافیت واریز/برداشت</strong> گپ‌های جدی نسبت به الگوهای برتر بازار (Alpari، AMarkets، MatchTrader) دارد.</p>
        </div>
        <div class="tfai-sum-card">
          <h4>🔴 مهم‌ترین گپ‌های بحرانی (اولویت P0)</h4>
          <ul>${topCrits || '<li>کاهش فیلدهای ثبت‌نام و حذف ریدایرکت اضافی پس از ثبت‌نام</li><li>ساده‌سازی KYC و اختیاری کردن مراحل پرخطا</li><li>شفاف‌سازی کارمزدها و وضعیت درخواست‌های واریز و برداشت</li>'}</ul>
        </div>
        <div class="tfai-sum-card">
          <h4>✅ اقدام پیشنهادی سریع</h4>
          <p>تمرکز اسپرینت اول روی <strong>رفع اصطکاک Register + KYC</strong> و <strong>شفاف‌سازی فلوهای مالی</strong> بیشترین اثر مستقیم را روی نرخ تبدیل (Conversion) تریدرهای جدید خواهد داشت.</p>
        </div>
        <button type="button" class="tfai-cta-inline" data-go-tab="chat">💬 می‌خواهی جزئیات بیشتر یا خلاصه مخصوص تیمت را از AI بپرسی؟</button>
      `;
    }
    return `
      <div class="tfai-sum-kpis">
        <div><b>${stats.cats}</b><span>بخش پنل</span></div>
        <div><b>${stats.total}</b><span>ایشو ثبت‌شده</span></div>
        <div class="c-red"><b>${stats.crit}</b><span>مورد بحرانی</span></div>
      </div>
      <div class="tfai-sum-card">
        <h4>🎯 عصاره مدیریتی (۱ دقیقه‌ای)</h4>
        <p>این گزارش مغایرت‌های پیاده‌سازی نسخه زنده (Live) <strong>TopFast CRM</strong> را نسبت به طراحی مرجع <strong>Figma</strong> مستند کرده است. از مجموع <strong>${stats.total}</strong> مورد ثبت‌شده، <strong>${stats.crit}</strong> مورد بحرانی و <strong>${stats.high}</strong> مورد با اولویت بالا هستند.</p>
      </div>
      <div class="tfai-sum-card">
        <h4>🔴 بحرانی‌ترین موارد نیازمند اصلاح فوری</h4>
        <ul>${topCrits || '<li>مغایرت‌های ساختاری و داده‌ای در صفحات اصلی داشبورد و کیف‌پول</li>'}</ul>
      </div>
      <div class="tfai-sum-card">
        <h4>✅ پیشنهاد اجرا برای تیم محصول و فرانت</h4>
        <p>ابتدا موارد با تگ <strong>بحرانی</strong> (تأثیر مستقیم روی اعتماد و عملکرد کاربر) برطرف شوند و سپس مغایرت‌های ظاهری/توکنی در یک فاز یکپارچه‌سازی دیزاین‌سیستم جمع‌بندی گردند.</p>
      </div>
      <button type="button" class="tfai-cta-inline" data-go-tab="chat">💬 سوال مشخصی درباره هر صفحه یا ایشو داری؟ از AI بپرس</button>
    `;
  }

  // Local fallback search when Worker endpoint is not yet configured
  function localSmartAnswer(q) {
    if (!dataObj || !Array.isArray(dataObj.CATEGORIES)) {
      return 'سرویس هوش مصنوعی زنده هنوز متصل نشده است. پس از تنظیم آدرس Worker در `ai-config.js` می‌توانم آزادانه به همه سوالات پاسخ دهم.';
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
      return 'مورد مستقیمی با این کلیدواژه‌ها پیدا نشد. (حالت جستجوی هوشمند داخلی فعال است؛ با اتصال کلید رایگان Gemini روی Cloudflare Worker، پاسخ‌های تحلیلی کامل فعال می‌شود.)';
    }
    const lines = ['بر اساس داده‌های همین گزارش، مرتبط‌ترین موارد:'];
    for (const { catName, it } of top) {
      const detail = it.rec || it.tf || it.why || (it.live ? String(it.live).replace(/<[^>]+>/g, '') : '');
      lines.push(`\n• **${catName} — ${it.title}**\n  ${detail.slice(0, 220)}${detail.length > 220 ? '…' : ''}`);
    }
    lines.push('\n_(برای گفتگوی کامل با Gemini AI، کافی است آدرس Cloudflare Worker را در `ai-config.js` قرار دهید.)_');
    return lines.join('\n');
  }

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

  // Inject Styles
  const style = document.createElement('style');
  style.textContent = `
    .tfai-qbar{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
    .tfai-qbtn{display:inline-flex;align-items:center;gap:7px;padding:7px 14px;border-radius:999px;border:1px solid rgba(87,193,255,.32);background:rgba(87,193,255,.09);color:#e6f4ff;font:600 12.5px/1.4 'Vazirmatn','Inter',sans-serif;cursor:pointer;transition:background .16s,border-color .16s,transform .14s}
    .tfai-qbtn:hover{background:rgba(87,193,255,.2);border-color:rgba(87,193,255,.6);transform:translateY(-1px)}
    .tfai-qbtn.audio-btn{border-color:rgba(168,85,247,.38);background:rgba(168,85,247,.12);color:#ebd9ff}
    .tfai-qbtn.audio-btn:hover{background:rgba(168,85,247,.24);border-color:rgba(168,85,247,.68)}
    .tfai-qbtn.chat-btn{border-color:rgba(89,212,153,.35);background:rgba(89,212,153,.1);color:#c9f7e0}
    .tfai-qbtn.chat-btn:hover{background:rgba(89,212,153,.22);border-color:rgba(89,212,153,.62)}

    .tfai-fab{position:fixed;left:22px;bottom:22px;z-index:50;display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 18px 0 16px;border-radius:999px;border:1px solid rgba(87,193,255,.5);background:linear-gradient(135deg,#0f1c2e 0%,#121524 100%);color:#fff;font:700 13.5px/1 'Vazirmatn','Inter',sans-serif;cursor:pointer;box-shadow:0 12px 36px rgba(0,0,0,.6),0 0 0 4px rgba(87,193,255,.14);transition:transform .18s,box-shadow .18s}
    .tfai-fab:hover{transform:translateY(-2px);box-shadow:0 16px 42px rgba(0,0,0,.7),0 0 0 5px rgba(87,193,255,.25)}
    .tfai-fab .dot-live{width:8px;height:8px;border-radius:50%;background:#59d499;box-shadow:0 0 10px #59d499}

    .tfai-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);z-index:54;display:none}
    .tfai-backdrop.open{display:block}

    .tfai-panel{position:fixed;left:22px;bottom:84px;z-index:55;width:min(420px,calc(100vw - 24px));height:min(610px,calc(100vh - 110px));display:none;flex-direction:column;border-radius:18px;background:rgba(13,15,20,.96);border:1px solid rgba(255,255,255,.16);-webkit-backdrop-filter:blur(24px) saturate(180%);backdrop-filter:blur(24px) saturate(180%);box-shadow:0 24px 68px rgba(0,0,0,.75);overflow:hidden;direction:rtl;font-family:'Vazirmatn','Inter',system-ui,sans-serif;color:#d6d8de}
    .tfai-panel.open{display:flex}

    .tfai-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px 12px;border-bottom:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.02)}
    .tfai-head-t{display:flex;align-items:center;gap:9px;min-width:0}
    .tfai-head-t b{display:block;font-size:14px;color:#fff;line-height:1.3}
    .tfai-head-t small{display:block;font-size:11px;color:#9398a3;line-height:1.3}
    .tfai-close{border:0;background:rgba(255,255,255,.06);color:#c8ccd4;width:30px;height:30px;border-radius:8px;font-size:20px;line-height:1;cursor:pointer;flex:0 0 auto}
    .tfai-close:hover{background:rgba(255,255,255,.14);color:#fff}

    .tfai-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.015)}
    .tfai-tab{border:1px solid transparent;background:transparent;color:#989ca6;border-radius:10px;padding:7px 6px;font:600 12px/1.3 'Vazirmatn',sans-serif;cursor:pointer;transition:background .15s,color .15s,border-color .15s}
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
    .tfai-sum-card h4{margin:0 0 6px;font-size:13px;color:#fff}
    .tfai-sum-card p{margin:0}
    .tfai-sum-card ul{margin:0;padding:0 16px 0 0}
    .tfai-sum-card li{margin-bottom:5px}
    .tfai-cta-inline{width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(87,193,255,.35);background:rgba(87,193,255,.1);color:#bfe6ff;font:600 12.5px/1.4 'Vazirmatn',sans-serif;cursor:pointer;text-align:center}
    .tfai-cta-inline:hover{background:rgba(87,193,255,.2);color:#fff}

    /* Audio Pane */
    .tfai-aud-box{background:linear-gradient(180deg,rgba(168,85,247,.12) 0%,rgba(87,193,255,.06) 100%);border:1px solid rgba(168,85,247,.32);border-radius:14px;padding:16px}
    .tfai-aud-badge{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:999px;background:rgba(168,85,247,.2);border:1px solid rgba(168,85,247,.4);color:#e9d5ff;font-size:11px;font-weight:600;margin-bottom:10px}
    .tfai-aud-box h4{margin:0 0 6px;font-size:15px;color:#fff}
    .tfai-aud-box p{margin:0 0 14px;font-size:12.5px;color:#b8bcc6;line-height:1.7}
    .tfai-aud-ctrl{display:flex;align-items:center;gap:8px;margin-bottom:10px}
    .tfai-play{width:44px;height:44px;border-radius:999px;border:0;background:#fff;color:#07080a;font-size:17px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
    .tfai-play:hover{transform:scale(1.04)}
    .tfai-skip{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:#fff;border-radius:8px;height:34px;padding:0 10px;font:600 11.5px/1 'Inter',sans-serif;cursor:pointer}
    .tfai-skip:hover{background:rgba(255,255,255,.14)}
    .tfai-spd{margin-inline-start:auto;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:#e9d5ff;border-radius:8px;height:34px;padding:0 10px;font:700 12px/1 'Inter',sans-serif;cursor:pointer}
    .tfai-range{width:100%;accent-color:#a855f7;cursor:pointer;direction:ltr}
    .tfai-time{display:flex;justify-content:space-between;font:500 11.5px/1.3 'Inter',sans-serif;color:#9da2ad;direction:ltr;margin-top:4px}
    .tfai-aud-dl{display:inline-flex;align-items:center;gap:6px;margin-top:12px;color:#93d5ff;font-size:12px;text-decoration:none}
    .tfai-aud-dl:hover{text-decoration:underline}
    .tfai-aud-empty{padding:14px;border-radius:10px;border:1px dashed rgba(255,255,255,.2);background:rgba(0,0,0,.25);font-size:12.5px;line-height:1.7;color:#b8bcc6;display:none}
    .tfai-aud-empty.show{display:block}

    /* Chat Pane */
    .tfai-msgs{flex:1 1 auto;display:flex;flex-direction:column;gap:10px;overflow-y:auto;padding-bottom:6px}
    .tfai-msg{max-width:92%;padding:10px 13px;border-radius:13px;font-size:13px;line-height:1.72;word-break:break-word}
    .tfai-msg.bot{align-self:flex-start;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.09);color:#e4e6ec;border-top-right-radius:4px}
    .tfai-msg.user{align-self:flex-end;background:rgba(87,193,255,.18);border:1px solid rgba(87,193,255,.38);color:#fff;border-top-left-radius:4px}
    .tfai-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
    .tfai-chip{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.04);color:#c7cbd4;border-radius:999px;padding:5px 11px;font:500 11.5px/1.4 'Vazirmatn',sans-serif;cursor:pointer}
    .tfai-chip:hover{background:rgba(87,193,255,.16);border-color:rgba(87,193,255,.45);color:#fff}
    .tfai-form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.02)}
    .tfai-in{flex:1 1 auto;min-width:0;height:38px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#fff;padding:0 12px;font:inherit;font-size:13px}
    .tfai-in:focus{outline:2px solid #57c1ff;outline-offset:1px}
    .tfai-send{height:38px;padding:0 14px;border-radius:10px;border:0;background:#57c1ff;color:#07080a;font:700 13px/1 'Vazirmatn',sans-serif;cursor:pointer;flex:0 0 auto}
    .tfai-send:disabled{opacity:.5;cursor:not-allowed}

    @media(max-width:600px){
      .tfai-fab{left:14px;bottom:14px;height:46px;padding:0 14px;font-size:12.5px}
      .tfai-panel{left:0;right:0;bottom:0;width:100%;height:82dvh;border-radius:18px 18px 0 0;border-bottom:0}
      .tfai-qbar{gap:6px}
      .tfai-qbtn{font-size:12px;padding:6px 11px}
    }
    @media print{.tfai-fab,.tfai-panel,.tfai-backdrop,.tfai-qbar{display:none!important}}
  `;
  document.head.appendChild(style);

  // Inject Quick Action Bar under .rep-author or .sub
  const anchor = document.querySelector('.rep-author') || document.querySelector('.sub');
  if (anchor && anchor.parentNode) {
    const qbar = document.createElement('div');
    qbar.className = 'tfai-qbar';
    qbar.innerHTML = `
      <button type="button" class="tfai-qbtn" data-open-ai="summary">✨ خلاصه ۱ دقیقه‌ای AI</button>
      <button type="button" class="tfai-qbtn audio-btn" data-open-ai="audio">🎧 شنیدن خلاصه صوتی (NotebookLM)</button>
      <button type="button" class="tfai-qbtn chat-btn" data-open-ai="chat">💬 گفتگو و پرسش از AI</button>
    `;
    anchor.insertAdjacentElement('afterend', qbar);
  }

  // Starter questions per report
  const starterQs = isBenchmark
    ? ['مهم‌ترین گپ‌های بحرانی TopFast چیه؟', 'اولویت P0 نقشه راه چیه؟', 'تفاوت TopFast با رقبا در واریز و برداشت', 'خلاصه اجرایی برای مدیرعامل بنویس']
    : ['بحرانی‌ترین مغایرت‌ها کدامند؟', 'مشکلات اصلی داشبورد چیست؟', 'اولویت فیکس تیم فرانت چیست؟', 'خلاصه مدیریتی این گزارش را بده'];

  // Create Backdrop, FAB & Panel
  const backdrop = document.createElement('div');
  backdrop.className = 'tfai-backdrop';

  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'tfai-fab';
  fab.setAttribute('aria-label', 'دستیار هوشمند گزارش');
  fab.innerHTML = `<span class="dot-live"></span><span>دستیار AI گزارش</span>`;

  const panel = document.createElement('aside');
  panel.className = 'tfai-panel';
  panel.setAttribute('aria-label', 'دستیار هوشمند گزارش');
  panel.innerHTML = `
    <div class="tfai-head">
      <div class="tfai-head-t">
        <div>
          <b>دستیار هوشمند گزارش</b>
          <small>${endpoint ? 'متصل به Gemini AI · پاسخ دقیق بر اساس گزارش' : 'خلاصه هوشمند + پادکست صوتی + پرسش و پاسخ'}</small>
        </div>
      </div>
      <button type="button" class="tfai-close" aria-label="بستن">×</button>
    </div>
    <div class="tfai-tabs" role="tablist">
      <button type="button" class="tfai-tab on" data-tab="summary">✨ خلاصه AI</button>
      <button type="button" class="tfai-tab" data-tab="audio">🎧 فایل صوتی</button>
      <button type="button" class="tfai-tab" data-tab="chat">💬 چت با گزارش</button>
    </div>
    <div class="tfai-pane on" data-pane="summary">${buildSummaryHTML()}</div>
    <div class="tfai-pane" data-pane="audio">
      <div class="tfai-aud-box">
        <span class="tfai-aud-badge">🎙️ NotebookLM Audio Overview</span>
        <h4>شنیدن خلاصه صوتی گزارش بدون نیاز به خواندن</h4>
        <p>نسخه صوتی تهیه‌شده با NotebookLM برای مرور سریع نکات کلیدی، ریسک‌ها و پیشنهادهای بهبود در مسیر یا جلسه.</p>
        <audio id="tfai-audio" preload="metadata" src="${esc(audioSrc)}"></audio>
        <div id="tfai-aud-player">
          <div class="tfai-aud-ctrl">
            <button type="button" class="tfai-play" id="tfai-play" aria-label="پخش یا توقف">▶</button>
            <button type="button" class="tfai-skip" id="tfai-back">-15s</button>
            <button type="button" class="tfai-skip" id="tfai-fwd">+15s</button>
            <button type="button" class="tfai-spd" id="tfai-spd">1x</button>
          </div>
          <input type="range" class="tfai-range" id="tfai-seek" min="0" max="100" value="0" step="0.1">
          <div class="tfai-time"><span id="tfai-cur">00:00</span><span id="tfai-dur">00:00</span></div>
          <a class="tfai-aud-dl" href="${esc(audioSrc)}" download>⬇ دانلود فایل صوتی (M4A)</a>
        </div>
        <div class="tfai-aud-empty" id="tfai-aud-empty">
          فایل صوتی این گزارش (<code>${esc(audioSrc)}</code>) در دسترس نیست. لطفاً اتصال اینترنت را بررسی کنید یا صفحه را رفرش کنید.
        </div>
      </div>
    </div>
    <div class="tfai-pane" data-pane="chat" style="padding:0">
      <div class="tfai-msgs" id="tfai-msgs" style="padding:14px">
        <div class="tfai-msg bot">
          سلام! 👋 هر سوالی درباره این گزارش داری بپرس تا دقیقاً بر اساس داده‌های همین صفحه جواب دهم.
          <div class="tfai-chips">
            ${starterQs.map((q) => `<button type="button" class="tfai-chip">${esc(q)}</button>`).join('')}
          </div>
        </div>
      </div>
      <form class="tfai-form" id="tfai-form">
        <input class="tfai-in" id="tfai-in" type="text" placeholder="سوال خود را درباره گزارش بنویسید..." autocomplete="off">
        <button class="tfai-send" id="tfai-send" type="submit">ارسال</button>
      </form>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.appendChild(fab);
  document.body.appendChild(panel);

  function setTab(name) {
    panel.querySelectorAll('.tfai-tab').forEach((b) => b.classList.toggle('on', b.dataset.tab === name));
    panel.querySelectorAll('.tfai-pane').forEach((p) => p.classList.toggle('on', p.dataset.pane === name));
  }

  function openPanel(tab) {
    if (tab) setTab(tab);
    panel.classList.add('open');
    backdrop.classList.add('open');
    if (tab === 'chat') {
      setTimeout(() => { const inp = panel.querySelector('#tfai-in'); if (inp) inp.focus(); }, 100);
    }
  }

  function closePanel() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
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

  // Audio Player Logic
  const aud = panel.querySelector('#tfai-audio');
  const playBtn = panel.querySelector('#tfai-play');
  const seek = panel.querySelector('#tfai-seek');
  const curEl = panel.querySelector('#tfai-cur');
  const durEl = panel.querySelector('#tfai-dur');
  const spdBtn = panel.querySelector('#tfai-spd');
  const audPlayerWrap = panel.querySelector('#tfai-aud-player');
  const audEmpty = panel.querySelector('#tfai-aud-empty');
  const speeds = [1, 1.25, 1.5, 2];
  let spdIdx = 0;

  function fmtTime(sec) {
    if (!isFinite(sec) || sec < 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  aud.addEventListener('loadedmetadata', () => {
    durEl.textContent = fmtTime(aud.duration);
    audEmpty.classList.remove('show');
    audPlayerWrap.style.display = '';
  });
  aud.addEventListener('error', () => {
    audPlayerWrap.style.display = 'none';
    audEmpty.classList.add('show');
  });
  aud.addEventListener('timeupdate', () => {
    curEl.textContent = fmtTime(aud.currentTime);
    if (aud.duration) seek.value = (aud.currentTime / aud.duration) * 100;
  });
  aud.addEventListener('play', () => { playBtn.textContent = '⏸'; });
  aud.addEventListener('pause', () => { playBtn.textContent = '▶'; });
  aud.addEventListener('ended', () => { playBtn.textContent = '▶'; });

  playBtn.addEventListener('click', () => (aud.paused ? aud.play().catch(() => {}) : aud.pause()));
  panel.querySelector('#tfai-back').addEventListener('click', () => { aud.currentTime = Math.max(0, aud.currentTime - 15); });
  panel.querySelector('#tfai-fwd').addEventListener('click', () => { aud.currentTime = Math.min(aud.duration || 0, aud.currentTime + 15); });
  spdBtn.addEventListener('click', () => {
    spdIdx = (spdIdx + 1) % speeds.length;
    aud.playbackRate = speeds[spdIdx];
    spdBtn.textContent = speeds[spdIdx] + 'x';
  });
  seek.addEventListener('input', () => {
    if (aud.duration) aud.currentTime = (Number(seek.value) / 100) * aud.duration;
  });

  // Chat Logic
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
      thinking.innerHTML = renderMd('⚠️ ' + (err.message || 'خطا در دریافت پاسخ') + '\n\n' + localSmartAnswer(q));
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
