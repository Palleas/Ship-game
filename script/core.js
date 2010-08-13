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
  
  options = {};
  
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
  
  function keyDownHandler(event)
  {
    if (actionKeys.indexOf(event.keyCode) > -1)
      event.preventDefault();
    else
      return;
      
    switch (event.keyCode)
    {
      case Keys.ACCELERATE:
        if (!hero.accelerating)
        {
          hero.accelerating = true;
        }
        break;
        
      case Keys.BRAKE:
        if (!hero.braking)
        {
          hero.braking = true;
        }
        break;

      case Keys.TURN_LEFT:
        if (!hero.turningLeft)
        {
          hero.turningLeft = true;
        }
        break;

      case Keys.TURN_RIGHT:
        if (!hero.turningRight)
        {
          hero.turningRight = true;
        }
        break;

      case Keys.FIRE:
        if (!hero.firing)
        {
          hero.firing = true;
        }
        break;
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
        if (hero.accelerating)
        {
          hero.accelerating = false;
        }
        break;
        
      case Keys.BRAKE:
        if (hero.braking)
        {
          hero.braking = false;
        }
        break;

      case Keys.TURN_LEFT:
        if (hero.turningLeft)
        {
          hero.turningLeft = false;
        }
        break;

      case Keys.TURN_RIGHT:
        if (hero.turningRight)
        {
          hero.turningRight = false;
        }
        break;

      case Keys.FIRE:
        if (!hero.firing)
        {
          hero.firing = true;
        }
        break;
    }
  }
  
  var repaint = function()
  {
    clear();
    var c = stage.getContext("2d");
    hero.draw(c);
  }
  
  var clear = function()
  {
    stage.getContext("2d").clearRect(0, 0, stage.width, stage.height);
  }
  
  var refresh = function()
  {
    // hero's behavior
    if (hero.firing) bullets.push(hero.fire());
    if (hero.accelerating) hero.accelerate();
    if (hero.braking) hero.brake();
    if (hero.turningLeft) hero.turnLeft();
    if (hero.turningRight) hero.turnRight();
    
    // repaint
    repaint();
  }
  
  this.init = function()
  {
    paintBackground();
    
    hero = new Ship();
    hero.position.x = stage.width / 2;
    hero.position.y = stage.height / 2;
    hero.image = new Image();
    hero.image.src = "assets/images/ship.png";
    hero.image.addEventListener("load", function()
    {
      document.addEventListener("keyup", keyUpHandler, false);
      document.addEventListener("keydown", keyDownHandler, false);
    });
    
    setInterval(refresh, 1000 / 30)
  }
}

var Bullet = function(position, rotation)
{
  this.position = position;
  this.rotation = rotation;
  
  var xAcc, yAcc;
  xAcc = Math.sin((rotation * Math.PI) / 180) * 10;
  yAcc = -Math.cos((rotation * Math.PI) / 180) * 10;
  
  this.updateCoordinates = function()
  {
    this.position.x += xAcc;
    this.position.y += yAcc;
  }
  
  this.draw = function(context)
  {
    console.info(this);
  }
}

var Ship = function()
{
  this.speed = 0;
  this.life = 0;
  this.rotation = 0;
  this.position = new Point(0, 0);
  
  this.firing = false;
  this.accelerating = false;
  this.braking = false;
  this.turningLeft = false;
  this.turningRight = false;
  
  this.image;
  
  this.accelerate = function() 
  {
    var newSpeed = this.speed + 5;
    this.speed = newSpeed <= 20 ? newSpeed : 0;
    this.updateCoordinates();
  };
  
  this.brake = function() 
  {
    var newSpeed = this.speed - 2;
    this.speed = newSpeed > 0 ? newSpeed : 0;
    
    this.updateCoordinates();
  };

  this.turn = function(direction) { this.rotation += direction == "right" ? 5 : -5; };
  this.turnLeft = function() { this.turn("left"); };
  this.turnRight = function() { this.turn("right"); };
  
  this.fire = function() {
    var b = new Bullet(this.position, this.rotation);
    return b;
  };
  
  this.draw = function(c)
  {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate((this.rotation * Math.PI) / 180);
    c.drawImage(this.image, this.image.width * -0.5, this.image.height * -0.5);
    c.restore();
  }
}
Ship.prototype.updateCoordinates = function()
{
  var speed, xAcc, yAcc;
}

Universe.init();



