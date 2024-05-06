// Import necessary three.js classes
import * as THREE from 'three';

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create an array to hold the stars
const stars = [];
const starCount = 500;

// Load the star texture
const textureLoader = new THREE.TextureLoader();

// dev note: These can silently fail. make sure you have the correct path or some kind of file checker
const starTexture = textureLoader.load('textures/star.jpg');
const starAlphaTexture = textureLoader.load('textures/star_alpha.jpg');

// Create stars
for(let i = 0; i < starCount; i++) {
    const geometry = new THREE.PlaneGeometry();
    const material = new THREE.MeshStandardMaterial({
        map: starTexture,
        emissiveMap: starAlphaTexture,
        emissive: 0xFFFFFF
    });
    const star = new THREE.Mesh(geometry, material);

    // Position the star randomly within a cube
    star.position.x = Math.random() * 600 - 300;
    star.position.y = Math.random() * 600 - 300;
    star.position.z = Math.random() * 600 - 300;

    // Add the star to the scene and the stars array
    scene.add(star);
    stars.push(star);
}

// Position the camera
camera.position.z = 5;

// Add an event listener for the mouse wheel
document.addEventListener('wheel', onDocumentMouseWheel, false);

function onDocumentMouseWheel(event) {
    // Move each star at a different speed
    for(let i = 0; i < stars.length; i++) {
        stars[i].position.y += event.deltaY * 0.01 * (i % 5 + 1); 
    }
}

// Render the scene
function animate() {
    requestAnimationFrame(animate);

    // Make the stars twinkle by adjusting their emissive intensity
    for(let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const intensity = (1 + Math.sin(performance.now() * 0.001 + star.position.x)) * 0.5;
        star.material.emissiveIntensity = intensity;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);
animate();