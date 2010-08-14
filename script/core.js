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
  
  function addEnemy()
  {
    var p, e;
    
    p = new Point(Math.floor(Math.random() * stage.width),
      Math.floor(Math.random() * stage.height));

    e = new Enemy(1, p, Math.random() * Math.PI);

    enemies.push(e);
    
    setTimeout(addEnemy, Math.random() * 1500);
  }
  
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
        if (hero.firing)
        {
          hero.firing = false;
        }
        break;
    }
  }
  
  function isOutOfStage(i)
  {
    if (!i.position)
      return false;
      
    return i.position.x < 0 || i.position.x > stage.width || i.position.y < 0 || i.position.y > stage.height;
  }
  
  var clear = function()
  {
    stage.getContext("2d").clearRect(0, 0, stage.width, stage.height);
  }
  
  var refresh = function()
  {
    clear();
    var i, j, b, e, c = stage.getContext("2d");
    
    // hero's behavior
    if (hero.firing && hero.canShoot()) bullets.push(hero.fire());
    if (hero.accelerating) hero.accelerate();
    if (hero.braking) hero.brake();
    if (hero.turningLeft) hero.turnLeft();
    if (hero.turningRight) hero.turnRight();
    hero.updateCoordinates();
    hero.slowDown(0.96);
    hero.draw(c);
    
    // bullets
    for (i = 0; i < bullets.length; i++)
    {
      b = bullets[i];
      b.updateCoordinates();
      
      if (b.position.x < 0 || b.position.x > stage.width
        || b.position.y < 0 || b.position.y > stage.height)
      {
        bullets.splice(i, 1);
        continue;
      }
      
      b.draw(c);
    }
    
    // enemies
    for (i = 0; i < enemies.length; i++)
    {
      e = enemies[i];
      e.updateCoordinates();
      
      if(isOutOfStage(e))
      {
        enemies.splice(i, 1);
        continue;
      }
      
      for (j = 0; j < bullets.length; j++)
      {
        b = bullets[j];

        if (e.destroyed)
        {
          enemies.splice(j, 1);
          continue;
        }
        else if (b.position.x > e.position.x && b.position.x < (e.position.x + 20)
        && b.position.y > e.position.y && b.position.y < (e.position.y + 20)
        && !e.destroyCount)
        {
          e.destroy();
        } 
      }
      
      e.draw(c);
    }
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
    
    setInterval(refresh, 1000 / 60);
    setTimeout(addEnemy, Math.random() * 1500);
  }
}

var Bullet = function(position, rotation)
{
  this.position = new Point(position.x, position.y);
  this.rotation = rotation;
  
  var xAcc, yAcc;
  xAcc = Math.sin((rotation * Math.PI) / 180) * 15;
  yAcc = -Math.cos((rotation * Math.PI) / 180) * 15;
  
  this.updateCoordinates = function()
  {
    this.position.x += xAcc;
    this.position.y += yAcc;
  }
  
  this.draw = function(c)
  {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate((this.rotation * Math.PI) / 180);
    c.fillStyle = "rgba(0, 255, 0, 1)";
    
    c.beginPath();
    c.rect(-2, 0, 4, 10);
    c.fill();
    c.restore();
  }
}

var Enemy = function(level, position, rotation)
{
  this.life = level * 5;
  this.position = position;
  this.rotation = rotation;
  
  this.destroyCount = 0;
  this.destroyed = false;

  var xAcc, yAcc;
  xAcc = Math.sin(this.rotation) * (2 * level);
  yAcc = -Math.cos(this.rotation) * (2 * level);

  this.updateCoordinates = function()
  {
    this.position.x += xAcc;
    this.position.y += yAcc;
  }
  
  this.destroy = function()
  {
    this.destroyCount = 30;
  }
  
  this.draw = function(c)
  {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.rotation);
    
    if (this.destroyCount == 0 && !this.destroyed)
    {
      c.beginPath();
      c.fillStyle = 'rgba(0, 0, 255, 1)';
      c.arc(0, 0, 10, 0, Math.PI * 2, false);
      c.fill();
    }
    else
    {
      this.destroyCount--;
      if (this.destroyCount <= 0)
      {
        this.destroyed = true;
      }
      else
      {
        c.beginPath();
        c.strokeStyle = 'rgba(0, 255, 0, ' + Math.random() + ')';
        c.moveTo(0, -20);
        c.lineTo(-5, -5);
        c.lineTo(-20, 0);
        c.lineTo(-5, 5);
        c.lineTo(0, 20);
        c.lineTo(5, 5);
        c.lineTo(20, 0);
        c.lineTo(5, -5);
        c.lineTo(0, -20);
        c.stroke();
      }
    }
    
    c.restore();
  }
}

var Ship = function()
{
  this.speed = 0;
  this.life = 0;
  this.rotation = 0;
  this.position = new Point(0, 0);
  this.lastShoot = 0;
  
  this.firing = false;
  this.accelerating = false;
  this.braking = false;
  this.turningLeft = false;
  this.turningRight = false;
  
  this.image = null;
  
  this.accelerate = function() 
  {
    var newSpeed = this.speed + 2;
    this.speed = newSpeed <= 10 ? newSpeed : 10;
  };
  
  this.slowDown = function(factor)
  {
    this.speed *= factor;
  }
  
  this.brake = function() 
  {
    var newSpeed = this.speed - 2;
    this.speed = newSpeed > 0 ? newSpeed : 0;
  };

  this.turn = function(direction) { this.rotation += direction == "right" ? 8 : -8; };
  this.turnLeft = function() { this.turn("left"); };
  this.turnRight = function() { this.turn("right"); };
  
  this.canShoot = function()
  {
    var d = new Date().getTime() - this.lastShoot;
    return d > 200;
  }
  
  this.fire = function() {
    this.lastShoot = new Date().getTime();
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
  var xAcc, yAcc;
  xAcc = Math.sin((this.rotation * Math.PI) / 180) * this.speed;
  yAcc = -Math.cos((this.rotation * Math.PI) / 180) * this.speed;
  this.position.x += xAcc;
  this.position.y += yAcc;
}

Universe.init();



