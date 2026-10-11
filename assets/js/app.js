/* ============================================================
   Muslim 360 — site interactions
   Feature cards · 3D tilt · scroll reveal · counters · EN/AR i18n
   ============================================================ */
(function () {
  'use strict';

  /* ---- feature data (mirrors the app's Islamic feature grid) ---- */
  var FEATURES = [
    { e: '🕌', c: '#059B52', en: 'Prayer Times',  ar: 'مواقيت الصلاة', es: 'Adhan & reminders',          as: 'الأذان والتذكيرات' },
    { e: '🧭', c: '#1D9E75', en: 'Qibla',          ar: 'القبلة',        es: 'Find the direction',         as: 'اتجاه الكعبة' },
    { e: '📖', c: '#FAC775', en: 'Quran',          ar: 'القرآن',        es: 'Offline & online',           as: 'بدون إنترنت وعبر الإنترنت' },
    { e: '📜', c: '#A16207', en: 'Hadith',         ar: 'الأحاديث',      es: 'Curated & full library',     as: 'مختارة والمكتبة الكاملة' },
    { e: '📿', c: '#8B5CF6', en: 'Dhikr',          ar: 'الذكر',         es: 'Digital tasbih',             as: 'سبحة رقمية' },
    { e: '🗓️', c: '#F59E0B', en: 'Fasting Tracker', ar: 'متتبع الصيام', es: 'Hijri calendar & fasting',   as: 'الهجري والصيام' },
    { e: '✨', c: '#EC4899', en: '99 Names',        ar: 'أسماء الله',    es: 'Asma ul-Husna',              as: 'الأسماء الحسنى' },
    { e: '🤲', c: '#06B6D4', en: 'Duas',            ar: 'الأدعية',       es: 'Daily supplications',        as: 'أدعية يومية' },
    { e: '🙏', c: '#10B981', en: 'Salah Tracker',   ar: 'متابعة الصلاة', es: 'Daily prayer log',           as: 'سجل الصلوات' },
    { e: '🃏', c: '#F97316', en: 'Islamic Flash',   ar: 'بطاقات إسلامية', es: 'Hadith · Quran · Fiqh',     as: 'حديث · قرآن · فقه' },
    { e: '🕋', c: '#EF4444', en: 'Hajj Guide',      ar: 'دليل الحج',     es: 'Step-by-step rites',         as: 'خطوة بخطوة' },
    { e: '🕌', c: '#A78BFA', en: 'Umrah Guide',     ar: 'دليل العمرة',   es: 'Complete guide',             as: 'دليل شامل' },
    { e: '💰', c: '#F59E0B', en: 'Zakat Calc',      ar: 'حاسبة الزكاة',  es: '2.5% calculator',            as: 'حاسبة الزكاة' },
    { e: '🕌', c: '#059B52', en: 'Mosque Finder',   ar: 'أقرب مسجد',     es: 'Mosques nearby',             as: 'مساجد قريبة' },
    { e: '📅', c: '#6366F1', en: 'Islamic Events',  ar: 'المناسبات',     es: 'Ramadan · Eid · more',       as: 'رمضان · عيد والمزيد' },
    { e: '🧠', c: '#0EA5E9', en: 'Hifz Tracker',    ar: 'متتبع الحفظ',   es: '114 surahs progress',        as: 'تتبع حفظ القرآن' },
    { e: '💧', c: '#38BDF8', en: 'Wudu & Salah',    ar: 'الوضوء والصلاة', es: 'Step-by-step guide',        as: 'دليل خطوة بخطوة' },
    { e: '📿', c: '#10B981', en: 'Adhkar',          ar: 'الأذكار',       es: 'Morning & evening',          as: 'الصباح والمساء' },
    { e: '⭐', c: '#C9A84C', en: 'Habit Tracker',    ar: 'متتبع العادات', es: 'Daily Islamic practice',     as: 'العادات اليومية' },
    { e: '🌙', c: '#6366F1', en: 'Ramadan Mode',    ar: 'وضع رمضان',     es: 'Suhoor · Iftar · goals',     as: 'سحور · إفطار · أهداف' }
  ];

  /* ---- translations for static copy ---- */
  var I18N = {
    en: {
      nav_features: 'Features', nav_prayer: 'Prayer', nav_quran: 'Quran', nav_download: 'Download', nav_get: 'Get the app',
      hero_badge: '20+ Islamic tools · Offline ready · Free',
      hero_title_1: 'Your whole deen,', hero_title_2: 'in one place.',
      hero_sub: "Muslim 360 is your daily companion for prayer, Qur'an and remembrance — prayer times, Qibla, the full Quran & Hadith, dhikr, Zakat, Hajj & Umrah guides, and more. Beautifully simple. Fully bilingual. Works offline.",
      badge_get: 'Get it on', badge_dl: 'Download on the',
      meta_surahs: 'Surahs offline', meta_names: 'Names of Allah', meta_prayers: 'Daily prayer alerts', meta_lang: 'Languages · AR/EN',
      scroll: 'Explore',
      feat_eyebrow: 'Everything a Muslim needs', feat_title: 'One app. Twenty tools for your day.',
      feat_lead: 'From the first adhan to the last dhikr — every essential, crafted with care and ready offline.',
      pray_eyebrow: 'Never miss a prayer', pray_title: 'Precise prayer times, right where you are.',
      pray_body: 'Accurate adhan times calculated from your exact location, with gentle reminders before each salah. A live Qibla compass points you to the Kaaba, and the Salah tracker keeps your daily record.',
      pray_t1: 'Automatic location-based prayer times', pray_t2: 'Adhan & pre-prayer notifications', pray_t3: 'Live Qibla compass', pray_t4: 'Daily Salah tracker & streaks',
      qur_eyebrow: 'Read. Listen. Memorise.', qur_title: "The complete Qur'an, online & offline.",
      qur_body: 'All 114 surahs available offline, plus online recitations, Warsh narration and tafsir. Track your Hifz across every surah, and explore a full Hadith library of nine collections.',
      qur_t1: '114 surahs · works fully offline', qur_t2: 'Reciters, Warsh & tafsir online', qur_t3: 'Hifz tracker for memorisation', qur_t4: '9 Hadith collections — read or download',
      stat_tools: 'Islamic tools', stat_surahs: 'Surahs offline', stat_hadith: 'Hadith collections', stat_free: 'Free & offline',
      bi_title: 'Built for everyone —', bi_body: 'Switch the whole experience between English and Arabic with full right-to-left support. Every screen, every word, carefully localised.',
      bi_btn: 'Try Arabic mode',
      dl_title: 'Start your day with Muslim 360.', dl_body: 'Free to download. No sign-up required. Your deen, organised.',
      foot_tag: "Your daily companion for prayer, Qur'an and remembrance.", foot_made: 'Made with ihsan'
    },
    ar: {
      nav_features: 'المزايا', nav_prayer: 'الصلاة', nav_quran: 'القرآن', nav_download: 'تحميل', nav_get: 'حمّل التطبيق',
      hero_badge: '+٢٠ أداة إسلامية · تعمل بدون إنترنت · مجانًا',
      hero_title_1: 'دينك كله،', hero_title_2: 'في مكان واحد.',
      hero_sub: 'مسلم 360 رفيقك اليومي للصلاة والقرآن والذكر — مواقيت الصلاة، القبلة، القرآن والحديث كاملاً، الذكر، الزكاة، أدلة الحج والعمرة، والمزيد. بسيط وجميل. ثنائي اللغة بالكامل. يعمل بدون إنترنت.',
      badge_get: 'متوفر على', badge_dl: 'حمّله من',
      meta_surahs: 'سورة بدون إنترنت', meta_names: 'اسمًا لله', meta_prayers: 'تنبيهات الصلاة', meta_lang: 'لغتان · عربي/إنجليزي',
      scroll: 'استكشف',
      feat_eyebrow: 'كل ما يحتاجه المسلم', feat_title: 'تطبيق واحد. عشرون أداة ليومك.',
      feat_lead: 'من أول أذان إلى آخر ذكر — كل أساسي، مصنوع بعناية وجاهز بدون إنترنت.',
      pray_eyebrow: 'لا تفوّت صلاة', pray_title: 'مواقيت صلاة دقيقة أينما كنت.',
      pray_body: 'مواقيت أذان دقيقة محسوبة من موقعك تمامًا، مع تذكيرات لطيفة قبل كل صلاة. بوصلة قبلة حيّة توجهك إلى الكعبة، ومتتبع الصلاة يحفظ سجلك اليومي.',
      pray_t1: 'مواقيت صلاة تلقائية حسب الموقع', pray_t2: 'إشعارات الأذان وقبل الصلاة', pray_t3: 'بوصلة قبلة حيّة', pray_t4: 'متتبع صلاة يومي وسلاسل',
      qur_eyebrow: 'اقرأ. استمع. احفظ.', qur_title: 'القرآن كاملاً، أونلاين وبدون إنترنت.',
      qur_body: 'جميع السور الـ١١٤ متاحة بدون إنترنت، بالإضافة إلى التلاوات وقراءة ورش والتفسير عبر الإنترنت. تابع حفظك عبر كل سورة، واستكشف مكتبة حديث كاملة من تسع مجموعات.',
      qur_t1: '١١٤ سورة · تعمل بدون إنترنت', qur_t2: 'قرّاء وورش وتفسير أونلاين', qur_t3: 'متتبع الحفظ', qur_t4: '٩ مجموعات حديث — اقرأ أو نزّل',
      stat_tools: 'أداة إسلامية', stat_surahs: 'سورة بدون إنترنت', stat_hadith: 'مجموعة حديث', stat_free: 'مجاني وبدون إنترنت',
      bi_title: 'مصمّم للجميع —', bi_body: 'بدّل التجربة كاملة بين الإنجليزية والعربية مع دعم كامل للكتابة من اليمين لليسار. كل شاشة، كل كلمة، مترجمة بعناية.',
      bi_btn: 'جرّب الوضع العربي',
      dl_title: 'ابدأ يومك مع مسلم 360.', dl_body: 'تحميل مجاني. بدون تسجيل. دينك، منظّم.',
      foot_tag: 'رفيقك اليومي للصلاة والقرآن والذكر.', foot_made: 'صُنع بإحسان'
    }
  };

  function hex2rgba(hex, a) {
    var h = hex.replace('#', '');
    var n = parseInt(h, 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  /* ---- build feature cards ---- */
  var grid = document.getElementById('featGrid');
  if (grid) {
    FEATURES.forEach(function (f) {
      var card = document.createElement('article');
      card.className = 'feat-card';
      card.setAttribute('data-reveal', '');
      card.setAttribute('data-tilt', '');
      card.style.setProperty('--c', f.c);
      card.innerHTML =
        '<div class="feat-ic" style="background:' + hex2rgba(f.c, 0.14) + ';border:1px solid ' + hex2rgba(f.c, 0.35) + '">' + f.e + '</div>' +
        '<h3 data-en="' + f.en + '" data-ar="' + f.ar + '">' + f.en + '</h3>' +
        '<p data-en="' + f.es + '" data-ar="' + f.as + '">' + f.es + '</p>';
      grid.appendChild(card);
    });
  }

  /* ---- 3D tilt (pointer) ---- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    var attachTilt = function (el, max) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (px * 100) + '%');
        el.style.setProperty('--my', (py * 100) + '%');
        var rx = (0.5 - py) * max, ry = (px - 0.5) * max;
        if (el.classList.contains('phone')) {
          el.style.transform = 'rotateY(' + (-16 + ry) + 'deg) rotateX(' + (7 + rx) + 'deg)';
        } else {
          el.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
        }
      });
      el.addEventListener('pointerleave', function () {
        el.style.transform = el.classList.contains('phone') ? '' : '';
      });
    };
    // defer so injected cards exist
    requestAnimationFrame(function () {
      document.querySelectorAll('.feat-card').forEach(function (c) { attachTilt(c, 10); });
      document.querySelectorAll('.phone').forEach(function (p) { attachTilt(p, 8); });
    });
  }

  /* ---- scroll reveal ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  function observeReveals() { document.querySelectorAll('[data-reveal]:not(.in)').forEach(function (n) { io.observe(n); }); }
  observeReveals();

  /* ---- animated counters ---- */
  var counters = document.querySelectorAll('[data-count]');
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target, target = +el.getAttribute('data-count'), suf = el.getAttribute('data-suffix') || '';
      var start = performance.now(), dur = 1400;
      function step(now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(function (c) { cio.observe(c); });

  /* ---- nav scrolled state ---- */
  var nav = document.getElementById('nav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 24); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- language toggle (EN / AR) ---- */
  var lang = 'en';
  function applyLang(l) {
    lang = l;
    var dict = I18N[l];
    document.body.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', l);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });
    // feature cards carry their own en/ar text
    document.querySelectorAll('.feat-card [data-en]').forEach(function (el) {
      el.textContent = el.getAttribute(l === 'ar' ? 'data-ar' : 'data-en');
    });
    try { localStorage.setItem('m360_lang', l); } catch (e) {}
  }
  function toggleLang() { applyLang(lang === 'en' ? 'ar' : 'en'); }
  ['langToggle', 'langToggle2'].forEach(function (id) {
    var b = document.getElementById(id);
    if (b) b.addEventListener('click', toggleLang);
  });
  try {
    var saved = localStorage.getItem('m360_lang');
    if (saved === 'ar') applyLang('ar');
  } catch (e) {}

  /* ---- year + boot splash ---- */
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  window.addEventListener('load', function () {
    setTimeout(function () {
      var boot = document.getElementById('boot');
      if (boot) { boot.classList.add('hide'); setTimeout(function () { boot.remove(); }, 600); }
    }, 500);
  });
})();
