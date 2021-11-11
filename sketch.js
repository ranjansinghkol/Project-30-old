const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;

var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var zombie, breakButton;

var stones = [];

var bg_img, zombieAnim1, zombieAnim2;

function preload() {
  bg_img = loadImage("./assets/background.png");
  zombieAnim1 = loadAnimation("./assets/zombie1", "./assets/zombie2", "./assets/zombie1");
  zombieAnim2 = loadAnimation("./assets/zombie3", "./assets/zombie4", "./assets/zombie3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20, "#795548", true);
  leftWall = new Base(width * 0.1, height * 0.5, 500, 100, "#8d6e63", true);
  rightWall = new Base(width * 0.9, height * 0.5, 500, 100, "#8d6e63", true);

  bridge = new Bridge(15, {x: width * 0.2 + 60, y: height * 0.5});
  jointPoint = new Base(width * 0.8 - 110, height * 0.5, 10, 100, "#8d6e63", true);

  Matter.Composite.add(bridge.body, jointPoint);

  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 7; i++) {
    var x = random(width * 0.4, width * 0.6);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  var zombie = createSprite(width / 2, height - 110);
  zombie.addAnimation("leftToRight", zombieAnim1);
  zombie.addAnimation("rightToLeft", zombieAnim2);

  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("break_button");

  breakButton.mouseClicked(onBreakButtonPressed)
}

function draw() {
  background(51);

  Engine.update(engine);

  image(bg_img, 0, 0, width, height)

  ground.show();
  leftWall.show();
  rightWall.show();
  bridge.show();


  for (var stone of stones) {
    stone.show();
  }
}

function onBreakButtonPressed() {
  jointLink.detach();

  setTimeout(() => {
    bridge.break();
  }, 1500)
}