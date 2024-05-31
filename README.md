# WebGL

**What is it?**
- A JavaScript API for implementing 2d and 3d vector graphics in the browser
- It allows developers to run hardware accelerated graphics with the client's GPU directly inside and HTML canvas w/o the need for an external plugins
- It lets you draw on canvas
- Enables 3d in the web browser which made possible by GPU
- It's essentially a collection of triangles that form different type of geometries and shapes.

**What can we do with it?**
- Web design
- Interactive games
- Data visualization
- Physics simulations
- Arts

**What's it used for?**
- Render graphics in every day tools like google maps
- Web-based games with 'unity' engine

**Basic 3D theory & Rendering pipeline**

![image](https://github.com/asyikin22/three.js-basics/assets/148519441/b4fc4383-c354-4131-b263-4a976cf06353)

![image](https://github.com/asyikin22/three.js-basics/assets/148519441/5d1f7d5e-3726-4c7d-af7d-246c7871a394)

**Customize using shader**

![image](https://github.com/asyikin22/three.js-basics/assets/148519441/fb0250de-12ae-4698-a3d0-a11a32f3e46f)

**How does WebGL work?**
- The calculations are often too much for the CPU to handle by itself, that is why we have GPUs to distribute the calculation more efficiently
- It allows us to process graphics on the GPU
- It's based on a library OpenGL
- Grab an HTML canvas in the DOM and get WebGL contacts to start drawing
- The main program code is written in JavaScript, but shaders are written in the OpenGL shading language
- A shader will take information about a vertex or fragment and use the GPU to calculate the data required to render it as a pixel on the screen


**Tool/libraries that we can use to write shaders to add 3D graphics to website**
- Three.js (library)
- Spline (tool)

**What does 3js do?**:
- It simplifies API JavaScript
- It adds a layer of abstractions to make it easier to use 


# Animated Geometry

**Set Up**

![image](https://github.com/asyikin22/three.js-basics/assets/148519441/fcd38c32-14ca-494d-b45b-1ea67b6764a7)

-----------------
**Render Call**:
-----------------

![image](https://github.com/asyikin22/three.js-basics/assets/148519441/ddd64550-1822-449a-98b1-d77d5cfec044)

-----------------
**Create a 3D Object**:
-----------------

![image](https://github.com/asyikin22/three.js-basics/assets/148519441/906cb0c5-c90b-4e03-b427-f23df72cb063)

**RESULT**

![image](https://github.com/asyikin22/three.js-basics/assets/148519441/5512b583-cbcd-483b-a6b0-8bd656306f5d)

**Wrap render call in a function**
- We can call again and again
- As we update the scene, we can see some animation
- It works with API - request animation frame - pass in the name of the function
- Call function

-----------------
**Apply style to our geometry**:
-----------------

![image](https://github.com/asyikin22/three.js-basics/assets/148519441/29f383a4-c703-4fa3-874b-ee6f20b8cd9e)


-----------------
**Apply animation to our geometry**:
-----------------

![image](https://github.com/asyikin22/three.js-basics/assets/148519441/ba151ad2-267b-4b99-ad31-7df5ae710884)

**Move object around the scene**

![image](https://github.com/asyikin22/three.js-basics/assets/148519441/2f4b8d08-e823-4c47-aa80-efff16c38262)







