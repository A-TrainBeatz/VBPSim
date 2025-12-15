class Mode2D {
  constructor() {
    this.cell = 8;
    this.physicsTPS = 30;
    this.lastTick = 0;
  }

  init() {
    this.canvas = createCanvas(windowWidth, windowHeight);
    noSmooth();
    this.rebuild();
  }

  shutdown() {
    this.canvas.remove();
  }

  rebuild() {
    this.w = floor(width / this.cell);
    this.h = floor(height / this.cell);
    this.world = Array.from({ length: this.h }, () =>
      Array(this.w).fill(null)
    );
  }

  mousePressed() {
    this.paint();
  }

  mouseDragged() {
    this.paint();
  }

  paint() {
    let x = floor(mouseX / this.cell);
    let y = floor(mouseY / this.cell);
    if (x >= 0 && y >= 0 && x < this.w && y < this.h) {
      this.world[y][x] = "sand";
    }
  }

  physics() {
    for (let y = this.h - 1; y >= 0; y--) {
      for (let x = 0; x < this.w; x++) {
        if (this.world[y][x] === "sand" && y + 1 < this.h && !this.world[y + 1][x]) {
          this.world[y][x] = null;
          this.world[y + 1][x] = "sand";
        }
      }
    }
  }

  draw() {
    background(0);

    let now = millis();
    if (now - this.lastTick > 1000 / this.physicsTPS) {
      this.physics();
      this.lastTick = now;
    }

    noStroke();
    fill(210, 180, 80);
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        if (this.world[y][x]) {
          rect(x * this.cell, y * this.cell, this.cell, this.cell);
        }
      }
    }

    fill(255);
    text("2D MODE (Press K)", 10, 20);
  }
}
