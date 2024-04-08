/*******************************************************/
// P5.play: 12COMP Programming Assessment
// Programming Assessment
// Written by Mark Hazeldine
/*******************************************************/
console.log("%c game.js", "color: blue;");
const SCREEN_WIDTH = 650;
const SCREEN_HEIGHT = 550;
const FIELD_WIDTH = 2152;
const FIELD_HEIGHT = 2368;
const MINAGE = 5;
const MAXAGE = 100;
var nextSpawn = 0;
var defenderSpeed = 4;
var level = 0;
var score = 0;
var resetTime = 0;
var time = 0;
var timeInSeconds = 0;
var screenSelector = "start"; 
var defenders; //this is a group for the defenders that spawn at random times
var defendersAll; //this is for all defenders and is use for losing the game
var username;
/*******************************************************/
// preload()
// Called by P5 before setup
/*******************************************************/
function preload() {
    let space = false;
    console.log("preload: ");
    field = loadImage('images/field.png');//loads the images
    ball = loadImage('images/football.png');
    defender = loadImage('images/defender.png');
    arrow = loadImage('images/arrow.png')
}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");
    cnv = new Canvas(SCREEN_WIDTH, SCREEN_HEIGHT);//sets the size for the game
    /** these sprites creates the boundry for the game**/
    wallFloor =  new Sprite(SCREEN_WIDTH/2, SCREEN_HEIGHT/2+FIELD_HEIGHT/2, FIELD_WIDTH, 4, 's');
    wallTop =  new Sprite(SCREEN_WIDTH/2, SCREEN_HEIGHT/2-FIELD_HEIGHT/2, FIELD_WIDTH, 4, 's');
    wallLeft =  new Sprite(SCREEN_WIDTH/2-FIELD_WIDTH/2,  SCREEN_HEIGHT/2, 4, FIELD_HEIGHT, 's');
    wallRight =  new Sprite(SCREEN_WIDTH/2+FIELD_WIDTH/2,  SCREEN_HEIGHT/2, 4, FIELD_HEIGHT, 's');
    //changes the colour of the walls
    wallFloor.color = color("black");
    wallTop.color = color("black");
    wallLeft.color = color("black");
    wallRight.color = color("black");
    defenders = new Group(); //creates a group for the randomly spawning defeners
    defendersAll = new Group(); //this creates a group for all defenders
    box = new Sprite(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 4304, 4736, 'n');//creates the background sprite
    box.addImage(field);//adds an image to the sprite
    field.resize(FIELD_WIDTH, FIELD_HEIGHT);
    ball1 = new Sprite(width/2, height/2, 40, 'd');//creates ball
    ball1.addImage(ball);//adds image to the ball
    ball.resize(40, 40);
    text(score, 50, 50);//displays the score on the screen
    downArrow = new Sprite(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 200, 200,'n' )//creates sprite to show where to go
    downArrow.addImage(arrow);//adds image
    box1 = new Sprite(307, 1355, 150, 30,'k' )//creates goal
    box1.color = 'white';//changes colour to white
    defenders3 = new Sprite(SCREEN_WIDTH/2+FIELD_WIDTH/2, SCREEN_HEIGHT/2+FIELD_HEIGHT/2, 90, 90,'k' ) //creates defender
    defenders3.addImage(defender);// adds image
    defender.resize(120, 120);
    defenders4 = new Sprite(100, 825, 90, 90,'k' )//adds defender
    defenders4.addImage(defender);// adds image
    defender.resize(120, 120);
    defenders4.rotation = -45;//changes the way its facing
    defenders5 = new Sprite(0, 875, 90, 90,'k' )//adds defender
    defenders5.addImage(defender);//adds image
    defender.resize(120, 120);
    defenders5.rotation = -45;//changes the way its facing
    defenders5.moveTo(-475, 1250, defenderSpeed)//makes it move to a diferent position
    defendersAll.add(defenders3);//adds sprites to groups
    defendersAll.add(defenders4);
    defendersAll.add(defenders5);
    
    document.addEventListener("keydown", playerInput);// this looks to see if a key is pressed
    function playerInput(event) {
        if(event.code === 'Enter' && screenSelector == "start"){
            getValue() //calls on the function that gets usernames and age
            screenSelector = "game" //changes to the game screen
            resetGame(); //resets the game
        } else if(event.code === 'Enter' && screenSelector == "end"){
            screenSelector = "game" //changes to the game screen
            resetGame();//resets the game
        }     
    }    
    
    document.addEventListener("keydown", function(event) { //this detects if a key has been pressed
        if (event.code === 'ArrowLeft') { //makes the ball move left or right
            ball1.vel.x = -8; // makes the ball move left
            camera.zoomTo(1); //sets the zoom to 1 when the ball is moving
            space = false; //stops the ball moving to the goal if key is pressed
        }
        else if (event.code === 'ArrowRight'){
            ball1.vel.x = 8;
            camera.zoomTo(1);
            space = false;
        }
        else if (event.code === 'ArrowUp')  {
            ball1.vel.y = -8;
            camera.zoomTo(1);
            space = false;
        }
        else if (event.code === 'ArrowDown'){
            ball1.vel.y = 8;
            camera.zoomTo(1);
            space = false;
        }
    });
    
    
    
    document.addEventListener("keyup", function(event) { //this detects if the keys aren't being pressed
        if (event.code === 'ArrowLeft' && space == false) { //this detects if the key is up and the space is false meaning the ball isn't moving to wards the goal
            ball1.vel.x = 0; //stops the ball from moving left
            camera.zoomTo(1); //sets the zoom to 1
        }
        else if (event.code === 'ArrowRight' && space == false){
            ball1.vel.x = 0;
            camera.zoomTo(1);
        }
        else if (event.code === 'ArrowUp' && space == false) { 
            ball1.vel.y = 0;
            camera.zoomTo(1);
        }
        else if (event.code === 'ArrowDown' && space == false){
            ball1.vel.y = 0;
            camera.zoomTo(1);
        }
        
    });
    
}

