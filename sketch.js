let modes = ['cube', 'mesh', 'flow', 'lines', 'shader', 'bio'];
let currentModeIndex = 0;
let currentMode = modes[currentModeIndex]; 
let logoImg;
let needsClear = true; 

function preload() {
  logoImg = loadImage('resources/CursorLogoRevised.png');
}

function setup() {
  // SAFEGUARD: Ensure the canvas is never 0x0, which causes IndexSizeError
  let safeW = max(windowWidth, 100);
  let safeH = max(windowHeight, 100);
  let canvas = createCanvas(safeW, safeH);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); 
  
  pixelDensity(2); 
  
  setupCube();
  setupMesh();
  setupFlow(); 
  setupLines(); 
  setupShader();
  setupBio();

  updateUITheme(currentMode);
  setInterval(cycleMode, 2000);
}

function draw() {
  // SAFEGUARD: Wait for image to fully load before trying to draw
  if (!logoImg || logoImg.width === 0 || logoImg.height === 0) return;

  if (currentMode === 'cube') {
    needsClear = false; 
    drawCube();
  } else if (currentMode === 'mesh') {
    needsClear = false; 
    drawMesh();
  } else if (currentMode === 'flow') {
    drawFlow();
  } else if (currentMode === 'lines') { 
    drawLines();
  } else if (currentMode === 'shader') {
    needsClear = true; 
    drawShader();
  } else if (currentMode === 'bio') {
    needsClear = false; 
    drawBio();
  }
}

function windowResized() {
  // SAFEGUARD: Ensure the canvas is never 0x0 on resize
  let safeW = max(windowWidth, 100);
  let safeH = max(windowHeight, 100);
  resizeCanvas(safeW, safeH);
  
  windowResizedCube();
  windowResizedMesh();
  windowResizedFlow(); 
  windowResizedLines(); 
  windowResizedShader();
  windowResizedBio();
}

function cycleMode() {
  currentModeIndex = (currentModeIndex + 1) % modes.length;
  setMode(modes[currentModeIndex]);
}

function updateUITheme(modeName) {
  const darkBackgroundModes = ['mesh', 'flow', 'lines'];
  const logoElement = document.querySelector('.main-logo');
  
  if (darkBackgroundModes.includes(modeName)) {
    document.body.classList.add('dark-ui');
    if (logoElement) {
      logoElement.src = 'resources/CursorCreativeLight.png';
    }
  } else {
    document.body.classList.remove('dark-ui');
    if (logoElement) {
      logoElement.src = 'resources/CursorCreativeDark.png';
    }
  }
}

function setMode(newMode) {
  if (currentMode !== newMode) {
    currentMode = newMode;
    needsClear = true; 
    
    updateUITheme(newMode);
    
    for (let m of modes) {
      let btn = document.getElementById('btn-' + m);
      if (btn) btn.classList.remove('active');
    }

    let activeBtn = document.getElementById('btn-' + newMode);
    if (activeBtn) activeBtn.classList.add('active');
  }
}