var canvas;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

let engine;
let world;

var bg_img;
var avion,dragon;
var avionAnimation,dragonImg;
var attack,attackGroup,attackImg;

var ground;
var gameState = "play";
var gameOver, wintext;

var miaumiaulife = 160;
var attack;

function preload()
{
  bg_img = loadImage('./assets/background.png');
  avionAnimation = loadAnimation("./assets/avion.png","./assets/avion2.png","./assets/avion3.png","./assets/avion4.png","./assets/avion5.png","./assets/avion6.png","./assets/avion7.png","./assets/avion8.png");
  dragonImg = loadImage("./assets/dragon.png");
  attackImg = loadImage("./assets/attack.png");
  gameOverImg = loadImage("./assets/Game Over.png");
  wintextImg = loadImage("./assets/ganastes.png");

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  avion = createSprite(200,200,20,20);
  avion.addAnimation("avion",avionAnimation);
  avion.scale = 1.1;
  dragon = createSprite(width-140,height/2-40,20,20);
  dragon.addImage("dragon",dragonImg);
  dragon.scale=0.4;

  attackGroup = new Group();
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 2;
  gameOver.visible = false;

  wintext = createSprite(width/2,height/2- 50);
  wintext.addImage(wintextImg);
  wintext.scale = 5;
  wintext.visible = false;

  ground = new Ground(width/2,height-200,width,1);
  ball1 = new Obstacle(500,140,40,40);
  rope1 = new Rope(ball1.body,{x:400,y:0});
  ball2 = new Obstacle(700,180,40,40);
  rope2 = new Rope(ball2.body,{x:600,y:0});
  ball3 = new Obstacle(900,130,40,40);
  rope3 = new Rope(ball3.body,{x:800,y:0});

  dragon.setCollider("rectangle",0,0,dragon.width,dragon.height);
  dragon.debug = true
}


function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  Engine.update(engine);
  ground.show();
  

  var invisibleBlock = createSprite(windowWidth/2,windowHeight-140,windowWidth,10)
  invisibleBlock.visible = false;
  avion.collide(invisibleBlock);
  var invisibleBlock2 = createSprite(windowWidth/2,30,windowWidth,10)
  invisibleBlock2.visible = false;
  avion.collide(invisibleBlock2);
  var invisibleBlock3 = createSprite(width/2,height-200,width,1)
  invisibleBlock3.visible = false;
  avion.collide(invisibleBlock3);
  
  edges = createEdgeSprites();
  avion.collide(edges);
  
  ball1.display();
  rope1.display();
  ball2.display();
  rope2.display();
  ball3.display();
  rope3.display();

  if (gameState === "play")
  {
    doglife();
    if (keyDown("UP_ARROW"))
    {
      avion.y = avion.y-5;
    }
    if (keyDown("RIGHT_ARROW"))
    {
      avion.x = avion.x+5;
    }
    if (keyDown("LEFT_ARROW"))
    {
      avion.x = avion.x -5; 
    }
    if (keyDown("DOWN_ARROW"))
    {
      avion.y = avion.y +5; 
    }
    spawnAttack();
    
    if(miaumiaulife === 0)
    {
      gameState = "End";
    }
  }
  drawSprites();
  
  if (gameState === "End")
  {
    image(bg_img,0,0,width,height);
    image(wintextImg,width/2,height/2,200,100);
  }
}

function spawnAttack()
{
  if (frameCount%100 === 0)
  {
    attack = createSprite();
    attack.y = avion.y;
    attack.x = avion.x;
    attack.addImage(attackImg);
    attack.scale=1.5;
    attack.velocityX = 7;
    attack.lifetime = 150;
    attack.setCollider("rectangle",0,0,attack.width,attack.height);
    attack.debug = true
    attackGroup.add(attack);
    
  }
}

function doglife()
{
  fill("white");
  rect(width-220,height/2-170,160,15);
  fill("#f50057");
  rect(width-220,height/2-170,miaumiaulife,15);
  noStroke();

  if(attackGroup.isTouching(dragon) && miaumiaulife >= 0)
  {
    miaumiaulife -= 20;
    attackGroup.remove(attack);
    attack.lifetime = 1;
  }

}
