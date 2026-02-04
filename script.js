const canvas = document.getElementById("bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particles
const count = 10000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < positions.length; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.02,
  transparent: true,
  opacity: 0.6,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Mouse movement
const mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
});

// Animate
function animate() {
  requestAnimationFrame(animate);

  particles.rotation.y += 0.0004 + mouse.x * 0.002;
  particles.rotation.x += mouse.y * 0.002;

  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
