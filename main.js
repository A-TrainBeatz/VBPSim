let currentMode = null;
let active = "2D";

function bootMode() {
  currentMode = active === "2D"
    ? new Mode2D()
    : new Mode3D();

  currentMode.init();
}

function switchMode() {
  if (currentMode) currentMode.shutdown();
  active = active === "2D" ? "3D" : "2D";
  bootMode();
}

/* ---- p5 hooks (FORCED GLOBAL) ---- */

window.setup = function () {
  pixelDensity(1);
  bootMode();
};

window.draw = function () {
  if (currentMode && currentMode.draw) {
    currentMode.draw();
  }
};

window.keyPressed = function () {
  if (key === "k" || key === "K") switchMode();
  currentMode?.keyPressed?.(key);
};

window.mousePressed = function () {
  currentMode?.mousePressed?.();
};

window.mouseDragged = function () {
  currentMode?.mouseDragged?.();
};

function setup() {
  switchMode(); // start in 2D
}
