class Mode3D {
  constructor() {
    this.cell = 16;
    this.size = 16;
    this.world = [];
  }

  init() {
    preloadFont(); // ensure font loaded
    this.canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    noSmooth();
    textFont(simFont);
    this.initWorld();
  }

  // ... rest of class unchanged
}


  shutdown() {
    if (this.canvas) this.canvas.remove();
  }

  resize() {
    resizeCanvas(windowWidth, windowHeight);
  }

  initWorld() {
    this.world = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => Array(this.size).fill(false))
    );
  }

  mousePressed() {
    const x = floor(random(this.size));
    const y = floor(random(this.size));
    const z = floor(random(this.size));
    this.world[z][y][x] = true;
  }

  draw() {
    background(0);
    orbitControl();
    rotateX(-0.6);
    rotateY(0.7);

    for (let z=0; z<this.size; z++){
      for (let y=0; y<this.size; y++){
        for(let x=0;x<this.size;x++){
          if(!this.world[z][y][x]) continue;
          push();
          translate((x-this.size/2)*this.cell,(y-this.size/2)*this.cell,(z-this.size/2)*this.cell);
          fill(210,180,80);
          box(this.cell);
          pop();
        }
      }
    }

    resetMatrix();
    fill(255);
    textSize(16);
    text("3D MODE — Click to place voxels | Press K for 2D",-width/2+10,-height/2+24);
  }
}
}
