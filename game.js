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
var level = 0;
var score = 0;
var resetTime = 0;
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
  arrow = loadImage('images/arrow.png')
}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");
    cnv = new Canvas(SCREEN_WIDTH, SCREEN_HIEGHT);
    /** these sprites creates the boundry for the game**/
    wallFloor =  new Sprite(SCREEN_WIDTH/2,  SCREEN_HIEGHT/2+FIELD_HIEGHT/2, FIELD_WIDTH, 4, 's');
    wallTop =  new Sprite(SCREEN_WIDTH/2, SCREEN_HIEGHT/2-FIELD_HIEGHT/2, FIELD_WIDTH, 4, 's');
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
    downArrow = new Sprite(SCREEN_WIDTH/2, SCREEN_HIEGHT/2, 200, 200,'n' )
    downArrow.addImage(arrow);
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
    
    document.addEventListener("keydown", playerInput);
    function playerInput(event) {
        if(event.code === 'Enter' && screenSelector == "start"){
            screenSelector = "game" //changes to the game screen
            resetGame(); //resets the game
        } else if(event.code === 'Enter' && screenSelector == "end"){
            screenSelector = "game" //changes to the game screen
            resetGame();//resets the game
        }     
    }    
    
    document.addEventListener("keydown", function(event) { //this detects if a key has been pressed
      if (event.code === 'ArrowLeft') { //makes the ball move left or right
        ball1.vel.x = -8;
        camera.zoomTo(1);
      }
      else if (event.code === 'ArrowRight'){
        ball1.vel.x = 8;
        camera.zoomTo(1);
      }
      else if (event.code === 'ArrowUp')  {
        ball1.vel.y = -8;
       camera.zoomTo(1);
      }
      else if (event.code === 'ArrowDown')
        ball1.vel.y = 8;
        camera.zoomTo(1);
    });
    
    
    
    document.addEventListener("keyup", function(event) { //this detects if the keys aren't being pressed
    
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
/**this changes the screen**/
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
/********start screen********/
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
    text("Score goals faster to get a higher score", 50, 270);
    text("Avoid Defenders!", 50, 320);
    defenders3.x = 2900; 
    defenders3.y = 700;
/**this stops the ball from moving before the game starts**/
    ball1.x = width/2;
    ball1.y = height/2;
    ball1.vel.x = 0;
    ball1.vel.y = 0;
}

/********game screen********/
function gameScreen(){//this is the game screen
    if (level == 3){//this creates 1 new sprite after the third level
        defenders6 = new Sprite(2900, 700, 90, 90,'k' )
        defenders6.addImage(defender);
        defender.resize(120, 120);
        defendersAll.add(defenders6);
        level = level +1
    }
    if (level >= 3){//makes the new sprite always follow the ball
        defenders6.moveTo(ball1, 7)
        defenders6.rotateTowards(ball1, 0.1, 90); //makes the sprite always follow the ball
    }
/**this makes the ball move to the goal**/
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
    
    camera.on(); //turns the camera on
    if(frameCount> nextSpawn){//randomly creates new sprites
        newDefender();
        nextSpawn = frameCount + random(80,150);
    }
    defenders3.moveTo(ball1, 3)
    defenders3.rotateTowards(ball1, 0.1, 90);
/**this makes the two sprites move to between two spots on the game **/
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
    camera.x = ball1.x;//makes the camera follow the ball
	camera.y = ball1.y;
//all sprites drawn while the camera is on are drawn on the map not the camera
    box.draw()
    box.addImage(field);
    field.resize(FIELD_WIDTH, FIELD_HIEGHT);
    if(level < 1){//this makes the arrow only appear at the start of the game
        downArrow.draw();
    }
    ball1.draw();
    box1.draw();
    wallFloor.draw();
    wallTop.draw();
    wallLeft.draw();
    wallRight.draw();
    defenders.draw();
	camera.off();
//everything drawn while the is off stay on the screen while the camera moves
	textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
    ball1.collides(box1, goal);//this calls for the function for a goal
    ball1.collides(defendersAll, youDied);//this calls for the function to end game
}
/********end screen********/
function endScreen(){
    console.log("End screen")
    background("white");
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Game Over!", 50, 50);
    textSize(24);
    text("Your score was: "+score, 50, 110);
    textSize(14);
    text("Press enter to restart", 50, 150);
    defenders3.x = 2900;
    defenders3.y = 700;
    ball1.x = width/2; //stops the ball from moving
    ball1.y = height/2;
    ball1.vel.x = 0;
    ball1.vel.y = 0;
}

function youDied(_ball1, _defendersAll){
    console.log("YouDied")
    screenSelector = "end"
    defenders.removeAll(); //removes all sprites that get added
    if (level >= 3){
        defenders6.remove();
    }
    camera.zoomTo(1); //resets the zoom
}

function goal(_ball1, _box1){
    level = level +1 //adds one to levels complete
    time = millis() - resetTime //this calculates time it took to score in milliseconds
    timeInSeconds = time/1000 //converts time into secounds
    score = Math.floor(score + 10000/timeInSeconds) //this calculates the score
    console.log(defenderSpeed)
    console.log(timeInSeconds)
    console.log(millis())
    space = false;
    resetTime = millis();
    camera.zoomTo(1);
    ball1.x = width/2; //resets the ball positions
    ball1.y = height/2;
    ball1.vel.x = 0; //stops the ball from moving
    ball1.vel.y = 0;
    defenders.removeAll();
    downArrow.visible = false; //hides the arrow
    defenderSpeed = defenderSpeed +2 //increases the speed of the sprites
}

function newDefender(){ //this adds new defenders
    defenders1 = new Sprite(247, 900, 90, 90,'k' )
    defenders2 = new Sprite(367, 900, 90, 90,'k' )
    defenders1.addImage(defender);
    defenders2.addImage(defender);
    defender.resize(120, 120);
    defender.resize(120, 120);
    defenders1.vel.y = -defenderSpeed; //makes the defenders move
    defenders2.vel.y = -defenderSpeed;
    defenders.add(defenders1);
    defendersAll.add(defenders1);
    defenders.add(defenders2);
    defendersAll.add(defenders2);
}
function resetGame(){ //reset all the variables
    allSprites.visible = true;
    nextSpawn = 0;
    defenderSpeed = 4;
    level = 0;
    score = 0;
    time = 0;
    timeInSeconds = 0;
    resetTime = millis();
}
/*******************************************************/
//  END OF APP
/*******************************************************/
