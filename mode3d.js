// ============================
// 3D MODE — STATE
// ============================
let cell3D = 8;
let worldW3D, worldH3D, worldZ3D = 16;
let world3D = [];
let physicsTPS3D = 30;
let lastTick3D = 0;

// ============================
// 3D MODE — LIFECYCLE
// ============================
function start3D() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noSmooth();
  rebuild3D();
}

function shutdown3D() {
  remove();
}

function draw3D() {
  background(0);

  let now = millis();
  if (now - lastTick3D > 1000 / physicsTPS3D) {
    physics3D();
    lastTick3D = now;
  }

  render3D();
}

// ============================
// INPUT
// ============================
function keyPressed3D() {
  // all your 3D keys EXCEPT K
}

function mousePressed3D() { handlePaint3D(); }
function mouseDragged3D() { handlePaint3D(); }

// ============================
// WORLD / PHYSICS / RENDER
// ============================
function rebuild3D() {
  worldW3D = floor(width / cell3D);
  worldH3D = floor(height / cell3D);

  world3D = Array.from({ length: worldZ3D }, () =>
    Array.from({ length: worldH3D }, () =>
      Array(worldW3D).fill(null)
    )
  );
}

function physics3D() {
  // unchanged 3D physics logic
}

function render3D() {
  push();
  rotateX(PI / 4);
  rotateY(PI / 4);
  translate(-worldW3D * cell3D / 2, -worldH3D * cell3D / 2, -worldZ3D * cell3D / 2);

  for (let z = 0; z < worldZ3D; z++)
    for (let y = 0; y < worldH3D; y++)
      for (let x = 0; x < worldW3D; x++) {
        if (!world3D[z][y][x]) continue;
        push();
        translate(x * cell3D, y * cell3D, z * cell3D);
        box(cell3D);
        pop();
      }

  pop();
}
