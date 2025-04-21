import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/geometries/TextGeometry';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(1, 1, 1);
scene.add(light);

// Cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
cube.position.x = -2;
scene.add(cube);

// Sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
sphere.position.x = 2;
scene.add(sphere);

// Line
const linePoints = [
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(1, 0, 0),
];
const line = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(linePoints),
  new THREE.LineBasicMaterial({ color: 0xff0000 })
);
scene.add(line);

// GLTF Model
const loader = new GLTFLoader();
loader.load(
  './Rabbit.glb',
  gltf => {
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    gltf.scene.position.y = -1;
    scene.add(gltf.scene);
  },
  undefined,
  err => console.error('Model loading error:', err)
);

// Text
const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
  const textGeo = new TextGeometry('Three.js FTW!', {
    font,
    size: 0.5,
    height: 0.1,
  });
  const textMesh = new THREE.Mesh(
    textGeo,
    new THREE.MeshStandardMaterial({ color: 0xffff00 })
  );
  textMesh.position.set(-2, 2, 0);
  scene.add(textMesh);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  sphere.rotation.y += 0.02;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
