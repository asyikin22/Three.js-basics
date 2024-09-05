
// console.log('JS file is working')

// console.log('I havent been coding using JS for a couple of monhts I forgot how to do anything!')

// document.getElementById('Output').innerText = 'JS is running. FINALLY!'

import * as THREE from 'three'
import { OrbitControls } from 'jsm/controls/OrbitControls.js'

//create a basic scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

camera.position.z = 3;

// Optionally adjust renderer settings
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.21;

// Define orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;                                       //this is to smoothen the orbit control

// Load a texture for the globe and plane icon
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('./image/earthTexture.jpg')
const pinTexture = textureLoader.load('./image/plane.png')

//load a background texture
const backgroundTexture = textureLoader.load('./image/starry.png')
scene.background = backgroundTexture;

// Create globe
const geometry = new THREE.SphereGeometry(1, 32, 32)
const material = new THREE.MeshStandardMaterial({
    map:earthTexture,
    flatShading: false
})

const earthMesh = new THREE.Mesh(geometry, material)
scene.add(earthMesh)

//create light
const hemiLight = new THREE .HemisphereLight(0xFFFFFF, 0xFFFFFF, 3.8)
scene.add(hemiLight)


// Helper function to create a text sprite
function createTextSprite(text, color='fuchsia'){

    //set canvas dimensions
    const canvasWidth = 512;
    const canvasHeight = 512;

    //create canvas and context
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext('2d');

    //set text styles
    context.fillStyle = color;                              
    context.font = `49px 'Georgia'`
    context.textAlign = 'center';
    context.textBaseline = 'middle';                                          
    
    // draw text
    context.fillText(text, canvas.width / 2, canvas.height / 2)

    // create texture and sprite
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture})

    return new THREE.Sprite(material);
}

// Helper function to convert lat/lon to 3D coordinates on the globe
function latLongToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);  // Convert latitude to spherical coordinates
    const theta = (lon + 180) * (Math.PI / 180); // Convert longitude to spherical coordinates

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
}

// Create a container for labels so they rotate together wiht the globe
const markerLabelContainer = new THREE.Group();
earthMesh.add(markerLabelContainer)                            // add container to the globe

//Define an array of colors
const colors = ['yellow','blue','fuchsia','#00FF7F','red','black', '#7CFC00']

// Function to add a marker at a specific location
function addPinWithLabel(lat, lon, label, index, radius = 1.01) {
    const pinMaterial = new THREE.SpriteMaterial({ map:pinTexture });
    const pinSprite = new THREE.Sprite(pinMaterial);

    // set the scale of the pin sprite to make it larger if needed
    pinSprite.scale.set(0.1, 0.1, 1);

    // Convert latitude and longitude to 3D coordinates
    const position = latLongToVector3(lat, lon, radius);
    pinSprite.position.copy(position); // Set the position of the marker
    scene.add(pinSprite); // Add marker to the scene

    //determine color for the label
    const color = colors[index % colors.length]

    // Create and add text label
    const textSprite = createTextSprite(label, color);
    textSprite.position.copy(position);
    textSprite.position.y += 0.07;           // offset the label above the pin
    textSprite.position.x -= 0.03;   

    markerLabelContainer.add(pinSprite)            // add marker to the container
    markerLabelContainer.add(textSprite)           // add label to the container

}

// Fetch the coords from JSON and add markers with labels
fetch ('Travel_map_cvs.json')
    .then(response => response.json())
    .then(data => {
        data.forEach((country, index)=> {
            const { Latitude, Longitude, Countries } = country;
            addPinWithLabel(Latitude, Longitude, Countries, index);
        });
    })
    .catch(error => console.error('Error Loading coordinates:', error))


function animate() {
    requestAnimationFrame(animate);

    // rotate the globe around the y-axis
    earthMesh.rotation.y += 0.004;        

    controls.update();
    renderer.render(scene, camera)

}

animate();
