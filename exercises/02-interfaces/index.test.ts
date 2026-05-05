import { describe, it, expect } from "vitest";
import { Circle, type Shape } from "./index.js";

describe("Circle", () => {
  it("satisfies the Shape interface", () => {
    const circle: Shape = new Circle("red", 5);
    expect(circle.color).toBe("red");
    expect(typeof circle.area()).toBe("number");
  });

  it("label is optional", () => {
    const circle = new Circle("red", 5);
    expect(circle).toHaveProperty('label');
    expect(circle.label).toBeUndefined();
  });
});