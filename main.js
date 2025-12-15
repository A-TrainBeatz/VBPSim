let currentMode = null;
let active = "2D";

function switchMode() {
  if (currentMode) currentMode.shutdown();

  active = active === "2D" ? "3D" : "2D";

  currentMode = active === "2D"
    ? new Mode2D()
    : new Mode3D();

  currentMode.init();
}

function keyPressed() {
  if (key === "k" || key === "K") {
    switchMode();
  }

  if (currentMode?.keyPressed) {
    currentMode.keyPressed(key);
  }
}

function mousePressed() {
  currentMode?.mousePressed?.();
}

function mouseDragged() {
  currentMode?.mouseDragged?.();
}

function draw() {
  currentMode?.draw?.();
}

function setup() {
  switchMode(); // start in 2D
}
