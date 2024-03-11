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
/*******************************************************/
// preload()
// Called by P5 before setup
/*******************************************************/
function preload() {
  let space = false;
  console.log("preload: ");
  console.log("space")
  field = loadImage('images/field.png');
  ball = loadImage('images/football.png');
}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
  console.log("setup: ");
  cnv = new Canvas(SCREEN_WIDTH, SCREEN_HIEGHT);
  box = new Sprite(SCREEN_WIDTH/2, SCREEN_HIEGHT/2, 4304, 4736, 'n');
  box.addImage(field);
  field.resize(2152, 2368);
  ball1 = new Sprite(width/2, height/2, 40, 'd');
  ball1.addImage(ball);
  ball.resize(40, 40);
  box1 = new Sprite(150, 20, 300, 30,'n' )
  box2 = new Sprite(929, 2568, 300, 30,'n' )
  document.addEventListener("keydown", function(event) {
     if (event.code === 'ArrowLeft') {
        ball1.vel.x = -6;
      }
      else if (event.code === 'ArrowRight')
        ball1.vel.x = 6;
      else if (event.code === 'ArrowUp')  
        ball1.vel.y = -6;
      else if (event.code === 'ArrowDown')
        ball1.vel.y = 6;
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
    background('green');
    camera.x = ball1.x;
	camera.y = ball1.y;
    box.draw()
    box.addImage(field);
    field.resize(2152, 2368);
    ball1.draw();
    box2.draw();
	camera.off();
    box1.draw();
    console.log(ball1.x)
}

/*******************************************************/
//  END OF APP
/*******************************************************/
