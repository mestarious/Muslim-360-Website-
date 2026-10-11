/* ============================================================
   Muslim 360 — 3D hero scene (three.js r128, global THREE)
   A slowly turning glowing crescent + star, orbiting "stars",
   a wireframe Kaaba, a deep starfield, and mouse parallax.
   ============================================================ */
(function () {
  if (typeof THREE === 'undefined') return;
  var canvas = document.getElementById('scene');
  if (!canvas) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GREEN = 0x059b52, GREEN_L = 0x29d98a, GOLD = 0xfac775;

  var renderer = new THREE.WebGLRenderer({
    canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance'
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x060f0a, 0.028);

  var camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
  camera.position.set(0, 0, 18);

  // ---- lighting ----
  scene.add(new THREE.AmbientLight(0x4a6a58, 0.7));
  var key = new THREE.PointLight(GREEN_L, 1.5, 120); key.position.set(-10, 8, 14); scene.add(key);
  var warm = new THREE.PointLight(GOLD, 1.0, 120); warm.position.set(12, -6, 10); scene.add(warm);
  var dir = new THREE.DirectionalLight(0xffffff, 0.35); dir.position.set(3, 10, 8); scene.add(dir);

  // ---- helper: crescent shape (outer circle minus offset inner circle) ----
  function crescentShape(outer, inner, offset) {
    var s = new THREE.Shape();
    s.absarc(0, 0, outer, 0, Math.PI * 2, false);
    var hole = new THREE.Path();
    hole.absarc(offset, 0, inner, 0, Math.PI * 2, true);
    s.holes.push(hole);
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

  var extrude = { depth: 0.55, bevelEnabled: true, bevelThickness: 0.22, bevelSize: 0.22, bevelSegments: 6, curveSegments: 48 };

  // ---- hero mark group (crescent + star) ----
  var mark = new THREE.Group();

  var cresGeo = new THREE.ExtrudeGeometry(crescentShape(3.2, 2.55, 1.35), extrude);
  cresGeo.center();
  var cresMat = new THREE.MeshStandardMaterial({ color: GREEN, emissive: GREEN, emissiveIntensity: 0.42, roughness: 0.32, metalness: 0.55 });
  var crescent = new THREE.Mesh(cresGeo, cresMat);
  crescent.rotation.z = -0.5;
  mark.add(crescent);

  var starGeo = new THREE.ExtrudeGeometry(starShape(5, 1.0, 0.44), { depth: 0.5, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.14, bevelSegments: 4, curveSegments: 24 });
  starGeo.center();
  var starMat = new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0.6, roughness: 0.25, metalness: 0.6 });
  var star = new THREE.Mesh(starGeo, starMat);
  star.position.set(2.0, 1.5, 0.4);
  mark.add(star);

  // faint glow halo behind the crescent
  var haloMat = new THREE.MeshBasicMaterial({ color: GREEN_L, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false });
  var halo = new THREE.Mesh(new THREE.CircleGeometry(5.6, 48), haloMat);
  halo.position.z = -1.6; mark.add(halo);

  mark.scale.setScalar(1.15);
  mark.position.x = 0.3;
  scene.add(mark);

  // ---- orbiting little stars (octahedrons) ----
  var orbit = new THREE.Group(); scene.add(orbit);
  var octMat = new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0.5, roughness: 0.3, metalness: 0.4 });
  var octGreen = new THREE.MeshStandardMaterial({ color: GREEN_L, emissive: GREEN, emissiveIntensity: 0.4, roughness: 0.3, metalness: 0.4 });
  var motes = [];
  for (var i = 0; i < 9; i++) {
    var m = new THREE.Mesh(new THREE.OctahedronGeometry(0.26 + Math.random() * 0.28), i % 2 ? octMat : octGreen);
    var r = 6 + Math.random() * 5, a = Math.random() * Math.PI * 2;
    m.userData = { r: r, a: a, speed: 0.1 + Math.random() * 0.25, y: (Math.random() - 0.5) * 7, spin: Math.random() * 0.02 + 0.005 };
    m.position.set(Math.cos(a) * r, m.userData.y, Math.sin(a) * r);
    orbit.add(m); motes.push(m);
  }

  // ---- wireframe Kaaba drifting far back ----
  var kaaba = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 2.4, 2.4),
    new THREE.MeshBasicMaterial({ color: GREEN_L, wireframe: true, transparent: true, opacity: 0.22 })
  );
  kaaba.position.set(-9, -3.5, -6); scene.add(kaaba);

  // ---- starfield ----
  var count = 1300, pos = new Float32Array(count * 3);
  for (var j = 0; j < count; j++) {
    var rr = 24 + Math.random() * 60, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos[j * 3]     = rr * Math.sin(ph) * Math.cos(th);
    pos[j * 3 + 1] = rr * Math.sin(ph) * Math.sin(th);
    pos[j * 3 + 2] = rr * Math.cos(ph);
  }
  var starBuf = new THREE.BufferGeometry();
  starBuf.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  var field = new THREE.Points(starBuf, new THREE.PointsMaterial({
    color: 0xbfe9d1, size: 0.14, sizeAttenuation: true, transparent: true, opacity: 0.8,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));
  scene.add(field);

  // ---- interaction ----
  var tx = 0, ty = 0, mx = 0, my = 0;
  window.addEventListener('pointermove', function (e) {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function resize() {
    var w = canvas.clientWidth || window.innerWidth;
    var h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    // pull the mark a touch closer / smaller on narrow screens
    mark.scale.setScalar(w < 680 ? 0.82 : 1.15);
  }
  window.addEventListener('resize', resize);

  var t0 = performance.now();
  function frame(now) {
    var t = (now - t0) / 1000;
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;

    mark.rotation.y = Math.sin(t * 0.25) * 0.5 + mx * 0.5;
    mark.rotation.x = -0.1 + my * 0.3;
    mark.position.y = Math.sin(t * 0.6) * 0.4;
    star.rotation.z = t * 0.6;
    halo.material.opacity = 0.06 + Math.abs(Math.sin(t * 0.8)) * 0.05;

    orbit.rotation.y = t * 0.08;
    for (var k = 0; k < motes.length; k++) {
      var d = motes[k].userData;
      var a = d.a + t * d.speed;
      motes[k].position.set(Math.cos(a) * d.r, d.y + Math.sin(t * 0.5 + k) * 0.5, Math.sin(a) * d.r);
      motes[k].rotation.x += d.spin; motes[k].rotation.y += d.spin;
    }

    kaaba.rotation.y += 0.002; kaaba.rotation.x += 0.0012;
    field.rotation.y = t * 0.01;

    camera.position.x += (mx * 2.2 - camera.position.x) * 0.04;
    camera.position.y += (-my * 1.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    if (!reduce) requestAnimationFrame(frame);
  }

  resize();
  renderer.render(scene, camera);
  if (!reduce) requestAnimationFrame(frame);
})();
