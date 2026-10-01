'use client';
import { useState } from 'react';

type Lang = 'en' | 'hi' | 'pa' | 'ur' | 'bn';

const TRANSLATIONS: Record<Exclude<Lang, 'en'>, Record<string, string>> = {
  hi: {
    'District Court Lawyer': 'जिला न्यायालय अधिवक्ता',
    About: 'परिचय',
    'Practice Areas': 'अभ्यास क्षेत्र',
    Process: 'प्रक्रिया',
    Contact: 'संपर्क',
    'Book Consultation': 'परामर्श बुक करें',
    'Justice with': 'न्याय के साथ',
    'clarity.': 'स्पष्टता।',
    'Request Consultation →': 'परामर्श का अनुरोध करें →',
    'Explore Practice Areas': 'अभ्यास क्षेत्र देखें',
    'Direct consultation': 'प्रत्यक्ष परामर्श',
    'Court representation': 'न्यायालय में प्रतिनिधित्व',
    'Case-focused strategy': 'मामला-केंद्रित रणनीति',
    'A focused legal practice in Unnao.': 'उन्नाव में केंद्रित कानूनी अभ्यास।',
    'Criminal Law': 'फौजदारी कानून',
    'Land & Property': 'भूमि एवं संपत्ति',
    'Marriage & Family': 'विवाह एवं परिवार',
    'Civil Disputes': 'दीवानी विवाद',
  },
  pa: {
    'District Court Lawyer': 'ਜ਼ਿਲ੍ਹਾ ਅਦਾਲਤ ਵਕੀਲ',
    About: 'ਬਾਰੇ',
    'Practice Areas': 'ਅਭਿਆਸ ਖੇਤਰ',
    Process: 'ਪ੍ਰਕਿਰਿਆ',
    Contact: 'ਸੰਪਰਕ',
    'Book Consultation': 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
  },
  ur: {
    'District Court Lawyer': 'ضلعی عدالت وکیل',
    About: 'تعارف',
    'Practice Areas': 'پریکٹس کے شعبے',
    Process: 'عمل',
    Contact: 'رابطہ',
    'Book Consultation': 'مشاورت بک کریں',
  },
  bn: {
    'District Court Lawyer': 'জেলা আদালত আইনজীবী',
    About: 'সম্পর্কে',
    'Practice Areas': 'অনুশীলন এলাকা',
    Process: 'প্রক্রিয়া',
    Contact: 'যোগাযোগ',
    'Book Consultation': 'পরামর্শ বুক করুন',
  },
};

function translate(lang: Lang, text: string): string {
  if (lang === 'en') return text;
  return TRANSLATIONS[lang]?.[text] ?? text;
}

function applyTranslations(lang: Lang) {
  if (typeof document === 'undefined') return;
  if (lang === 'en') {
    document.querySelectorAll('[data-i18n-orig]').forEach((el) => {
      el.textContent = el.getAttribute('data-i18n-orig') ?? '';
    });
    return;
  }
  const map = TRANSLATIONS[lang] ?? {};
  document.querySelectorAll('*:not(script):not(style)').forEach((el) => {
    if (el.children.length === 0 && el.textContent) {
      const original = el.getAttribute('data-i18n-orig') ?? el.textContent.trim();
      const translated = map[original];
      if (translated) {
        if (!el.getAttribute('data-i18n-orig')) el.setAttribute('data-i18n-orig', original);
        el.textContent = translated;
      }
    }
  });
}

export default function LangSwitcher() {
  const [lang, setLang] = useState<Lang>('en');

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value as Lang;
    setLang(v);
    applyTranslations(v);
  }

  return (
    <div className="lang-switcher" aria-label="Language selector">
      <span>文</span>
      <select id="languageSelect" value={lang} onChange={handleChange}>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="pa">ਪੰਜਾਬੀ</option>
        <option value="ur">اردو</option>
        <option value="bn">বাংলা</option>
      </select>
    </div>
  );
}
