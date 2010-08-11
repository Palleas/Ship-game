// keys codes
var KEY_UP = 38,
KEY_DOWN = 40,
KEY_LEFT = 37,
KEY_RIGHT = 39,
KEY_FIRE = 32,
// globals
SHIP_IMAGE_SRC = "assets/images/ship.png",
BULLET_SPEED = 10,
TARGET_ROTATION_SPEED = 10,
// classes
Bullet,
Ship,
GameContext,
Target,
// instances
context;

Target = function()
{
  this.rotation = 0;
  this.position = {
    x : 0,
    y : 0
  }
}

Target.prototype.rotate = function()
{
  this.rotation += TARGET_ROTATION_SPEED;
}

Bullet = function(rotation)
{
  this.rotation = rotation;
  this.position = {
    x : 0,
    y : 0
  };
  this.clock = 0;
  this.xAcc = Math.sin((rotation * Math.PI) / 180) * BULLET_SPEED;
  this.yAcc = -Math.cos((rotation * Math.PI) / 180) * BULLET_SPEED;
}

Bullet.prototype.move = function() 
{
  this.position.x += this.xAcc;
  this.position.y += this.yAcc;
}

Bullet.prototype.destroy = function()
{
  clearInterval(this.clock);
  this.clock = 0;
  this.xAcc = 0;
  this.yAcc = 0;
}

Ship = function()
{
  this.position = {
    x : 0,
    y : 0
  };
  
  this.life = 100;
  this.rotation = 0;
  this.currentSpeed = 0;
}

Ship.prototype.move = function()
{
  var xAcc, yAcc;
  
  xAcc = Math.sin((this.rotation * Math.PI) / 180) * this.currentSpeed;
  yAcc = -Math.cos((this.rotation * Math.PI) / 180) * this.currentSpeed;
  this.position.x += xAcc;
  this.position.y += yAcc;
}

Ship.prototype.accelerate = function()
{
  this.currentSpeed += 2; 
  if (this.currentSpeed >= 10)
    this.currentSpeed = 10;
}

Ship.prototype.turnLeft = function()
{
  this.rotation -= 5;
}

Ship.prototype.turnRight = function()
{
  this.rotation += 5;
}

