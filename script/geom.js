Point = function(x, y)
{
  this.x = x;
  this.y = y;
  
  this.clone = function()
  {
    return new Point(this.x, this.y);
  }
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
