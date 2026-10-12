/* ============================================================
   Muslim 360 — site interactions
   Feature cards · 3D tilt · scroll reveal · counters · EN/AR i18n
   ============================================================ */
(function () {
  'use strict';

  /* ---- feature data (mirrors the app's Islamic feature grid) ---- */
  var FEATURES = [
    { e: '🕌', c: '#059B52', en: 'Prayer Times',   ar: 'مواقيت الصلاة',    es: 'Adhan & smart reminders',    as: 'الأذان والتذكيرات الذكية' },
    { e: '⏰', c: '#F59E0B', en: 'Alarm',           ar: 'المنبّه',           es: 'Islamic alarm with adhan',   as: 'منبّه إسلامي بالأذان' },
    { e: '📓', c: '#8B5CF6', en: 'Journal',         ar: 'اليوميات',          es: 'Reflect, grow & be grateful',as: 'تأمل وازدهر واشكر' },
    { e: '🔒', c: '#EF4444', en: 'App Blocker',     ar: 'حاجب التطبيقات',   es: 'Block distractions & focus', as: 'احجب المُشتِّتات وركّز' },
    { e: '⭐', c: '#C9A84C', en: 'Habit Tracker',   ar: 'متتبع العادات',     es: 'Build daily Islamic habits', as: 'ابنِ عاداتك الإسلامية' },
    { e: '🙏', c: '#10B981', en: 'Salah Tracker',   ar: 'متابعة الصلاة',    es: 'Daily prayer log & streaks', as: 'سجل الصلوات واستمرارك' },
    { e: '🧭', c: '#1D9E75', en: 'Qibla',           ar: 'القبلة',            es: 'Live compass to the Kaaba',  as: 'بوصلة حية للكعبة' },
    { e: '📖', c: '#FAC775', en: 'Quran',           ar: 'القرآن',            es: 'Offline & online',           as: 'بدون إنترنت وعبر الإنترنت' },
    { e: '🧠', c: '#0EA5E9', en: 'Hifz Tracker',   ar: 'متتبع الحفظ',      es: '114 surahs progress',        as: 'تتبع حفظ القرآن' },
    { e: '📜', c: '#A16207', en: 'Hadith',          ar: 'الأحاديث',          es: '9 curated collections',      as: 'تسع مجموعات مختارة' },
    { e: '📿', c: '#10B981', en: 'Adhkar',          ar: 'الأذكار',           es: 'Morning & evening dhikr',    as: 'أذكار الصباح والمساء' },
    { e: '📿', c: '#8B5CF6', en: 'Dhikr',           ar: 'الذكر',             es: 'Digital tasbih counter',     as: 'سبحة رقمية' },
    { e: '🤲', c: '#06B6D4', en: 'Duas',            ar: 'الأدعية',           es: 'Daily supplications',        as: 'أدعية يومية' },
    { e: '🗓️', c: '#F59E0B', en: 'Fasting Tracker', ar: 'متتبع الصيام',    es: 'Hijri calendar & fasting',   as: 'الهجري والصيام' },
    { e: '✨', c: '#EC4899', en: '99 Names',         ar: 'أسماء الله',        es: 'Asma ul-Husna',              as: 'الأسماء الحسنى' },
    { e: '🕋', c: '#EF4444', en: 'Hajj Guide',      ar: 'دليل الحج',         es: 'Step-by-step rites',         as: 'خطوة بخطوة' },
    { e: '🕌', c: '#A78BFA', en: 'Umrah Guide',     ar: 'دليل العمرة',       es: 'Complete guide',             as: 'دليل شامل' },
    { e: '💰', c: '#F59E0B', en: 'Zakat Calc',      ar: 'حاسبة الزكاة',     es: '2.5% calculator',            as: 'حاسبة الزكاة' },
    { e: '🕌', c: '#059B52', en: 'Mosque Finder',   ar: 'أقرب مسجد',         es: 'Mosques nearby',             as: 'مساجد قريبة' },
    { e: '🌙', c: '#6366F1', en: 'Ramadan Mode',    ar: 'وضع رمضان',         es: 'Suhoor · Iftar · goals',     as: 'سحور · إفطار · أهداف' },
    { e: '💧', c: '#38BDF8', en: 'Wudu & Salah',   ar: 'الوضوء والصلاة',    es: 'Step-by-step guide',         as: 'دليل خطوة بخطوة' },
    { e: '🃏', c: '#F97316', en: 'Islamic Flash',   ar: 'بطاقات إسلامية',    es: 'Hadith · Quran · Fiqh',      as: 'حديث · قرآن · فقه' },
    { e: '📅', c: '#6366F1', en: 'Islamic Events',  ar: 'المناسبات',          es: 'Ramadan · Eid · more',       as: 'رمضان · عيد والمزيد' }
  ];

  /* ---- translations for static copy ---- */
  var I18N = {
    en: {
      nav_features: 'Features', nav_prayer: 'Prayer', nav_quran: 'Quran', nav_download: 'Download', nav_get: 'Get the app',
      hero_badge: 'Discipline · Growth · Faith — all in one app',
      hero_title_1: 'Become a better Muslim,', hero_title_2: 'every single day.',
      hero_sub: "Muslim 360 gives you the tools to build real discipline — wake up with an Islamic alarm, block distracting apps, track your prayers and habits, journal your growth, and stay connected to Qur'an, Dhikr and Dua. One app. A lifetime of improvement.",
      badge_get: 'Get it on', badge_dl: 'Download on the',
      meta_surahs: 'Surahs offline', meta_names: 'Names of Allah', meta_prayers: 'Daily prayer alerts', meta_lang: 'Languages · AR/EN',
      scroll: 'Explore',
      feat_eyebrow: 'Built for discipline & growth', feat_title: 'Every tool you need to level up your deen.',
      feat_lead: 'From an adhan alarm that wakes you for Fajr, to an app blocker that kills distractions — Muslim 360 is your daily system for becoming a better Muslim.',
      pray_eyebrow: 'Never miss a prayer', pray_title: 'Precise prayer times, right where you are.',
      pray_body: 'Accurate adhan times calculated from your exact location, with gentle reminders before each salah. A live Qibla compass points you to the Kaaba, and the Salah tracker keeps your daily streak alive.',
      pray_t1: 'Automatic location-based prayer times', pray_t2: 'Adhan alarm & pre-prayer notifications', pray_t3: 'Live Qibla compass', pray_t4: 'Daily Salah tracker & streaks',
      qur_eyebrow: 'Read. Listen. Memorise.', qur_title: "The complete Qur'an, online & offline.",
      qur_body: 'All 114 surahs available offline, plus online recitations, Warsh narration and tafsir. Track your Hifz across every surah, and explore a full Hadith library of nine collections.',
      qur_t1: '114 surahs · works fully offline', qur_t2: 'Reciters, Warsh & tafsir online', qur_t3: 'Hifz tracker for memorisation', qur_t4: '9 Hadith collections — read or download',
      stat_tools: 'Islamic tools', stat_surahs: 'Surahs offline', stat_hadith: 'Hadith collections', stat_free: 'Free & offline',
      bi_title: 'Built for everyone —', bi_body: 'Switch the whole experience between English and Arabic with full right-to-left support. Every screen, every word, carefully localised.',
      bi_btn: 'Try Arabic mode',
      dl_title: 'Your journey to a better Muslim starts now.', dl_body: 'Free to download. No sign-up. Wake up. Block. Pray. Reflect. Repeat.',
      foot_tag: 'Discipline · Prayer · Growth — your daily Islamic companion.', foot_made: 'Made with ihsan'
    },
    ar: {
      nav_features: 'المزايا', nav_prayer: 'الصلاة', nav_quran: 'القرآن', nav_download: 'تحميل', nav_get: 'حمّل التطبيق',
      hero_badge: 'انضباط · نمو · إيمان — كله في تطبيق واحد',
      hero_title_1: 'كن مسلمًا أفضل،', hero_title_2: 'كل يوم من جديد.',
      hero_sub: 'مسلم 360 يمنحك أدوات الانضباط الحقيقي — استيقظ بمنبّه إسلامي، احجب التطبيقات المُشتِّتة، تتبّع صلواتك وعاداتك، دوّن نموّك الروحي، وابقَ متصلاً بالقرآن والذكر والدعاء. تطبيق واحد. تحسُّن مستمر.',
      badge_get: 'متوفر على', badge_dl: 'حمّله من',
      meta_surahs: 'سورة بدون إنترنت', meta_names: 'اسمًا لله', meta_prayers: 'تنبيهات الصلاة', meta_lang: 'لغتان · عربي/إنجليزي',
      scroll: 'استكشف',
      feat_eyebrow: 'مصمّم للانضباط والنمو', feat_title: 'كل أداة تحتاجها لترقية دينك.',
      feat_lead: 'من منبّه الأذان الذي يوقظك للفجر، إلى حاجب التطبيقات الذي يُبعد المُشتِّتات — مسلم 360 نظامك اليومي لتكون مسلمًا أفضل.',
      pray_eyebrow: 'لا تفوّت صلاة', pray_title: 'مواقيت صلاة دقيقة أينما كنت.',
      pray_body: 'مواقيت أذان دقيقة محسوبة من موقعك تمامًا، مع تذكيرات لطيفة قبل كل صلاة. بوصلة قبلة حيّة توجهك إلى الكعبة، ومتتبع الصلاة يحفظ استمرارك اليومي.',
      pray_t1: 'مواقيت صلاة تلقائية حسب الموقع', pray_t2: 'منبّه الأذان وإشعارات الصلاة', pray_t3: 'بوصلة قبلة حيّة', pray_t4: 'متتبع صلاة يومي وسلاسل',
      qur_eyebrow: 'اقرأ. استمع. احفظ.', qur_title: 'القرآن كاملاً، أونلاين وبدون إنترنت.',
      qur_body: 'جميع السور الـ١١٤ متاحة بدون إنترنت، بالإضافة إلى التلاوات وقراءة ورش والتفسير عبر الإنترنت. تابع حفظك عبر كل سورة، واستكشف مكتبة حديث كاملة من تسع مجموعات.',
      qur_t1: '١١٤ سورة · تعمل بدون إنترنت', qur_t2: 'قرّاء وورش وتفسير أونلاين', qur_t3: 'متتبع الحفظ', qur_t4: '٩ مجموعات حديث — اقرأ أو نزّل',
      stat_tools: 'أداة إسلامية', stat_surahs: 'سورة بدون إنترنت', stat_hadith: 'مجموعة حديث', stat_free: 'مجاني وبدون إنترنت',
      bi_title: 'مصمّم للجميع —', bi_body: 'بدّل التجربة كاملة بين الإنجليزية والعربية مع دعم كامل للكتابة من اليمين لليسار. كل شاشة، كل كلمة، مترجمة بعناية.',
      bi_btn: 'جرّب الوضع العربي',
      dl_title: 'رحلتك نحو مسلم أفضل تبدأ الآن.', dl_body: 'تحميل مجاني. بدون تسجيل. استيقظ. احجب. صلّ. تأمّل. كرّر.',
      foot_tag: 'انضباط · صلاة · نمو — رفيقك الإسلامي اليومي.', foot_made: 'صُنع بإحسان'
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
