Point = function(x, y)
{
  this.x = x;
  this.y = y;
}

Rectangle = function(position, width, height)
{
  this.position = position;
  this.width = width;
  this.height = height;
}

Rectangle.prototype.intersect = function(other)
{
  return false;
};


MathUtils = {
  deg2rad: function(deg)
  {
    
  }
,
};
