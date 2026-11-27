import * as THREE from '/vendor/three.module.min.js';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function createGlowTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(230,210,255,0.85)');
  g.addColorStop(0.6, 'rgba(139,92,246,0.22)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function initStarfield() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  } catch {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 1.6;

  const count = 3600;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [
    new THREE.Color('#ffffff'),
    new THREE.Color('#e9d5ff'),
    new THREE.Color('#a78bfa'),
    new THREE.Color('#38bdf8'),
    new THREE.Color('#c084fc')
  ];

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = 1.2 + Math.cbrt(Math.random()) * 2.4;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const col = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.024,
    map: createGlowTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  const stars = new THREE.Points(geometry, material);
  stars.rotation.z = Math.PI / 4;
  scene.add(stars);

  let pointerX = 0;
  let pointerY = 0;
  window.addEventListener('pointermove', e => {
    pointerX = (e.clientX / window.innerWidth - 0.5) * 0.28;
    pointerY = (e.clientY / window.innerHeight - 0.5) * 0.28;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (reducedMotion) renderer.render(scene, camera);
  });

  if (reducedMotion) {
    renderer.render(scene, camera);
    return;
  }

  const clock = new THREE.Clock();
  let rafId = 0;
  function animate() {
    rafId = requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.05);
    stars.rotation.x -= delta * 0.055;
    stars.rotation.y -= delta * 0.085;
    camera.position.x += (pointerX - camera.position.x) * 0.04;
    camera.position.y += (-pointerY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  function syncRun() {
    if (document.hidden) {
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    } else if (!rafId) {
      clock.getDelta();
      animate();
    }
  }
  document.addEventListener('visibilitychange', syncRun);
  syncRun();
}

function initHeroGalaxy() {
  const container = document.getElementById('hero-3d');
  if (!container) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-3d-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch {
    return;
  }
  const rect = () => container.getBoundingClientRect();
  const { width, height } = rect();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width || 520, height || 520, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, (width || 520) / (height || 520), 0.1, 100);
  camera.position.set(0, 0.55, 6.2);

  const group = new THREE.Group();
  scene.add(group);

  // Event horizon dark core
  const coreGeo = new THREE.SphereGeometry(0.92, 48, 48);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x050112 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  // Translucent cosmic wireframe geodesic shell
  const shellGeo = new THREE.IcosahedronGeometry(1.18, 2);
  const shellMat = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });
  const shell = new THREE.Mesh(shellGeo, shellMat);
  group.add(shell);

  // Inner glowing photon ring
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(1.48, 0.022, 16, 120),
    new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.85 })
  );
  ring1.rotation.x = Math.PI * 0.42;
  group.add(ring1);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.96, 0.014, 16, 120),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 })
  );
  ring2.rotation.x = Math.PI * 0.58;
  ring2.rotation.y = Math.PI * 0.18;
  group.add(ring2);

  const ring3 = new THREE.Mesh(
    new THREE.TorusGeometry(2.42, 0.009, 16, 120),
    new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.35 })
  );
  ring3.rotation.x = Math.PI * 0.35;
  ring3.rotation.y = -Math.PI * 0.22;
  group.add(ring3);

  // Swirling 3D galaxy / accretion disk particles
  const pCount = 2400;
  const pPos = new Float32Array(pCount * 3);
  const pCol = new Float32Array(pCount * 3);
  const cInside = new THREE.Color('#38bdf8');
  const cMid = new THREE.Color('#a855f7');
  const cOut = new THREE.Color('#ec4899');

  for (let i = 0; i < pCount; i++) {
    const branches = 4;
    const radius = 1.08 + Math.pow(Math.random(), 1.25) * 1.95;
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;
    const spinAngle = radius * 2.15;
    const spread = (Math.random() - 0.5) * 0.36 * (radius / 2.2);
    const ySpread = (Math.random() - 0.5) * 0.22 * (1 / (radius * 0.6));

    pPos[i * 3] = Math.cos(branchAngle + spinAngle) * radius + spread;
    pPos[i * 3 + 1] = ySpread;
    pPos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + spread;

    const t = Math.min(1, (radius - 1.08) / 1.95);
    const mixed = t < 0.5
      ? cInside.clone().lerp(cMid, t * 2)
      : cMid.clone().lerp(cOut, (t - 0.5) * 2);
    pCol[i * 3] = mixed.r;
    pCol[i * 3 + 1] = mixed.g;
    pCol[i * 3 + 2] = mixed.b;
  }

  const diskGeo = new THREE.BufferGeometry();
  diskGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  diskGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
  const diskMat = new THREE.PointsMaterial({
    size: 0.055,
    map: createGlowTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const disk = new THREE.Points(diskGeo, diskMat);
  disk.rotation.x = 0.36;
  disk.rotation.z = -0.18;
  group.add(disk);

  // Orbiting glowing nodes
  const nodes = [];
  const nodeGeo = new THREE.SphereGeometry(0.065, 16, 16);
  const nodeColors = [0x38bdf8, 0xe879f9, 0xa855f7];
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: nodeColors[i] }));
    group.add(m);
    nodes.push({ mesh: m, radius: 1.55 + i * 0.44, speed: 0.55 - i * 0.12, phase: i * 2.1, tilt: 0.35 + i * 0.25 });
  }

  let targetX = 0;
  let targetY = 0;
  window.addEventListener('pointermove', e => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 0.7;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.45;
  }, { passive: true });

  const ro = new ResizeObserver(() => {
    const r = rect();
    if (!r.width || !r.height) return;
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
    renderer.setSize(r.width, r.height, false);
    if (reducedMotion) renderer.render(scene, camera);
  });
  ro.observe(container);

  if (reducedMotion) {
    renderer.render(scene, camera);
    return;
  }

  let elapsed = 0;
  let lastTime = 0;
  let rafId = 0;
  let inView = true;

  function animate(now) {
    rafId = requestAnimationFrame(animate);
    const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
    lastTime = now;
    elapsed += dt;
    const t = elapsed;
    disk.rotation.y = t * 0.24;
    shell.rotation.y = -t * 0.22;
    shell.rotation.x = t * 0.14;
    ring1.rotation.z = t * 0.32;
    ring2.rotation.z = -t * 0.24;
    ring3.rotation.z = t * 0.18;
    for (const n of nodes) {
      const a = t * n.speed + n.phase;
      n.mesh.position.set(
        Math.cos(a) * n.radius,
        Math.sin(a * 1.2) * n.tilt,
        Math.sin(a) * n.radius
      );
    }
    group.rotation.y += (targetX - group.rotation.y) * 0.05;
    group.rotation.x += (targetY - group.rotation.x) * 0.05;
    renderer.render(scene, camera);
  }

  function syncRun() {
    const shouldRun = !document.hidden && inView;
    if (!shouldRun) {
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; lastTime = 0; }
    } else if (!rafId) {
      lastTime = 0;
      rafId = requestAnimationFrame(animate);
    }
  }

  const io = new IntersectionObserver(entries => {
    inView = Boolean(entries[0]?.isIntersecting);
    syncRun();
  }, { rootMargin: '80px' });
  io.observe(container);
  document.addEventListener('visibilitychange', syncRun);
  syncRun();
}

initStarfield();
initHeroGalaxy();
