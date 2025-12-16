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
    this.canvas?.remove();
  }

  resize() {
    resizeCanvas(windowWidth, windowHeight);
    this.rebuild();
  }

  rebuild() {
    this.w = floor(width / this.cell);
    this.h = floor(height / this.cell);
    this.world = Array.from({ length: this.h }, () => Array(this.w).fill(null));
  }

  mousePressed() { this.paint(); }
  mouseDragged() { this.paint(); }

  paint() {
    const x = floor((mouseX - width / 2) / this.cell);
    const y = floor((height / 2 - mouseY) / this.cell);

    const gx = x + floor(this.w / 2);
    const gy = y + floor(this.h / 2);

    if (gx >= 0 && gy >= 0 && gx < this.w && gy < this.h) {
      this.world[gy][gx] = "sand";
    }
  }

  physics() {
    for (let y = 1; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        if (this.world[y][x] === "sand" && !this.world[y - 1][x]) {
          this.world[y][x] = null;
          this.world[y - 1][x] = "sand";
        }
      }
    }
  }

  draw() {
    background(20);

    if (millis() - this.lastTick > 1000 / this.physicsTPS) {
      this.physics();
      this.lastTick = millis();
    }

    translate(width / 2, height / 2);

    noStroke();
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const mat = this.world[y][x];
        if (!mat) continue;

        const px = (x - this.w / 2) * this.cell;
        const py = (this.h / 2 - y) * this.cell;

        const c = MATERIALS[mat].color;
        fill(c[0], c[1], c[2]);
        rect(px, py, this.cell, this.cell);
      }
    }

    resetMatrix();
    fill(255);
    textSize(16);
    text("2D MODE — voxel-flat | Press K for 3D", 10, 24);
  }
}
