/* TODO: Implement Shape in Circle, add the missing properties and type annotations, and make sure label is an optional property
Hint: https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses
      https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties */

export interface Shape {
  color: string;
  area(): number;
  label: string;
}

export class Circle {
  color: string;
  radius;

  constructor(color, radius) {
    this.color = color;
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}