// تنظیمات دستیار هوشمند و فایل‌های صوتی گزارش‌های TopFast CRM
// روی Vercel از API هم‌دامنه (/api) استفاده می‌کند (بدون نیاز به workers.dev و بدون نیاز به VPN)
window.TOPFAST_AI_CONFIG = {
  endpoint: (typeof location !== 'undefined' && location.hostname.endsWith('github.io'))
    ? "https://topfast-reports-ai.farshchi78.workers.dev"
    : "/api",
  audio: {
    benchmark: "crm-benchmark.m4a",
    issues: "crm-issues.m4a",
  },
};
