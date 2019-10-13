const collision2d = {}

collision2d.pointInRectangle = (p, r) => p.x > r.x0 && p.x < r.x1 && p.y > r.y0 && p.y < r.y1

export default collision2d;