GameContext = function(stage)
{
  // usefull stuffs
  var context = stage.getContext('2d'),
  fps = 0,
  lastDraw = new Date().getTime(),
  clocks = {},  
  bullets = []
  // characters
  shipImage = null,
  draco = null,
  // visual stuffs
  target = null;
  
  shipImage = new Image(),
  shipImage.src = SHIP_IMAGE_SRC,
  
  draco = new Ship();
  draco.position.x = parseInt(stage.width / 2);
  draco.position.y = parseInt(stage.height / 2);
  
  // target
  target = new Target();
  
  // items
  bullets = [];
  
  // tickers
  clocks = {
    game: null,
    paint: null,
    resist: null,
    moving: null,
    rotatingLeft: null,
    rotatingRight: null,
    firing: null
  };
  
  function onKeyDown(event)
  {
    // fire !
    if (event.keyCode == KEY_FIRE && !clocks.firing)
    {
      clocks.firing = setInterval(fire, 100);
    }
      
    // accelerate
    if (event.keyCode == KEY_UP && !clocks.moving)
    { 
      clocks.moving = setInterval(function() { draco.accelerate(); }, 20);
      event.preventDefault();
    }
    
    // rotate
    if (event.keyCode == KEY_LEFT && !clocks.rotatingLeft)
    {
      clocks.rotatingLeft = setInterval(function() { draco.turnLeft(); }, 20);
    }

    if (event.keyCode == KEY_RIGHT && !clocks.rotatingRight)
    {
      clocks.rotatingRight = setInterval(function() { draco.turnRight(); }, 20);
    }
  }
  
  function onKeyUp(event)
  {
    if (event.keyCode == KEY_FIRE && clocks.firing)
    {
      clearInterval(clocks.firing);
      clocks.firing = 0;
      return;
    }
    
    if (event.keyCode == KEY_UP && clocks.moving)
    {
      clearInterval(clocks.moving);
      clocks.moving = 0;
      return;
    }
    
    if (event.keyCode == KEY_RIGHT && clocks.rotatingRight)
    {
      clearInterval(clocks.rotatingRight);
      clocks.rotatingRight = 0;
      return;
    }
    
    if (event.keyCode == KEY_LEFT && clocks.rotatingLeft)
    {
      clearInterval(clocks.rotatingLeft);
      clocks.rotatingLeft = 0;
      return;
    }
  }
  
  function onMouseMove(event)
  {
    target.position.x = event.offsetX;
    target.position.y = event.offsetY;
  }
  
  function resist()
  {
    draco.currentSpeed *= 0.92;
  }
  
  function fire()
  {
    var dX, dY, angle, b;
    dX = draco.position.x - target.position.x;
    dY = draco.position.y - target.position.y;
    angle = Math.atan2(dY, dX);
    
    b = new Bullet(angle * 180 / Math.PI - 90);
    b.position.x = draco.position.x;
    b.position.y = draco.position.y;
    b.clock = setInterval(function() { b.move() }, 20);
    bullets.push(b);
  }
  
  function draw()
  {
    clear();
    // drawing bullets
    var bullet, now, bIndex;
    
    for (bIndex = 0; bIndex < bullets.length; bIndex++)
    {
      bullet = bullets[bIndex];
      if (bullet.position.x < 0 || bullet.position.x > stage.width
          || bullet.position.y < 0 || bullet.position.y > stage.height)
      {
        bullets.splice(bIndex, 1);
        continue;
      }
      drawBullet(bullet)
    }
    
    drawHero();
    drawTarget();
    
    now = new Date().getTime();
    fps = Math.floor(1000 / (now - lastDraw));
    lastDraw = now;
  }
  
  function drawGun()
  {
    return;
    context.save();
    var dX, dY, angle;
    dX = draco.position.x - target.position.x;
    dY = draco.position.y - target.position.y;
    //console.info((Math.atan(dY/dX) * 180) /  Math.PI);
    context.translate(draco.position.x, draco.position.y);
    context.rotate(Math.atan(dY/dX));
    context.beginPath();
    context.fillStyle = "rgba(0,0,255, 1)";
    context.rect(0, 0, 5, 50);
    context.fill();
    context.restore();
  }
  
  function drawTarget()
  {
    context.save();
    
    context.translate(target.position.x, target.position.y);
    context.strokeStyle = 'rgba(0, 200, 0, .7)';
    context.lineWidth = 3;
    
    // cross
    context.beginPath();
    context.moveTo(0, 10);
    context.lineTo(0, -10);
    context.moveTo(-10, 0);
    context.lineTo(10, 0);
    context.stroke();
    
    // circle
    var startAngle = ((target.rotation - 45) * Math.PI) / 180,
    endAngle = ((target.rotation + 45) * Math.PI) / 180;
    
    context.moveTo(0, 0);
    context.beginPath();
    context.arc(0, 0, 18, startAngle, endAngle, false);
    context.stroke();
    context.restore();
  }
  
  function drawHero()
  {
    context.save();
    context.translate(draco.position.x, draco.position.y);
    context.rotate(draco.rotation * Math.PI / 180);
    context.drawImage(shipImage, - shipImage.width / 2, - shipImage.height / 2);
    context.restore();
    
    drawGun();
  }
  
  function drawBullet(bullet)
  {
    context.save();
    context.translate(bullet.position.x, bullet.position.y);
    context.rotate(bullet.rotation * Math.PI / 180);
    
    context.beginPath();
    context.fillStyle = "rgba(255, 224, 80, 1)";
    context.rect(0, 0, 2, 5);  
    
    context.fill();
    context.restore();
  }
  
  function clear()
  {
    context.clearRect(0,0,stage.width,stage.height);
    context.fillRect(0, 0, stage.width, stage.height);
  }
  
  this.getFPS = function()
  {
    return fps;
  }
  
  // listeners
  this.init = function ()
  {
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);
    stage.addEventListener("mousemove", onMouseMove, false);
    
    clocks.game = setInterval(function() { draco.move(); }, 10);
    clocks.paint = setInterval(draw, 1000 / 30);
    clocks.resist = setInterval(resist, 30);
    clocks.target = setInterval(function() { target.rotate(); }, 20);
  }
};

context = new GameContext(document.getElementById('stage')),
messages = document.getElementById("messages"),
link = document.createElement('a');

link.href = "#play";
link.id = "playLink";
link.appendChild(document.createTextNode("Play !"));
link.addEventListener("click", function(event) 
{
  context.init();
  this.parentNode.removeChild(this);
  
  var fpsContainer = document.createElement("span");
  fpsContainer.id = "fps";
  messages.appendChild(fpsContainer);
  
  setInterval(function() { fpsContainer.innerHTML = context.getFPS() + " FPS"; }, 500);
  
  return false;
}, false);
messages.appendChild(link);



