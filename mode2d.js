// ============================
// 2D MODE — STATE
// ============================
let cell2D = 8;
let worldW2D, worldH2D;
let worldFG2D = [];
let worldBG2D = [];
let physicsTPS2D = 30;
let lastTick2D = 0;

// ============================
// 2D MODE — LIFECYCLE
// ============================
function start2D() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  rebuild2D();
}

function shutdown2D() {
  remove(); // destroys canvas cleanly
}

function draw2D() {
  background(0);

  let now = millis();
  if (now - lastTick2D > 1000 / physicsTPS2D) {
    physics2D();
    lastTick2D = now;
  }

  render2D();
}

// ============================
// INPUT
// ============================
function keyPressed2D() {
  // all your existing 2D keys EXCEPT K
}

function mousePressed2D() { handlePaint2D(); }
function mouseDragged2D() { handlePaint2D(); }

// ============================
// WORLD / PHYSICS / RENDER
// ============================
function rebuild2D() {
  worldW2D = floor(width / cell2D);
  worldH2D = floor(height / cell2D);
  worldFG2D = Array.from({ length: worldH2D }, () => Array(worldW2D).fill(null));
  worldBG2D = Array.from({ length: worldH2D }, () => Array(worldW2D).fill(null));
}

function physics2D() {
  // unchanged physicsLayer logic
}

function render2D() {
  // unchanged rect-based rendering
}
