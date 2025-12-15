class Mode2D {
  constructor() {
    this.cell = 10;
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

  resize() {
    resizeCanvas(windowWidth, windowHeight);
    this.rebuild();
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
    const x = floor(mouseX / this.cell);
    const y = floor(mouseY / this.cell);
    if (x >= 0 && y >= 0 && x < this.w && y < this.h) {
      this.world[y][x] = "sand";
    }
  }

  physics() {
    for (let y = this.h - 2; y >= 0; y--) {
      for (let x = 0; x < this.w; x++) {
        if (this.world[y][x] === "sand" && !this.world[y + 1][x]) {
          this.world[y][x] = null;
          this.world[y + 1][x] = "sand";
        }
      }
    }
  }

  draw() {
    background(20);

    const now = millis();
    if (now - this.lastTick > 1000 / this.physicsTPS) {
      this.physics();
      this.lastTick = now;
    }

    // Draw grid (VISIBLE even when empty)
    stroke(40);
    for (let x = 0; x < this.w; x++)
      line(x * this.cell, 0, x * this.cell, height);
    for (let y = 0; y < this.h; y++)
      line(0, y * this.cell, width, y * this.cell);

    // Draw particles
    noStroke();
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const mat = this.world[y][x];
        if (!mat) continue;
        const c = MATERIALS[mat].color;
        fill(c[0], c[1], c[2]);
        rect(x * this.cell, y * this.cell, this.cell, this.cell);
      }
    }

    // HUD
    fill(255);
    textSize(16);
    text("2D MODE — Click to draw sand | Press K for 3D", 10, 24);
  }
}
