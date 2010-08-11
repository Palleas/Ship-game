var Keys = {
  ACCELERATE : 38,
  BRAKE : 40, 
  TURN_LEFT : 37,
  TURN_RIGHT : 39,
  FIRE : 32
}

Universe = new function()
{
  var stage = document.getElementById("stage"), 
    hero, enemies = [], bullets = [], clocks = {},
    actionKeys = [Keys.ACCELERATE, Keys.BRAKE, Keys.TURN_RIGHT, Keys.TURN_LEFT, Keys.FIRE];
  
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



