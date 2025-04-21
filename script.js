import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/loaders/GLTFLoader';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube creation
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Load the Rabbit model
const loader = new GLTFLoader();
loader.load(
  'Rabbit.glb',  // Make sure 'Rabbit.glb' is in the same folder as your index.html and script.js
  function (gltf) {
    const rabbit = gltf.scene;
    rabbit.scale.set(0.5, 0.5, 0.5); // Scale the model down
    rabbit.position.y = -1; // Position the rabbit below the cube
    scene.add(rabbit);
  },
  undefined,
  function (error) {
    console.error('Error loading the rabbit model:', error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
