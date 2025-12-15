let currentMode = null;
let activeMode = "2D";

function setup() {
  pixelDensity(1);
  switchMode();
}

function draw() {
  if (currentMode?.draw) currentMode.draw();
}

function switchMode() {
  if (currentMode) currentMode.shutdown();

  activeMode = activeMode === "2D" ? "3D" : "2D";
  currentMode = activeMode === "2D" ? new Mode2D() : new Mode3D();
  currentMode.init();
}

function keyPressed() {
  if (key === "k" || key === "K") {
    switchMode();
    return;
  }
  currentMode?.keyPressed?.(key);
}

function mousePressed() {
  currentMode?.mousePressed?.();
}

function mouseDragged() {
  currentMode?.mouseDragged?.();
}

function windowResized() {
  currentMode?.resize?.();
}
