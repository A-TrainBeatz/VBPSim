class Mode3D {
  constructor() {
    this.cell = 10;
    this.sizeZ = 16;
  }

  init() {
    this.canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    noSmooth();
    this.initWorld();
  }

  shutdown() {
    this.canvas.remove();
  }

  initWorld() {
    this.w = 32;
    this.h = 32;
    this.world = Array.from({ length: this.sizeZ }, () =>
      Array.from({ length: this.h }, () =>
        Array(this.w).fill(null)
      )
    );
  }

  mousePressed() {
    let x = floor(random(this.w));
    let y = floor(random(this.h));
    let z = floor(random(this.sizeZ));
    this.world[z][y][x] = true;
  }

  draw() {
    background(0);
    rotateX(PI / 4);
    rotateY(PI / 4);
    translate(0, 0, -this.sizeZ * this.cell);

    noStroke();
    fill(200, 180, 80);

    for (let z = 0; z < this.sizeZ; z++) {
      for (let y = 0; y < this.h; y++) {
        for (let x = 0; x < this.w; x++) {
          if (this.world[z][y][x]) {
            push();
            translate(
              (x - this.w / 2) * this.cell,
              (y - this.h / 2) * this.cell,
              (z - this.sizeZ / 2) * this.cell
            );
            box(this.cell);
            pop();
          }
        }
      }
    }

    resetMatrix();
    fill(255);
    text("3D MODE (Press K)", -width / 2 + 10, -height / 2 + 20);
  }
}
