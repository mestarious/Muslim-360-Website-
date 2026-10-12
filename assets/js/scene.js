/* ============================================================
   Muslim 360 — 3D hero mark (three.js r128, global THREE)
   Glowing extruded crescent + star with a tilted orbit ring,
   orbiting gems, sparkles and pointer parallax.
   ============================================================ */
(function () {
  var canvas = document.getElementById('scene');
  if (!canvas) return;
  var stage = canvas.parentElement;

  var renderer;
  try {
    if (typeof THREE === 'undefined') throw new Error('no three');
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    stage.classList.add('no-webgl');
    return;
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GREEN = 0x0aa85a, GREEN_L = 0x29d98a, GOLD = 0xfac775;

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  // ---- lighting ----
  scene.add(new THREE.AmbientLight(0x6f8f7c, 0.55));
  var key = new THREE.PointLight(0xd9ffe9, 1.1, 60); key.position.set(-7, 6, 10); scene.add(key);
  var warm = new THREE.PointLight(GOLD, 1.0, 60); warm.position.set(8, -3, 8); scene.add(warm);
  var rim = new THREE.DirectionalLight(GREEN_L, 0.8); rim.position.set(0, 2, -10); scene.add(rim);
  var sweep = new THREE.PointLight(0xffffff, 0.5, 30); scene.add(sweep);

  // soft round sprite texture used for halo, glow and sparkles
  function glowTexture() {
    var c = document.createElement('canvas'); c.width = c.height = 128;
    var g = c.getContext('2d');
    var grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.25, 'rgba(255,255,255,.55)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }
  var glowTex = glowTexture();

  // outer circle (R, at origin) minus inner circle (r, at x=d), traced as two arcs
  function crescentShape(R, r, d) {
    var x = (d * d + R * R - r * r) / (2 * d), y = Math.sqrt(R * R - x * x);
    var s = new THREE.Shape();
    s.moveTo(x, y);
    s.absarc(0, 0, R, Math.atan2(y, x), Math.atan2(-y, x), false);
    s.absarc(d, 0, r, Math.atan2(-y, x - d), Math.atan2(y, x - d), true);
    return s;
  }
  function starShape(spikes, outer, inner) {
    var s = new THREE.Shape(), step = Math.PI / spikes;
    s.moveTo(0, outer);
    for (var i = 0; i < spikes; i++) {
      var a1 = (i * 2 + 1) * step, a2 = (i * 2 + 2) * step;
      s.lineTo(Math.sin(a1) * inner, Math.cos(a1) * inner);
      s.lineTo(Math.sin(a2) * outer, Math.cos(a2) * outer);
    }
    s.closePath();
    return s;
  }

  // ---- crescent + star ----
  var root = new THREE.Group(); scene.add(root);
  var mark = new THREE.Group(); root.add(mark);

  var cresGeo = new THREE.ExtrudeGeometry(crescentShape(3.0, 2.75, 1.1),
    { depth: 0.7, bevelEnabled: true, bevelThickness: 0.26, bevelSize: 0.2, bevelSegments: 8, curveSegments: 72 });
  cresGeo.center();
  var crescent = new THREE.Mesh(cresGeo, new THREE.MeshStandardMaterial({
    color: GREEN, emissive: 0x04502c, emissiveIntensity: 0.45, roughness: 0.3, metalness: 0.45
  }));
  crescent.rotation.z = 0.45;
  mark.add(crescent);

  var starGeo = new THREE.ExtrudeGeometry(starShape(5, 0.95, 0.42),
    { depth: 0.45, bevelEnabled: true, bevelThickness: 0.16, bevelSize: 0.14, bevelSegments: 5, curveSegments: 24 });
  starGeo.center();
  var star = new THREE.Mesh(starGeo, new THREE.MeshStandardMaterial({
    color: GOLD, emissive: 0xc98a2e, emissiveIntensity: 0.7, roughness: 0.22, metalness: 0.5
  }));
  star.position.set(2.0, 1.0, 0.4);
  mark.add(star);

  var starGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTex, color: GOLD, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false
  }));
  starGlow.scale.setScalar(3.4); starGlow.position.copy(star.position); mark.add(starGlow);

  var halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTex, color: GREEN_L, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false
  }));
  halo.scale.setScalar(12); halo.position.z = -2.5; root.add(halo);

  mark.position.x = -0.25;
  /* on narrow screens shift scene down so crescent sits lower in canvas, removing top dead space */
  root.position.y = window.innerWidth < 681 ? -1.0 : 0;

  // ---- tilted orbit ring with travelling gems ----
  var orbit = new THREE.Group();
  orbit.rotation.set(1.22, 0, 0.32);
  root.add(orbit);

  var ringR = 5.0;
  orbit.add(new THREE.Mesh(new THREE.TorusGeometry(ringR, 0.022, 8, 200),
    new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.45 })));
  orbit.add(new THREE.Mesh(new THREE.TorusGeometry(ringR + 0.45, 0.012, 6, 200),
    new THREE.MeshBasicMaterial({ color: GREEN_L, transparent: true, opacity: 0.22 })));

  var gemGold = new THREE.MeshStandardMaterial({ color: GOLD, emissive: 0xc98a2e, emissiveIntensity: 0.6, roughness: 0.25, metalness: 0.5 });
  var gemGreen = new THREE.MeshStandardMaterial({ color: GREEN_L, emissive: GREEN, emissiveIntensity: 0.6, roughness: 0.25, metalness: 0.4 });
  var gems = [];
  for (var i = 0; i < 6; i++) {
    var gem = new THREE.Mesh(new THREE.OctahedronGeometry(i % 3 === 0 ? 0.26 : 0.17), i % 2 ? gemGold : gemGreen);
    gem.userData = { a: (i / 6) * Math.PI * 2, r: ringR + (i % 2 ? 0 : 0.45) };
    orbit.add(gem); gems.push(gem);
  }

  // ---- sparkles ----
  var N = 140, pos = new Float32Array(N * 3);
  for (var j = 0; j < N; j++) {
    var rr = 4 + Math.random() * 5, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos[j * 3] = rr * Math.sin(ph) * Math.cos(th) * 1.4;
    pos[j * 3 + 1] = rr * Math.sin(ph) * Math.sin(th) * 0.8;
    pos[j * 3 + 2] = rr * Math.cos(ph) * 0.6 - 2;
  }
  var sparkGeo = new THREE.BufferGeometry();
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  var sparkMat = new THREE.PointsMaterial({
    map: glowTex, color: 0xe9fff2, size: 0.22, transparent: true, opacity: 0.8,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  var sparks = new THREE.Points(sparkGeo, sparkMat);
  root.add(sparks);

  // ---- interaction ----
  var tx = 0, ty = 0, mx = 0, my = 0;
  window.addEventListener('pointermove', function (e) {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function resize() {
    var w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the ring inside narrow stages
    camera.position.z = camera.aspect < 1.25 ? 16.5 : 14;
    camera.updateProjectionMatrix();
  }
  if (window.ResizeObserver) new ResizeObserver(resize).observe(stage);
  window.addEventListener('resize', resize);

  function easeOutBack(x) { var c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); }

  var t0 = performance.now();
  function draw(t) {
    var intro = reduce ? 1 : Math.min(t / 1.6, 1);
    root.scale.setScalar(0.001 + easeOutBack(intro) * 0.999);

    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;

    mark.rotation.y = Math.sin(t * 0.45) * 0.45 + mx * 0.4;
    mark.rotation.x = -0.08 + my * 0.25;
    mark.position.y = Math.sin(t * 0.9) * 0.22;

    star.rotation.z = t * 0.8;
    var pulse = 1 + Math.sin(t * 2.2) * 0.07;
    star.scale.setScalar(pulse);
    starGlow.material.opacity = 0.4 + Math.sin(t * 2.2) * 0.18;
    halo.material.opacity = 0.26 + Math.sin(t * 0.8) * 0.07;

    orbit.rotation.z = 0.32 + Math.sin(t * 0.2) * 0.08 + mx * 0.1;
    orbit.rotation.x = 1.22 + my * 0.08;
    for (var k = 0; k < gems.length; k++) {
      var d = gems[k].userData, a = d.a + t * 0.35;
      gems[k].position.set(Math.cos(a) * d.r, Math.sin(a) * d.r, 0);
      gems[k].rotation.x = t * 1.2 + k; gems[k].rotation.y = t * 0.9 + k;
    }

    sparks.rotation.y = t * 0.04;
    sparkMat.opacity = 0.6 + Math.sin(t * 1.3) * 0.2;

    sweep.position.set(Math.cos(t * 0.7) * 6, Math.sin(t * 0.5) * 3, 6);

    renderer.render(scene, camera);
  }

  var running = false, visible = true;
  function frame(now) {
    if (!running) return;
    draw((now - t0) / 1000);
    requestAnimationFrame(frame);
  }
  function setRunning(on) {
    if (reduce || on === running) return;
    running = on;
    if (on) requestAnimationFrame(frame);
  }
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; setRunning(visible && !document.hidden); })
      .observe(stage);
  }
  document.addEventListener('visibilitychange', function () { setRunning(visible && !document.hidden); });

  resize();
  draw(reduce ? 2 : 0);
  setRunning(true);
})();
