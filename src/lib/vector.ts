

export default class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  length() {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }

  to(vector: Vector) {
    return new Vector(
      vector.x - this.x,
      vector.y - this.y
    );
  }

  plus(vector: Vector) {
    return new Vector(
      vector.x + this.x,
      vector.y + this.y
    )
  }

  times(factor: number) {
    return new Vector(
      this.x * factor,
      this.y * factor
    );
  }
}
