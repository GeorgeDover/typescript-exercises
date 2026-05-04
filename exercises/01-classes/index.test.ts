import { describe, it, expect } from "vitest";
import { Book } from "./index.js";

describe("Book", () => {
  it("assigns title and year via the constructor", () => {
    const book = new Book("Frankenstein", 1818);
    expect(book.title).toBe("Frankenstein");
    expect(book.year).toBe(1818);
  });

  it("summary returns the correct string", () => {
    const book = new Book("Dracula", 1897);
    expect(book.summary()).toBe("Dracula (1897)");
  });
});