import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5); // Position the light
scene.add(directionalLight);

// Loading the Rabbit model
const loader = new GLTFLoader();
loader.load(
    'Rabbit.glb',  // Make sure this file is in the same folder as the HTML and JS files
    function(gltf) {
        // Scaling and positioning the model
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        gltf.scene.position.y = -1;
        scene.add(gltf.scene);
    },
    undefined,
    function(error) {
        console.error('Error loading model:', error);
    }
);

// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the rabbit model and the scene
  if (scene.children[2]) {  // Ensure the model is loaded before rotating
    scene.children[2].rotation.x += 0.01;
    scene.children[2].rotation.y += 0.01;
  }

  // Render the scene
  renderer.render(scene, camera);
}

animate();
