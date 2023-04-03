let cars = [];
let frogPos;
let state = 0;
let timer = 0;
let start, win, lose;
let bat, Baseball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  rectMode(CENTER);
  start = loadImage("Assets/StartingScreen.jpg");
  win = loadImage("Assets/WinningScreen.png");
  lose = loadImage("Assets/LosingScreen.jpg");
  bat = loadImage("Assets/Bat.jpg");
  Baseball = loadImage("Assets/Baseball.png");
  // Spawn objects

  for (let i = 0; i < 5; i++) {
    cars.push(new Car());
  }

  // initialize the "frog position" vector
  frogPos = createVector(width / 2, height - 80);
}

function draw() {
  
  switch(state){
      
    case 0 :
      //start screen
      background("white");
      image(start,width/2,height/2);
      fill("black");
      textSize(48);
      text("Homerun Derby! \n Click to Start.", 300, 500);
      break;
      
      case 1:
      //game screen
      game();
      timer++ ;
      if (timer > 10*70) {
        timer = 0;
        state = 3;
        
      }
      break;
      
      case 2: 
      //win screen
      background("white");
      image(win,width/2,height/2);
      fill("black");
      textSize(48);
      text("Congratulations! \n You won the Homerun Derby", 300, 500);
      break;
      
      case 3: 
      //lose screen
      background("black");
      fill("white");
      textSize(48);
      image(lose,width/2,height/2);
      text("Maybe next year?", 200, 500);
      break; 
  }
  
}


function mouseReleased() {
  switch(state) {
    case 0: 
      state = 1; //go to game
      break;
      
      case 2: //win state
      resetTheGame();
      state = 0;
      break;
      
      case 3: //lose state
      resetTheGame();
      state = 0;
      break;
  }
}


function game() {
  background("white");

  // operate on every car
  for (let i = 0; i < cars.length; i++) {
    cars[i].display();
    cars[i].move();

    //collision detection
    if (cars[i].pos.dist(frogPos) < 30) {
      cars.splice(i, 1);
    }
  }
  
  if (cars.length <= 0) {
    timer = 0;
    state = 2
  }

  // add a "frog"
  fill("green");
  //ellipse(frogPos.x, frogPos.y, 50, 50);
  image(bat, frogPos.x, frogPos.y, 50, 50);
  checkForKeys();
}

function resetTheGame() {
  cars = [] ;
  timer = 0;
   for (let i = 0; i < 10; i++) {
    cars.push(new Car());
  }
}

function checkForKeys() {
  if (keyIsDown(LEFT_ARROW)) frogPos.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) frogPos.x += 5;
  if (keyIsDown(UP_ARROW)) frogPos.y -= 5;
  if (keyIsDown(DOWN_ARROW)) frogPos.y += 5;
}

class Car {
  // constructor and attributes
  constructor() {
    this.pos = createVector(100, 100); // initialize your attributes here
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.o = random(100);
    this.size = random(48, 128);
  }
  // methods

  display() {
    // this can be text, images, or shapes
    fill(this.r, this.g, this.b, this.o);
    //rect(this.pos.x, this.pos.y, this.size, 25);
    image(Baseball, this.pos.x, this.pos.y);
  }

  move() {
    this.pos.add(this.velocity);
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}

