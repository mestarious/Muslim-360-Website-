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
      qur_t1: '114 surahs · works fully offline', qur_t2: '10 reciters — Hafs & Warsh narrations', qur_t3: '70+ tafsir in 30+ languages', qur_t4: '9 Hadith collections — read or download',
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
      qur_t1: '١١٤ سورة · تعمل بدون إنترنت', qur_t2: '١٠ قرّاء — رواية حفص وورش', qur_t3: '+٧٠ تفسير بأكثر من ٣٠ لغة', qur_t4: '٩ مجموعات حديث — اقرأ أو نزّل',
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

  /* ---- feature + tab screens ---- */
  var SCREENS = {
    'Prayer Times': '<div class="ms"><div class="ms-hd">🕌 Prayer Times<span>📍 Makkah, SA</span></div><div class="ms-green-card" style="text-align:center"><small style="font-size:10px;color:#9fd9b8;letter-spacing:.1em;font-weight:700">NEXT · ASR IN</small><b style="font-size:32px;color:#fff;display:block;margin-top:4px">1:24:08</b></div><div class="ms-row">Fajr<span>05:12</span></div><div class="ms-row">Dhuhr<span>12:28</span></div><div class="ms-row hi">Asr<span>15:47</span></div><div class="ms-row">Maghrib<span>18:31</span></div><div class="ms-row">Isha<span>20:01</span></div></div>',
    'Alarm': '<div class="ms"><div class="ms-hd">⏰ Alarm<span>3 active</span></div><div class="ms-alarm-row"><div><div class="time">05:00</div><div class="lbl">Fajr Alarm · Adhan</div></div><div class="ms-toggle"></div></div><div class="ms-alarm-row"><div><div class="time">07:30</div><div class="lbl">Morning routine</div></div><div class="ms-toggle"></div></div><div class="ms-alarm-row"><div><div class="time">13:00</div><div class="lbl">Dhuhr reminder</div></div><div class="ms-toggle off"></div></div><div style="margin-top:12px;text-align:center"><div style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:12px;background:rgba(5,155,82,.15);border:1px solid rgba(5,155,82,.35);color:var(--green);font-size:13px;font-weight:700">＋ Add Alarm</div></div></div>',
    'Journal': '<div class="ms"><div class="ms-hd">📓 Journal<span>Today · 12 Oct</span></div><div style="font-size:11px;color:var(--muted-2);margin-bottom:6px">How are you feeling?</div><div class="ms-journal-mood"><span class="sel">😌</span><span>😊</span><span>😔</span><span>😤</span><span>🤲</span></div><div style="font-size:11px;color:var(--muted-2);margin-bottom:6px">Today\'s reflection</div><div class="ms-journal-text">Alhamdulillah for today. Made all 5 prayers on time. Felt peace after Fajr...</div><div class="ms-sep"></div><div style="font-size:11px;color:var(--muted-2);margin-bottom:6px">3 things I\'m grateful for</div><div class="ms-row">1. Family health ✓</div><div class="ms-row">2. Completed Quran page</div><div class="ms-row">3. Made Fajr on time 🌅</div></div>',
    'App Blocker': '<div class="ms"><div class="ms-hd">🔒 App Blocker<span>Focus Mode</span></div><div class="ms-blocker-timer"><b>47:23</b><small>Focus session remaining</small></div><div class="ms-sep"></div><div style="font-size:11px;color:var(--muted-2);margin-bottom:8px">Blocked right now</div><div class="ms-row hi" style="gap:10px"><span>📱 Instagram</span><span class="ms-pill">Blocked</span></div><div class="ms-row" style="gap:10px"><span>🎵 TikTok</span><span class="ms-pill">Blocked</span></div><div class="ms-row" style="gap:10px"><span>🎮 Games</span><span class="ms-pill">Blocked</span></div><div class="ms-row" style="gap:10px"><span>📺 YouTube</span><span class="ms-pill">Blocked</span></div></div>',
    'Habit Tracker': '<div class="ms"><div class="ms-hd">⭐ Habits<span>Today · 4/6 done</span></div><div class="ms-habit-row"><div class="cb done">✓</div><span>Fajr on time</span><small>🔥 12</small></div><div class="ms-habit-row"><div class="cb done">✓</div><span>Morning Adhkar</span><small>🔥 8</small></div><div class="ms-habit-row"><div class="cb done">✓</div><span>Quran — 1 page</span><small>🔥 21</small></div><div class="ms-habit-row"><div class="cb done">✓</div><span>Dhuha prayer</span><small>🔥 5</small></div><div class="ms-habit-row"><div class="cb"></div><span>Evening Adhkar</span><small style="color:var(--muted-2)">—</small></div><div class="ms-habit-row"><div class="cb"></div><span>Read Hadith</span><small style="color:var(--muted-2)">—</small></div></div>',
    'Salah Tracker': '<div class="ms"><div class="ms-hd">🙏 Salah Tracker<span>This week</span></div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;font-size:9px;color:var(--muted-2);text-align:center;margin-bottom:4px"><span>Fajr</span><span>Dhuhr</span><span>Asr</span><span>Maghrib</span><span>Isha</span></div><div class="ms-salah-grid"><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot miss"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot done"></div><div class="ms-salah-dot empty"></div><div class="ms-salah-dot empty"></div><div class="ms-salah-dot empty"></div><div class="ms-salah-dot empty"></div><div class="ms-salah-dot empty"></div></div><div class="ms-sep"></div><div class="ms-green-card" style="text-align:center"><small style="color:#9fd9b8;font-size:10px;font-weight:700">CURRENT STREAK</small><b style="font-size:28px;color:#fff;display:block">🔥 12 days</b></div></div>',
    'Qibla': '<div class="ms"><div class="ms-hd">🧭 Qibla<span>Live compass</span></div><div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center"><div class="ms-compass"><div class="ms-compass-needle"></div></div><b style="text-align:center;color:#fff;font-size:15px">Qibla Direction</b><small style="color:var(--muted-2);font-size:11px;margin-top:4px">22° North-East</small><small style="color:var(--green);font-size:11px;margin-top:8px">📍 Distance to Makkah</small><b style="color:var(--gold);font-size:18px;margin-top:4px">4,218 km</b></div></div>',
    'Quran': '<div class="ms"><div class="ms-hd">📖 Surah Al-Fatiha<span>1 · 7 ayahs</span></div><div style="text-align:center;font-size:14px;color:var(--gold);font-family:var(--ar);margin:10px 0">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div><div style="font-family:var(--ar);direction:rtl;text-align:right;font-size:19px;line-height:2.2;color:#eef7f1">ٱلْحَمْدُ لِلَّٰهِ رَبِّ ٱلْعَٰلَمِينَ ﴿١﴾ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ﴿٢﴾</div><div style="font-size:12px;color:var(--muted);margin-top:8px;line-height:1.6">[1] All praise is for Allah — Lord of all worlds</div><div class="ms-sep"></div><div style="display:flex;gap:8px;flex-wrap:wrap"><span class="ms-chip">📥 Offline</span><span class="ms-chip">🎧 Mishary</span><span class="ms-chip">📚 Ibn Kathir</span></div></div>',
    'Hifz Tracker': '<div class="ms"><div class="ms-hd">🧠 Hifz Tracker<span>62% memorised</span></div><div class="ms-progress" style="height:10px;margin-bottom:14px"><i style="width:62%"></i></div><div class="ms-hifz-row"><div class="num">1</div><div class="name">Al-Fatiha</div><div class="pct" style="color:var(--green)">100%</div></div><div class="ms-progress"><i style="width:100%"></i></div><div class="ms-hifz-row"><div class="num">36</div><div class="name">Ya-Sin</div><div class="pct" style="color:var(--green)">100%</div></div><div class="ms-progress"><i style="width:100%"></i></div><div class="ms-hifz-row"><div class="num">67</div><div class="name">Al-Mulk</div><div class="pct">78%</div></div><div class="ms-progress"><i style="width:78%"></i></div><div class="ms-hifz-row"><div class="num">2</div><div class="name">Al-Baqarah</div><div class="pct" style="color:var(--muted-2)">12%</div></div><div class="ms-progress"><i style="width:12%"></i></div></div>',
    'Hadith': '<div class="ms"><div class="ms-hd">📜 Hadith<span>Sahih Al-Bukhari</span></div><div class="ms-green-card"><small style="font-size:10px;color:#9fd9b8;font-weight:700">BOOK OF FAITH · #1</small><p style="font-size:13px;color:#eef7f1;line-height:1.7;margin:10px 0">"Actions are judged by intentions, and every person will get the reward according to what they intended."</p><small style="color:var(--muted-2)">— Prophet Muhammad ﷺ</small></div><div class="ms-sep"></div><div class="ms-row" style="margin-top:6px">عمر بن الخطاب (Umar ibn al-Khattab)</div><div style="display:flex;gap:6px;margin-top:10px"><span class="ms-chip">📚 Bukhari</span><span class="ms-chip">⭐ Sahih</span></div></div>',
    'Adhkar': '<div class="ms"><div class="ms-hd">📿 Morning Adhkar<span>6 / 10 done</span></div><div class="ms-adhkar-row"><p>أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّٰهِ</p><div class="cnt">×3</div></div><div class="ms-adhkar-row"><p>الْحَمْدُ لِلَّٰهِ الَّذِي أَحْيَانَا</p><div class="cnt">×1</div></div><div class="ms-adhkar-row" style="opacity:.45"><p>لَا إِلَٰهَ إِلَّا اللَّٰهُ وَحْدَهُ</p><div class="cnt" style="color:var(--muted-2)">×10</div></div><div class="ms-progress" style="height:8px;margin-top:12px"><i style="width:60%"></i></div><div style="text-align:center;font-size:11px;color:var(--muted-2);margin-top:6px">60% complete</div></div>',
    'Dhikr': '<div class="ms" style="align-items:center;justify-content:center"><div class="ms-hd" style="width:100%">📿 Dhikr<span>سُبْحَانَ اللَّٰهِ</span></div><div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px"><div style="font-family:var(--ar);font-size:22px;color:#eef7f1;text-align:center">سُبْحَانَ اللَّٰهِ</div><div style="width:130px;height:130px;border-radius:50%;background:linear-gradient(135deg,rgba(5,155,82,.3),rgba(5,155,82,.08));border:2px solid rgba(5,155,82,.5);display:flex;align-items:center;justify-content:center"><b style="font-size:52px;color:#fff;font-weight:800">47</b></div><div style="font-size:11px;color:var(--green);letter-spacing:.1em">TAP TO COUNT · GOAL: 100</div></div></div>',
    'Duas': '<div class="ms"><div class="ms-hd">🤲 Duas<span>Daily supplications</span></div><div class="ms-row gold">🌅 Morning Duas</div><div class="ms-row">🌙 Evening Duas</div><div class="ms-row">🍽️ Before &amp; After Eating</div><div class="ms-row">🚗 Travelling</div><div class="ms-row">💤 Before Sleep</div><div class="ms-row">🕌 Entering Mosque</div><div class="ms-row">😔 Dua for Anxiety</div><div style="text-align:center;margin-top:10px;font-size:11px;color:var(--muted-2)">100+ duas in all categories</div></div>',
    'Fasting Tracker': '<div class="ms"><div class="ms-hd">🗓️ Fasting<span>Rajab 1446H</span></div><div style="font-size:11px;color:var(--muted-2);margin-bottom:8px">Mon Tue Wed Thu Fri Sat Sun</div><div class="ms-cal-grid"><div class="ms-cal-day">1</div><div class="ms-cal-day fast">2</div><div class="ms-cal-day">3</div><div class="ms-cal-day fast">4</div><div class="ms-cal-day fast">5</div><div class="ms-cal-day">6</div><div class="ms-cal-day">7</div><div class="ms-cal-day fast">8</div><div class="ms-cal-day">9</div><div class="ms-cal-day fast">10</div><div class="ms-cal-day fast today">11</div><div class="ms-cal-day">12</div><div class="ms-cal-day">13</div><div class="ms-cal-day">14</div></div><div class="ms-sep"></div><div class="ms-row hi">This month: <span>7 days fasted 🌙</span></div><div class="ms-row">Mon &amp; Thu streak: <span class="ms-pill">4</span></div></div>',
    '99 Names': '<div class="ms"><div class="ms-hd">✨ 99 Names<span>Asma ul-Husna</span></div><div class="ms-names-grid"><div class="ms-name-cell"><b>ٱللَّٰه</b><small>Allah</small></div><div class="ms-name-cell"><b>ٱلرَّحْمَٰن</b><small>Ar-Rahman</small></div><div class="ms-name-cell"><b>ٱلرَّحِيم</b><small>Ar-Raheem</small></div><div class="ms-name-cell"><b>ٱلْمَلِك</b><small>Al-Malik</small></div><div class="ms-name-cell"><b>ٱلْقُدُّوس</b><small>Al-Quddus</small></div><div class="ms-name-cell"><b>ٱلسَّلَام</b><small>As-Salam</small></div></div><div class="ms-sep"></div><div style="font-size:11px;color:var(--muted-2);margin-bottom:6px">Today\'s focus</div><div class="ms-row gold"><div><div style="font-family:var(--ar);font-size:20px;color:var(--gold)">ٱلْعَلِيم</div><div style="font-size:11px;color:var(--muted-2)">Al-Aleem · The All-Knowing</div></div></div></div>',
    'Hajj Guide': '<div class="ms"><div class="ms-hd">🕋 Hajj Guide<span>Step-by-step</span></div><div class="ms-step"><div class="ms-step-n done">✓</div><div><p><b>Ihram</b> — Enter sacred state at Miqat, make niyyah</p></div></div><div class="ms-step"><div class="ms-step-n done">✓</div><div><p><b>Tawaf</b> — Circumambulate Kaaba 7 times</p></div></div><div class="ms-step"><div class="ms-step-n" style="background:rgba(5,155,82,.5);color:#fff">3</div><div><p><b>Sa\'i</b> — Walk between Safa and Marwa 7 times</p></div></div><div class="ms-step"><div class="ms-step-n">4</div><div><p><b>Mina</b> — Stay in Mina on 8th Dhul Hijjah</p></div></div><div class="ms-step"><div class="ms-step-n">5</div><div><p><b>Arafah</b> — The pillar of Hajj</p></div></div></div>',
    'Umrah Guide': '<div class="ms"><div class="ms-hd">🕌 Umrah Guide<span>Complete walkthrough</span></div><div class="ms-step"><div class="ms-step-n done">✓</div><div><p><b>Ihram &amp; Intention</b> — Wear ihram, recite talbiyah</p></div></div><div class="ms-step"><div class="ms-step-n" style="background:rgba(5,155,82,.5);color:#fff">2</div><div><p><b>Tawaf al-Umrah</b> — 7 rounds around the Kaaba</p></div></div><div class="ms-step"><div class="ms-step-n">3</div><div><p><b>Salah at Maqam Ibrahim</b> — 2 rakats</p></div></div><div class="ms-step"><div class="ms-step-n">4</div><div><p><b>Sa\'i</b> — 7 walks Safa ↔ Marwa</p></div></div><div class="ms-step"><div class="ms-step-n">5</div><div><p><b>Halq / Taqsir</b> — Exit Ihram</p></div></div></div>',
    'Zakat Calc': '<div class="ms"><div class="ms-hd">💰 Zakat Calculator<span>2.5%</span></div><div class="ms-zakat-row"><label>Gold (grams)</label><div class="val">50g</div></div><div class="ms-zakat-row"><label>Silver (grams)</label><div class="val">200g</div></div><div class="ms-zakat-row"><label>Cash &amp; savings</label><div class="val">$5,200</div></div><div class="ms-zakat-row"><label>Business assets</label><div class="val">$2,000</div></div><div class="ms-sep"></div><div class="ms-zakat-row"><label>Nisab threshold</label><div class="val" style="color:var(--green)">$4,850</div></div><div style="font-size:10px;color:var(--green);font-weight:700;margin:4px 0">✓ Nisab reached — Zakat due</div><div class="ms-zakat-total"><small>ZAKAT DUE</small><b>$184.00</b></div></div>',
    'Mosque Finder': '<div class="ms"><div class="ms-hd">🕌 Mosques Nearby<span>📍 Your location</span></div><div class="ms-mosque-row"><div class="ms-mosque-icon">🕌</div><div class="ms-mosque-info"><b>Al-Noor Mosque</b><small>0.4 km · Asr 15:47</small></div></div><div class="ms-row hi" style="margin:0 0 8px">Nearest mosque ↑</div><div class="ms-mosque-row"><div class="ms-mosque-icon">🕌</div><div class="ms-mosque-info"><b>Islamic Centre</b><small>1.1 km · Asr 15:50</small></div></div><div class="ms-mosque-row"><div class="ms-mosque-icon">🕌</div><div class="ms-mosque-info"><b>Masjid Al-Furqan</b><small>2.3 km · Asr 15:52</small></div></div><div class="ms-mosque-row"><div class="ms-mosque-icon">🕌</div><div class="ms-mosque-info"><b>Bilal Mosque</b><small>3.0 km · Fri Jumu\'ah 13:30</small></div></div></div>',
    'Ramadan Mode': '<div class="ms"><div class="ms-hd">🌙 Ramadan Mode<span>Day 15 · 1446H</span></div><div class="ms-ramadan-card"><small>IFTAR IN</small><b>04:38:22</b></div><div class="ms-row"><div><div style="font-size:12px;color:var(--muted-2)">Suhoor ended</div><div style="font-size:14px;color:#fff;font-weight:700">04:45</div></div><div><div style="font-size:12px;color:var(--muted-2)">Iftar tonight</div><div style="font-size:14px;color:var(--gold);font-weight:700">18:31</div></div></div><div class="ms-sep"></div><div style="font-size:11px;color:var(--muted-2);margin-bottom:8px">Today\'s goals</div><div class="ms-habit-row"><div class="cb done">✓</div><span>Fajr prayer</span><small>🔥</small></div><div class="ms-habit-row"><div class="cb done">✓</div><span>Quran — 1 juz</span><small>🔥</small></div><div class="ms-habit-row"><div class="cb"></div><span>Tarawih tonight</span></div></div>',
    'Wudu & Salah': '<div class="ms"><div class="ms-hd">💧 Wudu Guide<span>Step by step</span></div><div class="ms-step"><div class="ms-step-n done">✓</div><div><p><b>Intention (Niyyah)</b> — Intend purification in your heart</p></div></div><div class="ms-step"><div class="ms-step-n done">✓</div><div><p><b>Wash hands</b> — 3 times up to the wrists</p></div></div><div class="ms-step"><div class="ms-step-n done">✓</div><div><p><b>Rinse mouth &amp; nose</b> — 3 times each</p></div></div><div class="ms-step"><div class="ms-step-n" style="background:rgba(5,155,82,.5);color:#fff">4</div><div><p><b>Wash face</b> — 3 times from forehead to chin</p></div></div><div class="ms-step"><div class="ms-step-n">5</div><div><p><b>Wash arms</b> — Right then left, 3× each</p></div></div></div>',
    'Islamic Flash': '<div class="ms" style="justify-content:space-between"><div class="ms-hd">🃏 Islamic Flash<span>Card 4/10</span></div><div class="ms-flash-q">"The best of you are those who learn the Qur\'an and teach it."<br><small style="opacity:.6">— Sahih Al-Bukhari</small></div><div style="text-align:center;font-size:11px;color:var(--muted-2);margin:6px 0">Tap to reveal</div><div class="ms-flash-a">Narrated by Uthman ibn Affan رضي الله عنه · Sahih Al-Bukhari</div><div style="display:flex;gap:8px;justify-content:center;margin-top:10px"><span class="ms-chip">⏭ Next</span><span class="ms-chip">📚 Quran</span><span class="ms-chip">⚖️ Fiqh</span></div></div>',
    'Islamic Events': '<div class="ms"><div class="ms-hd">📅 Islamic Events<span>1446 AH</span></div><div class="ms-row hi">🌙 Rajab 1446 — now</div><div class="ms-row gold">✨ Isra &amp; Mi\'raj · 27 Rajab</div><div class="ms-row">🌙 Ramadan begins · 1 Ramadan</div><div class="ms-row gold">⭐ Laylatul Qadr · 27 Ramadan</div><div class="ms-row">🎉 Eid al-Fitr · 1 Shawwal</div><div class="ms-row">🕋 Day of Arafah · 9 Dhul Hijjah</div><div class="ms-row gold">🐑 Eid al-Adha · 10 Dhul Hijjah</div></div>'
  };

  /* ---- app bottom-tab screens ---- */
  var TAB_SCREENS = {
    'Muslim': '<div class="ms"><div class="ms-hd">🕌 Muslim 360<span>Islamic Tools</span></div><div class="ms-tool-grid"><div class="ms-tool" style="--tc:#059B52">🕌<small>Prayer</small></div><div class="ms-tool" style="--tc:#F59E0B">⏰ Alarm</div><div class="ms-tool" style="--tc:#FAC775">📖<small>Quran</small></div><div class="ms-tool" style="--tc:#1D9E75">🧭<small>Qibla</small></div><div class="ms-tool" style="--tc:#10B981">📿<small>Adhkar</small></div><div class="ms-tool" style="--tc:#A16207">📜<small>Hadith</small></div><div class="ms-tool" style="--tc:#06B6D4">🤲<small>Duas</small></div><div class="ms-tool" style="--tc:#EC4899">✨<small>99 Names</small></div><div class="ms-tool" style="--tc:#6366F1">🌙<small>Ramadan</small></div></div><div class="ms-sep"></div><div style="font-size:10px;color:var(--muted-2);text-align:center">23 Islamic tools · tap to explore</div></div>',
    'Alarm': '<div class="ms"><div class="ms-hd">⏰ Commitments<span>3 alarms · 2 commitments</span></div><div class="ms-alarm-row"><div><div class="time">05:00</div><div class="lbl">Fajr Alarm · Adhan Al-Fatiha</div></div><div class="ms-toggle"></div></div><div class="ms-alarm-row"><div><div class="time">07:30</div><div class="lbl">Morning routine</div></div><div class="ms-toggle"></div></div><div class="ms-alarm-row"><div><div class="time">21:00</div><div class="lbl">Isha &amp; night prayer</div></div><div class="ms-toggle off"></div></div><div class="ms-sep"></div><div style="font-size:11px;color:var(--muted-2);margin-bottom:8px">Commitments</div><div class="ms-habit-row"><div class="cb done">✓</div><span>Pray all 5 salah</span><small>🔥 12</small></div><div class="ms-habit-row"><div class="cb"></div><span>30 min Quran daily</span><small style="color:var(--muted-2)">—</small></div></div>',
    'Journal': '<div class="ms"><div class="ms-hd">📓 Journal<span>Today · 12 Oct</span></div><div style="font-size:11px;color:var(--muted-2);margin-bottom:6px">How are you feeling?</div><div class="ms-journal-mood"><span class="sel">😌</span><span>😊</span><span>😔</span><span>😤</span><span>🤲</span></div><div style="font-size:11px;color:var(--muted-2);margin:8px 0 6px">Today\'s reflection</div><div class="ms-journal-text">Alhamdulillah for today. Made all 5 prayers on time. The Fajr was peaceful...</div><div class="ms-sep"></div><div style="font-size:11px;color:var(--muted-2);margin-bottom:6px">Gratitude · 3 things</div><div class="ms-row">1. Family health ✓</div><div class="ms-row">2. Completed Quran page ✓</div></div>',
    'Block': '<div class="ms"><div class="ms-hd">🔒 App Blocker<span>Focus: 47:23 left</span></div><div class="ms-blocker-timer"><b>47:23</b><small>Focus session remaining</small></div><div class="ms-sep"></div><div style="font-size:11px;color:var(--muted-2);margin-bottom:8px">Blocked apps</div><div class="ms-row hi" style="gap:10px"><span>📱 Instagram</span><span class="ms-pill">Blocked</span></div><div class="ms-row" style="gap:10px"><span>🎵 TikTok</span><span class="ms-pill">Blocked</span></div><div class="ms-row" style="gap:10px"><span>🎮 Games</span><span class="ms-pill">Blocked</span></div><div class="ms-row" style="gap:10px"><span>📺 YouTube</span><span class="ms-pill">Blocked</span></div></div>',
    'Profile': '<div class="ms"><div class="ms-hd">👤 My Profile<span>Level 12 · Muhsin</span></div><div style="text-align:center;margin-bottom:14px"><div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,rgba(5,155,82,.4),rgba(5,155,82,.1));border:2px solid rgba(5,155,82,.5);font-size:28px;display:grid;place-items:center;margin:0 auto 8px">🌿</div><b style="color:#fff;font-size:16px">Ahmad Al-Muslim</b><div style="font-size:11px;color:var(--green);margin-top:2px">⭐ Level 12 · Muhsin</div></div><div class="ms-green-card" style="display:flex;justify-content:space-around;text-align:center;gap:10px"><div><b style="color:#fff;font-size:20px">🔥 12</b><div style="font-size:10px;color:#9fd9b8">Day streak</div></div><div><b style="color:#fff;font-size:20px">94%</b><div style="font-size:10px;color:#9fd9b8">Salah rate</div></div><div><b style="color:#fff;font-size:20px">21</b><div style="font-size:10px;color:#9fd9b8">Habits done</div></div></div></div>'
  };

  /* ---- app tab switcher ---- */
  (function () {
    var atpScreen = document.getElementById('atpScreen');
    var atpSwitcher = document.getElementById('atpSwitcher');
    if (!atpScreen || !atpSwitcher) return;
    function setTab(name) {
      atpScreen.innerHTML = TAB_SCREENS[name] || '';
      atpSwitcher.querySelectorAll('.atp-btn').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-atp') === name);
      });
    }
    atpSwitcher.addEventListener('click', function (e) {
      var btn = e.target.closest('.atp-btn');
      if (btn) setTab(btn.getAttribute('data-atp'));
    });
    setTab('Muslim');
  })();

  /* ---- feature modal ---- */
  (function () {
    var modal = document.getElementById('feat-modal');
    var screen = document.getElementById('modalScreen');
    var label = document.getElementById('modalLabel');
    if (!modal) return;

    function openModal(name) {
      var html = SCREENS[name];
      if (!html) return;
      screen.innerHTML = html;
      if (label) label.textContent = name;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalBackdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.querySelectorAll('.feat-card').forEach(function (card) {
          var h3 = card.querySelector('h3');
          if (!h3) return;
          var en = h3.getAttribute('data-en') || h3.textContent;
          if (!SCREENS[en]) return;
          card.style.cursor = 'pointer';
          card.setAttribute('title', 'Tap to preview ' + en);
          card.addEventListener('click', function () { openModal(en); });
        });
      });
    });
  })();

  /* ---- year + boot splash ---- */
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  window.addEventListener('load', function () {
    setTimeout(function () {
      var boot = document.getElementById('boot');
      if (boot) { boot.classList.add('hide'); setTimeout(function () { boot.remove(); }, 600); }
    }, 500);
  });
})();
