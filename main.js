let currentMode = "2D"; // "2D" or "3D"

function setup() {
  start2D();
}

function draw() {
  if (currentMode === "2D") draw2D();
  else draw3D();
}

function keyPressed() {
  if (key === "k" || key === "K") {
    switchMode();
    return;
  }

  if (currentMode === "2D") keyPressed2D();
  else keyPressed3D();
}

function mousePressed() {
  if (currentMode === "2D") mousePressed2D();
  else mousePressed3D();
}

function mouseDragged() {
  if (currentMode === "2D") mouseDragged2D();
  else mouseDragged3D();
}

function switchMode() {
  if (currentMode === "2D") {
    shutdown2D();
    start3D();
    currentMode = "3D";
  } else {
    shutdown3D();
    start2D();
    currentMode = "2D";
  }
}
