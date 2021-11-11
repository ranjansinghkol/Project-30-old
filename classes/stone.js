class Stone {
  constructor(x, y, w, h) {
    var options = {
      restitution: 0.8
    };

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.image = loadImage("./assets/stone.png");

    World.add(world, this.body);
  }

  show() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    strokeWeight(1);
    imageMode(CENTER);
    image(this.image, 0, 0, this.w, this.h);
    noStroke();
    pop();
  }
}
