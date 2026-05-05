import { describe, it, expect } from "vitest";
import { formatID, distanceFromOrigin } from "./index.js";

describe("formatID", () => {
  it("accepts a string ID", () => {
    expect(formatID("abc-123")).toBe("ID: abc-123");
  });

  it("accepts a number ID", () => {
    expect(formatID(42)).toBe("ID: 42");
  });
});

describe("distanceFromOrigin", () => {
  it("calculates distance from origin correctly", () => {
    expect(distanceFromOrigin({ x: 3, y: 4 })).toBe(5);
  });

  it("returns 0 for origin point", () => {
    expect(distanceFromOrigin({ x: 0, y: 0 })).toBe(0);
  });
});