import * as THREE from 'three';
import { OrbitControls } from "jsm/controls/OrbitControls.js";

//create a renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialisas: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//create a camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

//create the scene
const scene = new THREE.Scene();

// //Define orbit controls
const controls = new OrbitControls(camera, renderer.domElement)

//create some geometries
const geo = new THREE.IcosahedronGeometry(1.0, 4)
const mat = new THREE.MeshStandardMaterial({
    color: 0xFFC0CB,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat)
scene.add(mesh)

//highlight the facets 
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const wireMesh = new THREE.Mesh(geo, wireMat)
wireMesh.scale.setScalar(1.001)
mesh.add(wireMesh)

//create light
const hemiLight = new THREE .HemisphereLight(0x800080, 0xFFA500, 3)
scene.add(hemiLight)

//Render call is wrapped inside animate function
function animate(t=0) {
    requestAnimationFrame(animate)
    mesh.rotation.y = t * 0.0001;         //rotate 3D objects around y-axis
    renderer.render(scene, camera)
}

animate();