/*******************************************************/
// draw()     
/*******************************************************/
function draw() {
/**this changes the screen**/
    if(screenSelector == "game"){
        gameScreen();
    }else if(screenSelector == "end"){
        endScreen();
    }else if(screenSelector == "start"){
        startScreen();
    }else{
        text("wrong screen - you shouldnt get here", 50, 50);
        console.log("wrong screen - you shouldnt get here")
    }
}

function getValue() { 
    // Gets the input element by its ID 
    let inputField = document.getElementById("username"); 
    let inputField2 = document.getElementById("age");
    var regExp = /[0-9]/; // makes sure only numbers were inputed
    // Get the value of the input field 
    username = inputField.value;
    let age = inputField2.value; 
    while (username == null || username == "") { // if the input is invalid it makes you put in a valid input
        username = prompt("Invalid what is your username?")
        if (username == null) {// if user clicks cancel it stops the progam
          screenSelector = "start";
          return;//ends the code
        }
    }
    while (age == null || !regExp.test(age) || age < MINAGE || age > MAXAGE || isNaN(age) || age % 1 != 0){//this is for if the age is not an number or isn't in the age range
        age = prompt("Invalid you must put an age between " + MINAGE + " and " + MAXAGE)
        if (age == null) {// if user clicks cancel it stops the progam
            screenSelector = "start";
            return;//ends the code
        } else if (age < MINAGE) {
            alert("You are to young to play");
        } else if (age > MAXAGE) {
            alert("You are to old to play");
            screenSelector = "start";
            return;//ends the code
        }
    }
    // Display the value in an alert 
    alert("Your username is " + username + " and you are old enough to play"); 
} 

/********start screen********/
function startScreen(){ 
    console.log("Start screen")
    background("#00d400");//changes background colour
    allSprites.visible = false;//hides all sprites
    textSize(40);//changes size of the text
    fill(255);
    stroke(0);
    strokeWeight(4);//changes thickness of the text
    text("Kick Off Kings : Stadium Strikers", 50, 50);//displays text
    textSize(24);
    text("Press enter to start", 50, 130);
    text("Arrow keys to move", 50, 180);
    text("Space to Shoot", 50, 220);
    text("Score goals faster to get a higher score", 50, 270);
    text("Avoid Defenders!", 50, 320);
    defenders3.x = SCREEN_WIDTH/2 + FIELD_WIDTH/2; //this keeps the sprite in the same place till the game starts
    defenders3.y = SCREEN_HEIGHT/2 + FIELD_HEIGHT/2;
    /**this stops the ball from moving before the game starts**/
    ball1.x = width/2;
    ball1.y = height/2;
    ball1.vel.x = 0;
    ball1.vel.y = 0;
}

