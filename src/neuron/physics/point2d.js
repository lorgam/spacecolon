function Point2d(x, y){
  this.x = x;
  this.y = y;
}

Point2d.prototype.equals    = function(p){return this.x == p.x && this.y == p.y;}
Point2d.prototype.distance  = function(p){return Math.abs(this.x - p.x) + Math.abs(this.y - p.y);}
Point2d.prototype.neighbors = function() {
  return [
    new Point2d(this.x + 1, this.y),
    new Point2d(this.x - 1, this.y),
    new Point2d(this.x,     this.y + 1),
    new Point2d(this.x,     this.y - 1)
  ];
}

export default Point2d;

