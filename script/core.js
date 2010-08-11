var Keys = {
  ACCELERATE : 80,
  BRAKE : 40, 
  TURN_LEFT : 37,
  TURN_RIGHT : 39,
  FIRE : 32
}

Universe = new function()
{
  var stage = document.getElementById("stage"), 
    hero, enemies, bullets, clocks;
  
  this.init = function()
  {
    
    hero = new Ship();
    hero.position.x = stage.width / 2;
    hero.position.y = stage.height / 2;
    console.info(hero);
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



