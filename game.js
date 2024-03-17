/*******************************************************/
// P5.play: t20_load_images
// Load & display images
// Written by???
/*******************************************************/
console.log("%c game.js", "color: blue;");
const SCREEN_WIDTH = 650;
const SCREEN_HIEGHT = 550;
const FIELD_WIDTH = 2152;
const FIELD_HIEGHT = 2368;
var nextSpawn = 0;
/*******************************************************/
// preload()
// Called by P5 before setup
/*******************************************************/
function preload() {
  let space = false;
  console.log("preload: ");
  field = loadImage('images/field.png');
  ball = loadImage('images/football.png');
  defender = loadImage('images/defender.png');
}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
  console.log("setup: ");
  cnv = new Canvas(SCREEN_WIDTH, SCREEN_HIEGHT);
  box = new Sprite(SCREEN_WIDTH/2, SCREEN_HIEGHT/2, 4304, 4736, 'n');
  box.addImage(field);
  field.resize(FIELD_WIDTH, FIELD_HIEGHT);
  ball1 = new Sprite(width/2, height/2, 40, 'd');
  ball1.addImage(ball);
  ball.resize(40, 40);
  box1 = new Sprite(150, 20, 300, 30,'n' )
  box2 = new Sprite(307, 1355, 150, 30,'k' )
  defenders2 = new Sprite(2900, 700, 90, 90,'k' )
  defenders2.addImage(defender);
  defender.resize(120, 120);
  
  document.addEventListener("keydown", function(event) {
     if (event.code === 'ArrowLeft') {
        ball1.vel.x = -8;
      }
      else if (event.code === 'ArrowRight')
        ball1.vel.x = 8;
      else if (event.code === 'ArrowUp')  
        ball1.vel.y = -8;
      else if (event.code === 'ArrowDown')
        ball1.vel.y = 8;
    });
    
    
    
    document.addEventListener("keyup", function(event) {
    
      if (event.code === 'ArrowLeft') {
        ball1.vel.x = 0;
      }
      else if (event.code === 'ArrowRight')
        ball1.vel.x = 0;
      else if (event.code === 'ArrowUp')  
        ball1.vel.y = 0;
      else if (event.code === 'ArrowDown')
        ball1.vel.y = 0;
    });
    
}

/*******************************************************/
// draw()     
/*******************************************************/

function draw() {
    let space; 
    if (kb.pressing('space')){
         space = true;
    }
    if (space == true){
        ball1.moveTo(box2, 20)
        camera.zoomTo(0.5);
    }
     if (space == false){
        camera.zoomTo(1);
    }
    camera.on();
    if(frameCount> nextSpawn){
        newDefender();
        nextSpawn = frameCount + random(80,150);
    }
    defenders2.moveTo(ball1, 3)
    defenders2.rotateTowards(ball1, 0.1, 90);
    background('green');
    camera.x = ball1.x;
	camera.y = ball1.y;
    box.draw()
    box.addImage(field);
    field.resize(FIELD_WIDTH, FIELD_HIEGHT);
    ball1.draw();
    box2.draw();
    defenders.draw();
	camera.off();
    box1.draw();
    ball1.collides(box2, goal);
}
function goal(_ball1, _box2){
    console.log("goal")
    space = false;
    camera.zoomTo(1);
}

function newDefender(){
    defenders = new Sprite(247, 900, 90, 90,'k' )
    defenders1 = new Sprite(367, 900, 90, 90,'k' )
    defenders.addImage(defender);
    defenders1.addImage(defender);
    defender.resize(120, 120);
    defender.resize(120, 120);
    defenders.vel.y = -10;
    defenders1.vel.y = -10;
    
}
/*******************************************************/
//  END OF APP
/*******************************************************/