/********game screen********/
function gameScreen(){//this is the game screen
    if (level == 4){//this creates 1 new sprite after the third level
        defenders6 = new Sprite(SCREEN_WIDTH/2 + FIELD_WIDTH/2, SCREEN_HEIGHT/2 + FIELD_HEIGHT/2, 90, 90,'k' )
        defenders6.addImage(defender);
        defender.resize(120, 120);
        defendersAll.add(defenders6);
        level = level +1
    }
    if (level >= 4){//makes the new sprite always follow the ball
        defenders6.moveTo(ball1, 6)
        defenders6.rotateTowards(ball1, 0.1, 90); //makes the sprite always follow the ball
    }
    /**this makes the ball move to the goal**/
    let space; 
    if (kb.pressing('space')){
        space = true;
    }
    if (space == true){
        ball1.moveTo(box1, 20)
        camera.zoomTo(0.5);//makes the camera zoom out
    }
    if (space == false){
        camera.zoomTo(1); // zooms in
    }
    
    camera.on(); //turns the camera on
    if(frameCount > nextSpawn){//randomly creates new sprites
        newDefender(); //calls on the function that creates a new defender
        nextSpawn = frameCount + random(80,150);// this creates a random number plus the frame count
    }
    defenders3.moveTo(ball1, 3)//makes the defender move towards the ball
    defenders3.rotateTowards(ball1, 0.1, 90);//makes the defender always face the ball
    /**this makes the two sprites move to between two spots on the game **/
    if (defenders4.x == -475 && defenders4.y == 1250){
        defenders4.moveTo(100, 825, defenderSpeed)
    }  else if (defenders4.x == 100 && defenders4.y == 825){
        defenders4.moveTo(-475, 1250, defenderSpeed)
    }
    if (defenders5.x == -475 && defenders5.y == 1250){
        defenders5.moveTo(100, 825, defenderSpeed)
    }  else if (defenders5.x == 100 && defenders5.y == 825){
        defenders5.moveTo(-475, 1250, defenderSpeed)
    }
    background('green');
    camera.x = ball1.x;//makes the camera follow the ball
	camera.y = ball1.y;
    //all sprites drawn while the camera is on are drawn on the map not the camera
    box.draw()
    box.addImage(field);
    field.resize(FIELD_WIDTH, FIELD_HEIGHT);
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
	camera.off();//turns off the camera
    //everything drawn while the is off stay on the screen while the camera moves
	textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
    ball1.collides(box1, goal);//this calls for the function for a goal
    ball1.collides(defendersAll, youDied);//this calls for the function to end game
    for (i = 0; i < defenders.length; i++) {
        if(defenders[i].y <= SCREEN_HEIGHT/2-FIELD_HEIGHT/2){//checks to see if the defender is outside the map
            defenders[i].remove(); // this removes the defender
        }
    }
}
/********end screen********/
function endScreen(){
    console.log("End screen")
    background("white");//changes backgrond colour to white
    allSprites.visible = false;//hides all sprites
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Game Over!", 50, 50);
    textSize(24);
    text(username + " your score was: "+score, 50, 110);// this displays the score after the game
    textSize(14);
    text("Press enter to restart", 50, 150);
    defenders3.x = 2900;
    defenders3.y = 700;
    ball1.x = width/2; //stops the ball from moving
    ball1.y = height/2;
    defenders3.x = SCREEN_WIDTH/2+FIELD_WIDTH/2; //this keeps the sprite in the same place till the game starts again
    defenders3.y = SCREEN_HEIGHT/2+FIELD_HEIGHT/2;
}

function youDied(_ball1, _defendersAll){ // this is the function for ending the game
    console.log("YouDied")
    screenSelector = "end" //changes it to the end screen
    defenders.removeAll(); //removes all sprites that get added
    if (level >= 4){
        defenders6.remove();//this removes the sprite if it has been added
    }
    camera.zoomTo(1); //resets the zoom
}

function goal(_ball1, _box1){ // this function is for if a goal has been scored
    level = level +1 //adds one to levels complete
    time = millis() - resetTime //this calculates time it took to score in milliseconds
    timeInSeconds = time/1000 //converts time into secounds
    score = Math.floor(score + 10000/timeInSeconds) //this calculates the score
    console.log(defenderSpeed)
    console.log(timeInSeconds)
    console.log(millis())
    space = false;
    resetTime = millis();//this calculates the time since the game started
    camera.zoomTo(1);
    ball1.x = width/2; //resets the ball positions
    ball1.y = height/2;
    ball1.vel.x = 0; //stops the ball from moving
    ball1.vel.y = 0;
    defenders.removeAll();//removes some of the defenders
    downArrow.visible = false; //hides the arrow
    defenderSpeed = defenderSpeed +2 //increases the speed of the sprites
}

function newDefender(){ //this function adds new defenders
    defenders1 = new Sprite(247, 900, 90, 90,'k' )//this creates the sprite
    defenders2 = new Sprite(367, 900, 90, 90,'k' )
    defenders1.addImage(defender);// this adds the image to it
    defenders2.addImage(defender);
    defender.resize(120, 120);
    defender.resize(120, 120);
    defenders1.vel.y = -defenderSpeed; //makes the defenders move at a speed depending on how many goals were scored
    defenders2.vel.y = -defenderSpeed;
    defenders.add(defenders1); //this adds them to groups
    defendersAll.add(defenders1);
    defenders.add(defenders2);
    defendersAll.add(defenders2);
}
function resetGame(){ //this function resets all the variables
    allSprites.visible = true;
    nextSpawn = 0;
    defenderSpeed = 4;
    level = 0;
    score = 0;
    time = 0;
    timeInSeconds = 0;
    resetTime = millis();
}
