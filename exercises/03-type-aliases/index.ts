/* TODO: Create a type alias `ID` that accepts either a string or a number
         Create a type alias `Point` with numeric properties `x` and `y`
         Add type annotations to all parameters and return types
Hint: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
      https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types */

export type ID = unknown;

export type Point = unknown;

export function formatID(id): string {
  return `ID: ${id}`;
}

export function distanceFromOrigin(point): number {
  return Math.sqrt(point.x ** 2 + point.y ** 2);
}