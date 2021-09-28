import Stats from 'stats.js'


const debugConsole = document.getElementById("debug-console")

var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
debugConsole.appendChild( stats.dom );

function animate() {

	stats.begin();

	// monitored code goes here
    renderer.render(scene, camera);

	stats.end();

	requestAnimationFrame( animate );

}

requestAnimationFrame( animate );
