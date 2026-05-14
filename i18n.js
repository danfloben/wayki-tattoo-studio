// i18n.js - simple client-side internationalization
document.addEventListener('DOMContentLoaded', () => {
  const defaultLang = 'es';
  const stored = localStorage.getItem('lang') || defaultLang;
  setLanguage(stored);

  // language switcher buttons
  const langSwitcher = document.querySelector('.lang-switcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('change', () => {
      const lang = langSwitcher.value;
      setLanguage(lang);
    });
  }
});

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  fetch(`i18n/${lang}.json`)
    .then(r => r.json())
    .then(dict => {
      document.documentElement.lang = lang;
      const selector = document.querySelector('.lang-switcher');
      if (selector) selector.value = lang;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (dict[key] !== undefined) {
          // preserve inner HTML structure (e.g., spans) by inserting raw HTML
          el.innerHTML = dict[key];
        }
      });
    })
    .catch(err => console.error('i18n load error', err));
}
