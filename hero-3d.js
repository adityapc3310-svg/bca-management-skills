/**
 * BCA Management Skills - 3D Hero Animation
 * Abstract geometric leadership visualization using Three.js
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const CONFIG = {
  canvas: null,
  renderer: null,
  scene: null,
  camera: null,
  controls: null,
  geometry: null,
  animationId: null,
  time: 0,
  mouse: { x: 0, y: 0 },
  targetMouse: { x: 0, y: 0 },
  isMobile: window.innerWidth < 768,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

const COLORS = {
  bg: 0x0a0f1a,
  accent: 0x00d4aa,
  accentSecondary: 0x00b8d4,
  warm: 0xffb84d,
  dark: 0x060910,
  white: 0xf0f2f5,
  muted: 0x8a94a6
};

export function initHero3D() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  CONFIG.canvas = canvas;

  if (!window.WebGLRenderingContext) {
    canvas.style.display = 'none';
    return;
  }

  if (CONFIG.reducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  if (CONFIG.isMobile) {
    canvas.style.display = 'none';
    return;
  }

  setupRenderer();
  setupScene();
  setupCamera();
  setupLights();
  createGeometry();
  setupControls();
  setupEventListeners();
  animate();

  window.addEventListener('resize', onResize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(CONFIG.animationId);
    else animate();
  });
}

function setupRenderer() {
  const { canvas } = CONFIG;
  const dpr = Math.min(window.devicePixelRatio, 2);

  CONFIG.renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  CONFIG.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  CONFIG.renderer.setPixelRatio(dpr);
  CONFIG.renderer.setClearColor(0x000000, 0);
  CONFIG.renderer.physicallyCorrectLights = true;
  CONFIG.renderer.outputColorSpace = THREE.SRGBColorSpace;
  CONFIG.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  CONFIG.renderer.toneMappingExposure = 1.1;
}

function setupScene() {
  CONFIG.scene = new THREE.Scene();
  CONFIG.scene.fog = new THREE.FogExp2(0x0a0f1a, 0.0015);
}

function setupCamera() {
  const { canvas } = CONFIG;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  CONFIG.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
  CONFIG.camera.position.set(0, 0, 4);
  CONFIG.camera.lookAt(0, 0, 0);
}

function setupLights() {
  const { scene } = CONFIG;

  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
  keyLight.position.set(3, 4, 2);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 15;
  keyLight.shadow.camera.left = -3;
  keyLight.shadow.camera.right = 3;
  keyLight.shadow.camera.top = 3;
  keyLight.shadow.camera.bottom = -3;
  keyLight.shadow.bias = -0.0005;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x00b8d4, 0.5);
  fillLight.position.set(-2, 2, -1);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
  rimLight.position.set(0, 2, -3);
  scene.add(rimLight);

  const accentLight = new THREE.PointLight(0x00d4aa, 0.8, 5);
  accentLight.position.set(1.5, 1, 1.5);
  scene.add(accentLight);

  CONFIG.keyLight = keyLight;
  CONFIG.accentLight = accentLight;
}

function createGeometry() {
  const { scene } = CONFIG;
  const group = new THREE.Group();
  group.name = 'leadership-geometry';

  const nodeMaterial = new THREE.MeshPhysicalMaterial({
    color: COLORS.accent,
    metalness: 0.2,
    roughness: 0.3,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    transmission: 0.15,
    thickness: 0.3,
    ior: 1.4
  });

  const nodeMaterialWarm = new THREE.MeshPhysicalMaterial({
    color: COLORS.warm,
    metalness: 0.2,
    roughness: 0.3,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    transmission: 0.15,
    thickness: 0.3,
    ior: 1.4
  });

  const edgeMaterial = new THREE.LineBasicMaterial({
    color: COLORS.accentSecondary,
    transparent: true,
    opacity: 0.6
  });

  const edgeMaterialWarm = new THREE.LineBasicMaterial({
    color: COLORS.warm,
    transparent: true,
    opacity: 0.5
  });

  const glowMaterial = new THREE.MeshBasicMaterial({
    color: COLORS.accent,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide
  });

  const glowMaterialWarm = new THREE.MeshBasicMaterial({
    color: COLORS.warm,
    transparent: true,
    opacity: 0.12,
    side: THREE.BackSide
  });

  // Central hub
  const hubGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const hub = new THREE.Mesh(hubGeo, nodeMaterial);
  hub.castShadow = true;
  hub.receiveShadow = true;
  group.add(hub);
  CONFIG.hub = hub;

  const hubGlowGeo = new THREE.SphereGeometry(0.5, 32, 32);
  const hubGlow = new THREE.Mesh(hubGlowGeo, glowMaterial);
  group.add(hubGlow);
  CONFIG.hubGlow = hubGlow;

  // Orbiting nodes - 6 nodes representing 6 pillars
  const nodes = [];
  const nodeCount = 6;
  const orbitRadius = 1.8;

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const isWarm = i % 2 === 0;

    const nodeGeo = new THREE.OctahedronGeometry(0.18, 1);
    const node = new THREE.Mesh(nodeGeo, isWarm ? nodeMaterialWarm : nodeMaterial);
    node.position.set(
      Math.cos(angle) * orbitRadius,
      Math.sin(angle * 0.7) * orbitRadius * 0.5,
      Math.sin(angle) * orbitRadius
    );
    node.castShadow = true;
    group.add(node);

    const nodeGlowGeo = new THREE.OctahedronGeometry(0.28, 1);
    const nodeGlow = new THREE.Mesh(nodeGlowGeo, isWarm ? glowMaterialWarm : glowMaterial);
    nodeGlow.position.copy(node.position);
    group.add(nodeGlow);

    // Connection line
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(6);
    linePositions[0] = 0; linePositions[1] = 0; linePositions[2] = 0;
    linePositions[3] = node.position.x;
    linePositions[4] = node.position.y;
    linePositions[5] = node.position.z;
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const line = new THREE.Line(lineGeo, isWarm ? edgeMaterialWarm : edgeMaterial);
    group.add(line);

    nodes.push({ mesh: node, glow: nodeGlow, line, angle, orbitRadius, isWarm, baseY: node.position.y });
  }
  CONFIG.nodes = nodes;

  // Particle field
  const particleCount = 800;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  const alphas = new Float32Array(particleCount);
  const colorTypes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const radius = 1.5 + Math.random() * 3.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
    positions[i * 3 + 2] = radius * Math.cos(phi);

    sizes[i] = Math.random() * 2 + 0.5;
    alphas[i] = Math.random() * 0.6 + 0.1;
    colorTypes[i] = Math.random();
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  particleGeo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
  particleGeo.setAttribute('colorType', new THREE.BufferAttribute(colorTypes, 1));

  const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uAccent: { value: new THREE.Color(COLORS.accent) },
      uAccentSecondary: { value: new THREE.Color(COLORS.accentSecondary) },
      uWarm: { value: new THREE.Color(COLORS.warm) }
    },
    vertexShader: `
      attribute float size;
      attribute float alpha;
      attribute float colorType;
      varying float vAlpha;
      varying float vSize;
      varying float vColorType;
      uniform float uTime;
      uniform float uPixelRatio;
      void main() {
        vAlpha = alpha;
        vSize = size;
        vColorType = colorType;
        vec3 pos = position;
        float rotSpeed = 0.05;
        float c = cos(uTime * rotSpeed);
        float s = sin(uTime * rotSpeed);
        mat2 rot = mat2(c, -s, s, c);
        pos.xz = rot * pos.xz;
        pos.y += sin(uTime * 0.3 + position.x * 0.5) * 0.02;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z) * uPixelRatio;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      varying float vSize;
      varying float vColorType;
      uniform vec3 uAccent;
      uniform vec3 uAccentSecondary;
      uniform vec3 uWarm;
      void main() {
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
        vec3 color;
        if (vColorType < 0.33) color = uAccent;
        else if (vColorType < 0.66) color = uAccentSecondary;
        else color = uWarm;
        float glow = smoothstep(0.4, 0.0, dist) * 0.4;
        gl_FragColor = vec4(color, alpha + glow);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(particleGeo, particleMaterial);
  scene.add(particles);
  CONFIG.particles = particles;
  CONFIG.particleMaterial = particleMaterial;

  group.scale.setScalar(1);
  scene.add(group);
  CONFIG.geometry = group;
  CONFIG.floatOffset = Math.random() * Math.PI * 2;
}

function setupControls() {
  const { canvas, camera, renderer } = CONFIG;
  CONFIG.controls = new OrbitControls(camera, canvas);
  CONFIG.controls.enableDamping = true;
  CONFIG.controls.dampingFactor = 0.05;
  CONFIG.controls.enableZoom = false;
  CONFIG.controls.enablePan = false;
  CONFIG.controls.autoRotate = true;
  CONFIG.controls.autoRotateSpeed = 0.2;
  CONFIG.controls.minPolarAngle = Math.PI / 3;
  CONFIG.controls.maxPolarAngle = Math.PI / 1.5;
  CONFIG.controls.target.set(0, 0, 0);
}

function setupEventListeners() {
  const { canvas } = CONFIG;

  document.addEventListener('mousemove', (e) => {
    CONFIG.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    CONFIG.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      CONFIG.targetMouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      CONFIG.targetMouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!CONFIG.animationId) animate();
      } else {
        cancelAnimationFrame(CONFIG.animationId);
        CONFIG.animationId = null;
      }
    });
  }, { threshold: 0.1 });
  observer.observe(canvas);
}

function onResize() {
  const { canvas, camera, renderer } = CONFIG;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  if (CONFIG.particleMaterial) {
    CONFIG.particleMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
  }
}

function animate() {
  if (CONFIG.reducedMotion) return;

  CONFIG.animationId = requestAnimationFrame(animate);
  CONFIG.time += 1 / 60;
  const t = CONFIG.time;

  CONFIG.mouse.x += (CONFIG.targetMouse.x - CONFIG.mouse.x) * 0.05;
  CONFIG.mouse.y += (CONFIG.targetMouse.y - CONFIG.mouse.y) * 0.05;

  // Geometry group rotation and float
  if (CONFIG.geometry) {
    const floatY = Math.sin(t * 0.6 + CONFIG.floatOffset) * 0.06;
    const floatX = Math.cos(t * 0.4 + CONFIG.floatOffset) * 0.03;
    CONFIG.geometry.position.y = floatY;
    CONFIG.geometry.position.x = floatX;
    CONFIG.geometry.rotation.y = t * 0.15 + CONFIG.mouse.x * 0.1;
    CONFIG.geometry.rotation.x = CONFIG.mouse.y * 0.08;
  }

  // Hub pulse
  if (CONFIG.hub && CONFIG.hubGlow) {
    const pulse = Math.sin(t * 2) * 0.08 + 1;
    CONFIG.hub.scale.setScalar(pulse);
    CONFIG.hubGlow.scale.setScalar(pulse * 1.3);
    CONFIG.hubGlow.material.opacity = 0.15 * (0.7 + Math.sin(t * 1.5) * 0.3);
  }

  // Node animations
  if (CONFIG.nodes) {
    CONFIG.nodes.forEach((node, i) => {
      const nodeTime = t + i * 1.2;
      const orbitSpeed = 0.4;
      const angle = node.angle + t * orbitSpeed;
      const radius = node.orbitRadius;

      node.mesh.position.x = Math.cos(angle) * radius;
      node.mesh.position.y = node.baseY + Math.sin(nodeTime * 1.2) * 0.15;
      node.mesh.position.z = Math.sin(angle) * radius;

      node.glow.position.copy(node.mesh.position);
      node.glow.scale.setScalar(1 + Math.sin(nodeTime * 2) * 0.15);
      node.glow.material.opacity = node.isWarm ? 0.12 * (0.7 + Math.sin(nodeTime * 1.8) * 0.3) : 0.15 * (0.7 + Math.sin(nodeTime * 1.8) * 0.3);

      node.mesh.rotation.y = t * 0.8;
      node.mesh.rotation.x = t * 0.5;

      // Update line
      if (node.line && node.line.geometry) {
        const positions = node.line.geometry.attributes.position.array;
        positions[3] = node.mesh.position.x;
        positions[4] = node.mesh.position.y;
        positions[5] = node.mesh.position.z;
        node.line.geometry.attributes.position.needsUpdate = true;
      }
    });
  }

  // Particles
  if (CONFIG.particles && CONFIG.particleMaterial) {
    CONFIG.particleMaterial.uniforms.uTime.value = t;
  }

  // Lights
  if (CONFIG.keyLight) {
    CONFIG.keyLight.position.x = 3 + Math.sin(t * 0.2) * 0.5;
    CONFIG.keyLight.position.y = 4 + Math.cos(t * 0.15) * 0.3;
  }
  if (CONFIG.accentLight) {
    CONFIG.accentLight.position.x = Math.sin(t * 0.3) * 2;
    CONFIG.accentLight.position.z = Math.cos(t * 0.3) * 2;
    CONFIG.accentLight.intensity = 0.8 + Math.sin(t * 1.5) * 0.2;
  }

  // Camera subtle movement
  if (CONFIG.camera) {
    CONFIG.camera.position.x = CONFIG.mouse.x * 0.15;
    CONFIG.camera.position.y = CONFIG.mouse.y * 0.1;
  }

  if (CONFIG.controls) CONFIG.controls.update();
  CONFIG.renderer.render(CONFIG.scene, CONFIG.camera);
}

export function destroyHero3D() {
  if (CONFIG.animationId) { cancelAnimationFrame(CONFIG.animationId); CONFIG.animationId = null; }
  if (CONFIG.renderer) { CONFIG.renderer.dispose(); CONFIG.renderer = null; }
  if (CONFIG.scene) {
    CONFIG.scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) { if (Array.isArray(object.material)) object.material.forEach(m => m.dispose()); else object.material.dispose(); }
    });
    CONFIG.scene = null;
  }
  if (CONFIG.controls) { CONFIG.controls.dispose(); CONFIG.controls = null; }
  window.removeEventListener('resize', onResize);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHero3D);
} else { initHero3D(); }

window.BCA3D = { init: initHero3D, destroy: destroyHero3D };