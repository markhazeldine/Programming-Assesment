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
var defenderSpeed = 4;
var goals = 0;
var level = 0;
var score = 0;
var time = 0;
var timeInSeconds = 0;
var screenSelector = "start"; 
var defenders;
var defendersAll;
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
    wallFloor =  new Sprite(SCREEN_WIDTH/2,  SCREEN_HIEGHT/2+FIELD_HIEGHT/2, FIELD_WIDTH, 4, 's');
    wallTop =  new Sprite(SCREEN_WIDTH/2,  SCREEN_HIEGHT/2-FIELD_HIEGHT/2, FIELD_WIDTH, 4, 's');
    wallLeft =  new Sprite(SCREEN_WIDTH/2-FIELD_WIDTH/2,  SCREEN_HIEGHT/2, 4, FIELD_HIEGHT, 's');
    wallRight =  new Sprite(SCREEN_WIDTH/2+FIELD_WIDTH/2,  SCREEN_HIEGHT/2, 4, FIELD_HIEGHT, 's');
    wallFloor.color = color("black");
    wallTop.color = color("black");
    wallLeft.color = color("black");
    wallRight.color = color("black");
    defenders = new Group();
    defendersAll = new Group();
    box = new Sprite(SCREEN_WIDTH/2, SCREEN_HIEGHT/2, 4304, 4736, 'n');
    box.addImage(field);
    field.resize(FIELD_WIDTH, FIELD_HIEGHT);
    ball1 = new Sprite(width/2, height/2, 40, 'd');
    ball1.addImage(ball);
    ball.resize(40, 40);
    text(score, 50, 50);
    box1 = new Sprite(307, 1355, 150, 30,'k' )
    box1.color = 'white';
    defenders3 = new Sprite(2900, 700, 90, 90,'k' )
    defenders3.addImage(defender);
    defender.resize(120, 120);
    defenders4 = new Sprite(100, 825, 90, 90,'k' )
    defenders4.addImage(defender);
    defender.resize(120, 120);
    defenders4.rotation = -45;
    defenders5 = new Sprite(0, 875, 90, 90,'k' )
    defenders5.addImage(defender);
    defender.resize(120, 120);
    defenders5.rotation = -45;
    defenders5.moveTo(-475, 1250, defenderSpeed)
    defendersAll.add(defenders3);
    defendersAll.add(defenders4);
    defendersAll.add(defenders5);
    
    document.addEventListener("keydown", playerInput); //needs fixing so enter starts it
    function playerInput(event) {
        if(screenSelector == "start"||screenSelector == "end"){
            screenSelector = "game" 
            resetGame();
        }    
    }    
    
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
    if(screenSelector=="game"){
        gameScreen();
    }else if(screenSelector=="end"){
        endScreen();
    }else if(screenSelector=="start"){
        startScreen();
    }else{
        text("wrong screen - you shouldnt get here", 50, 50);
        console.log("wrong screen - you shouldnt get here")
    }
}
function startScreen(){
    console.log("Start screen")
    background("#00d400");
    allSprites.visible = false;
    textSize(40);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Kick Off Kings : Stadium Strikers", 50, 50);
    textSize(24);
    text("Press enter to start", 50, 130);
    text("Arrow keys to move", 50, 180);
    text("Space to Shoot", 50, 220);
    text("Avoid Defenders!", 50, 270);
}

function gameScreen(){
    if (level == 3){
        defenders6 = new Sprite(2900, 700, 90, 90,'k' )
        defenders6.addImage(defender);
        defender.resize(120, 120);
        defendersAll.add(defenders6);
        level = level +1
    }
    if (level >= 3){
        defenders6.moveTo(ball1, 6)
        defenders6.rotateTowards(ball1, 0.1, 90);
    }
    let space; 
    if (kb.pressing('space')){
         space = true;
    }
    if (space == true){
        ball1.moveTo(box1, 20)
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
    defenders3.moveTo(ball1, 3)
    defenders3.rotateTowards(ball1, 0.1, 90);
   if (defenders4.x == -475 && defenders4.y== 1250){
        defenders4.moveTo(100, 825, defenderSpeed)
    }  else if (defenders4.x == 100 && defenders4.y== 825){
        defenders4.moveTo(-475, 1250, defenderSpeed)
    }
    if (defenders5.x == -475 && defenders5.y== 1250){
        defenders5.moveTo(100, 825, defenderSpeed)
    }  else if (defenders5.x == 100 && defenders5.y== 825){
        defenders5.moveTo(-475, 1250, defenderSpeed)
    }
    background('green');
    camera.x = ball1.x;
	camera.y = ball1.y;
    box.draw()
    box.addImage(field);
    field.resize(FIELD_WIDTH, FIELD_HIEGHT);
    ball1.draw();
    box1.draw();
    wallFloor.draw();
    wallTop.draw();
    wallLeft.draw();
    wallRight.draw();
    defenders.draw();
	camera.off();
	textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
    ball1.collides(box1, goal);
    ball1.collides(defendersAll, youDied);
}
function endScreen(){
    console.log("End screen")
    background("white");
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("You died!", 50, 50);
    textSize(24);
    text("your score was: "+score, 50, 110);
    textSize(14);
    text("Press enter to restart", 50, 150);
}

function youDied(_ball1, _defendersAll){
    console.log("YouDied")
    screenSelector = "end"
    defenders.removeAll();
    if (level >= 3){
        defenders6.remove();
    }
    defenders3.x = 2900;
    defenders3.y = 700;
    ball1.x = width/2;
    ball1.y = height/2;
    ball1.vel.x = 0;
    ball1.vel.y = 0;
    camera.zoomTo(1);
    
}

function goal(_ball1, _box1){
    goals = goals +1
    level = level +1
    time = millis() - time
    timeInSeconds = time/1000
    score = Math.floor(score + 10000/timeInSeconds)
    console.log(goals)
    console.log(defenderSpeed)
    console.log(timeInSeconds)
    console.log(millis())
    space = false;
    camera.zoomTo(1);
    ball1.x = width/2;
    ball1.y = height/2;
    ball1.vel.x = 0;
    ball1.vel.y = 0;
    defenders.removeAll();
    defenderSpeed = defenderSpeed +2
}

function newDefender(){
    defenders1 = new Sprite(247, 900, 90, 90,'k' )
    defenders2 = new Sprite(367, 900, 90, 90,'k' )
    defenders1.addImage(defender);
    defenders2.addImage(defender);
    defender.resize(120, 120);
    defender.resize(120, 120);
    defenders1.vel.y = -defenderSpeed;
    defenders2.vel.y = -defenderSpeed;
    defenders.add(defenders1);
    defendersAll.add(defenders1);
    defenders.add(defenders2);
    defendersAll.add(defenders2);
}
function resetGame(){
    allSprites.visible = true;
    nextSpawn = 0;
    defenderSpeed = 4;
    goals = 0;
    level = 0;
    score = 0;
    time = 0;
    timeInSeconds = 0;
}
/*******************************************************/
//  END OF APP
/*******************************************************/
