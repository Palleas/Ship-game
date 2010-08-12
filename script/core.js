var Keys = {
  ACCELERATE : 38,
  BRAKE : 40, 
  TURN_LEFT : 37,
  TURN_RIGHT : 39,
  FIRE : 32
}

Universe = new function()
{
  this.ANSWER = 42; // ha ! 
  
  var stage = document.getElementById("stage"), 
    background = document.getElementById("background"),
    hero, enemies = [], bullets = [], clocks = {},
    actionKeys = [Keys.ACCELERATE, Keys.BRAKE, Keys.TURN_RIGHT, Keys.TURN_LEFT, Keys.FIRE];
  
  function paintBackground()
  {
    var c, index, posX, posY;
    // fill background w/ black

    c = background.getContext("2d");
    c.save();
    c.fillStyle = "#000";
    c.rect(0, 0, background.width, background.height);
    c.fill();
    c.restore();
    
    function drawStar(x, y)
    {
      c.strokeStyle = "rgba(255, 255, 255, "+ Math.random() +")";
      c.save();
      c.translate(x, y);
      c.rotate(Math.random() * Math.PI);
      c.moveTo(-2, 0);
      c.lineTo(2, 0);
      c.moveTo(0, -2);
      c.lineTo(0, 2);
      c.stroke();
      c.restore();
    }
    
    // add some stars
    for (index = 0; index < Math.random() * 200; index++)
    {
      drawStar(Math.random() * background.width, Math.random() * background.height);
    }
  
  }
  
  function keyUpHandler(event)
  {
    if (actionKeys.indexOf(event.keyCode) > -1)
      event.preventDefault();
    else
      return;
      
    switch (event.keyCode)
    {
      case Keys.ACCELERATE:
        console.info("Accelerate");
        break;
        
      case Keys.BRAKE:
        console.info("brake");
        break;

      case Keys.TURN_LEFT:
        console.info("turn left");
        break;

      case Keys.TURN_RIGHT:
        console.info("turn right");
        break;

      case Keys.FIRE:
        break;
    }
  }
  
  function keyDownHandler(event)
  {
    if (actionKeys.indexOf(event.keyCode) > -1)
      event.preventDefault();
    else
      return;
      
    switch (event.keyCode)
    {
      case Keys.ACCELERATE:
        console.info("Accelerate");
        break;
        
      case Keys.BRAKE:
        console.info("brake");
        break;

      case Keys.TURN_LEFT:
        console.info("turn left");
        break;

      case Keys.TURN_RIGHT:
        console.info("turn right");
        break;

      case Keys.FIRE:
        break;
    }
  }
  
  this.init = function()
  {
    paintBackground();
    
    hero = new Ship();
    hero.position.x = stage.width / 2;
    hero.position.y = stage.height / 2;
    
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("keydown", keyDownHandler, false);
  }
}

var Bullet = function()
{
  
}

var Ship = function()
{
  this.life = 0;
  this.rotation = 15;
  
  this.position = new Point(0, 0);
  
  this.accelerate = function() 
  {
    this.updateCoordinates();
  };
  
  this.brake = function() 
  {
    this.updateCoordinates();
  };

  this.turn = function(direction) { this.rotation += direction == "right" ? 5 : -5; };
  this.turnLeft = function() { this.turn("left"); };
  this.turnRight = function() { this.turn("right"); };
  
  this.fire = function() {
    
  };
  
  this.draw = function(context)
  {
    
  }
}
Ship.prototype.updateCoordinates = function()
{
  var speed, xAcc, yAcc;
}

Universe.init();



