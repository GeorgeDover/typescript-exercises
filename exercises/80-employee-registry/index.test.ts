import { describe, it, expect, beforeEach } from "vitest";
import { EmployeeRegistry } from "./index.js";

let registry: EmployeeRegistry;

beforeEach(() => {
  registry = new EmployeeRegistry();
  registry.addEmployee("1", "Alice", "Engineer", 40);
  registry.addEmployee("2", "Bob", "Designer", 35);
  registry.addEmployee("3", "Carol", "Engineer", 50);
});

// ─── PART 1 ───────────────────────────────────────────────────────────────────

describe("Part 1 - addEmployee", () => {
  it("returns the id of the newly created employee", () => {
    const id = registry.addEmployee("4", "Dan", "Manager", 60);
    expect(id).toBe("4");
  });

  it("adds an employee retrievable by id", () => {
    const emp = registry.getEmployee("1");
    expect(emp?.name).toBe("Alice");
    expect(emp?.jobTitle).toBe("Engineer");
    expect(emp?.hourlyRate).toBe(40);
  });

  it("does not add a duplicate id", () => {
    const result = registry.addEmployee("1", "Duplicate", "Engineer", 40);
    expect(result).toBeFalsy();
  });
});

describe("Part 1 - removeEmployee", () => {
  it("returns true when the employee was removed", () => {
    expect(registry.removeEmployee("1")).toBe(true);
  });

  it("removes the employee so they can no longer be retrieved", () => {
    registry.removeEmployee("1");
    expect(() => registry.getEmployee("1")).toThrow(Error(`Employee not found: 1`));
  });

  it("returns false when the employee does not exist", () => {
    expect(registry.removeEmployee("999")).toBe(false);
  });
});

describe("Part 1 - getEmployee", () => {
  it("returns the correct employee", () => {
    expect(registry.getEmployee("2")?.name).toBe("Bob");
  });

  it("throws error for a non-existent id", () => {
    expect(() => registry.getEmployee("999")).toThrow(Error(`Employee not found: 999`));
  });
});

// ─── PART 2 ───────────────────────────────────────────────────────────────────

// describe("Part 2 - addBonusPeriod", () => {
//   it("returns true for a valid bonus period", () => {
//     expect(registry.addBonusPeriod("2025-01-01", "2025-01-31", 1.5)).toBe(true);
//   });

//   it("returns false for a multiplier below 1", () => {
//     expect(registry.addBonusPeriod("2025-01-01", "2025-01-31", 0.9)).toBe(false);
//   });

//   it("returns false when a new period overlaps an existing one", () => {
//     registry.addBonusPeriod("2025-01-01", "2025-01-31", 1.5);
//     expect(registry.addBonusPeriod("2025-01-15", "2025-02-15", 1.2)).toBe(false);
//   });

//   it("returns true for non-overlapping periods", () => {
//     registry.addBonusPeriod("2025-01-01", "2025-01-31", 1.5);
//     expect(registry.addBonusPeriod("2025-02-01", "2025-02-28", 1.2)).toBe(true);
//   });
// });

// describe("Part 2 - calculatePayForDay", () => {
//   beforeEach(() => {
//     registry.addBonusPeriod("2025-06-01", "2025-06-30", 2);
//   });

//   it("calculates regular pay for 8 hours or fewer", () => {
//     expect(registry.calculatePayForDay("1", "2025-05-15", 8)).toBe(40 * 8);
//   });

//   it("calculates overtime for hours above 8 in a day", () => {
//     // 8 regular + 2 overtime at 1.5x
//     expect(registry.calculatePayForDay("1", "2025-05-15", 10)).toBe(
//       40 * 8 + 2 * 40 * 1.5
//     );
//   });

//   it("applies the bonus multiplier to hourlyRate before overtime", () => {
//     // effectiveRate = 40 * 2 = 80, pay = 80 * 8 = 640
//     expect(registry.calculatePayForDay("1", "2025-06-15", 8)).toBe(80 * 8);
//   });

//   it("applies bonus and calculates overtime on the boosted rate", () => {
//     // effectiveRate = 80, regular = 80 * 8 = 640, overtime = 80 * 1.5 * 2 = 240
//     expect(registry.calculatePayForDay("1", "2025-06-15", 10)).toBe(
//       80 * 8 + 80 * 1.5 * 2
//     );
//   });

//   it("works correctly on the first and last day of a bonus period", () => {
//     expect(registry.calculatePayForDay("1", "2025-06-01", 8)).toBe(80 * 8);
//     expect(registry.calculatePayForDay("1", "2025-06-30", 8)).toBe(80 * 8);
//   });

//   it("throws error for a non-existent employee", () => {
//     expect(() => registry.calculatePayForDay("999", "2025-06-15", 8)).toThrow(Error(`Employee not found: 999`));
//   });
// });

// describe("Part 2 - calculatePayForPeriod", () => {
//   beforeEach(() => {
//     registry.addBonusPeriod("2025-06-15", "2025-06-30", 2);
//   });

//   it("returns total pay across all days in the range", () => {
//     const expected = registry.calculatePayForDay("1", "2025-05-01", 8) * 3;
//     expect(
//       registry.calculatePayForPeriod("1", "2025-05-01", "2025-05-03", 8)
//     ).toBeCloseTo(expected);
//   });

//   it("correctly applies bonus for days within a bonus period", () => {
//     const day1 = registry.calculatePayForDay("1", "2025-06-14", 8);
//     const day2 = registry.calculatePayForDay("1", "2025-06-15", 8);
//     expect(
//       registry.calculatePayForPeriod("1", "2025-06-14", "2025-06-15", 8)
//     ).toBeCloseTo(day1 + day2);
//   });

//   it("handles a single day range", () => {
//     const expected = registry.calculatePayForDay("1", "2025-05-01", 8);
//     expect(
//       registry.calculatePayForPeriod("1", "2025-05-01", "2025-05-01", 8)
//     ).toBeCloseTo(expected);
//   });

//   it("throws error for a non-existent employee", () => {
//     expect(() =>
//       registry.calculatePayForPeriod("999", "2025-05-01", "2025-05-03", 8)
//     ).toThrow(Error(`Employee not found: 999`));
//   });
// });

// ─── PART 3 ───────────────────────────────────────────────────────────────────

// describe("Part 3 - updateHourlyRate", () => {
//   it("updates and returns the new hourly rate", () => {
//     expect(registry.updateHourlyRate("1", 50)).toBe(50);
//     expect(registry.getEmployee("1")!.hourlyRate).toBe(50);
//   });

//   it("throws error for a non-existent employee", () => {
//     expect(() => registry.updateHourlyRate("999", 50)).toThrow(Error(`Employee not found: 999`));
//   });

//   it("uses the original rate for days before the effectiveFrom date", () => {
//     registry.updateHourlyRate("1", 60, "2025-06-01");
//     expect(registry.calculatePayForDay("1", "2025-05-31", 8)).toBe(40 * 8);
//   });

//   it("uses the new rate on the effectiveFrom date", () => {
//     registry.updateHourlyRate("1", 60, "2025-06-01");
//     expect(registry.calculatePayForDay("1", "2025-06-01", 8)).toBe(60 * 8);
//   });

//   it("uses the new rate for days after the effectiveFrom date", () => {
//     registry.updateHourlyRate("1", 60, "2025-06-01");
//     expect(registry.calculatePayForDay("1", "2025-06-15", 8)).toBe(60 * 8);
//   });

//   it("uses the most recent rate when multiple rate changes have occurred", () => {
//     registry.updateHourlyRate("1", 50, "2025-03-01");
//     registry.updateHourlyRate("1", 60, "2025-06-01");

//     expect(registry.calculatePayForDay("1", "2025-02-15", 8)).toBe(40 * 8);
//     expect(registry.calculatePayForDay("1", "2025-04-01", 8)).toBe(50 * 8);
//     expect(registry.calculatePayForDay("1", "2025-07-01", 8)).toBe(60 * 8);
//   });

//   it("calculatePayForPeriod uses the correct rate for each day across a rate change", () => {
//     registry.updateHourlyRate("1", 60, "2025-06-01");

//     const expected =
//       registry.calculatePayForDay("1", "2025-05-31", 8) +
//       registry.calculatePayForDay("1", "2025-06-01", 8);

//     expect(
//       registry.calculatePayForPeriod("1", "2025-05-31", "2025-06-01", 8)
//     ).toBeCloseTo(expected);
//   });

//   it("rate changes interact correctly with bonus periods", () => {
//     registry.updateHourlyRate("1", 60, "2025-06-01");
//     registry.addBonusPeriod("2025-06-15", "2025-06-30", 2);

//     // effectiveRate = 60 * 2 = 120, pay = 120 * 8 = 960
//     expect(registry.calculatePayForDay("1", "2025-06-15", 8)).toBe(120 * 8);
//   });

//   it("bonus period before a rate change uses the original rate", () => {
//     registry.updateHourlyRate("1", 60, "2025-06-01");
//     registry.addBonusPeriod("2025-04-01", "2025-04-30", 2);

//     // effectiveRate = 40 * 2 = 80
//     expect(registry.calculatePayForDay("1", "2025-04-15", 8)).toBe(80 * 8);
//   });
// });

// ─── PART 4 ───────────────────────────────────────────────────────────────────

// describe("Part 4 - getMedianPaid", () => {
//   it("returns the median pay for an odd number of employees", () => {
//     // Alice: 40*8=320, Bob: 35*8=280, Carol: 50*8=400 — sorted: 280, 320, 400 — median: 320
//     expect(registry.getMedianPaid(8)).toBe(320);
//   });

//   it("returns the average of the two middle values for an even number of employees", () => {
//     registry.addEmployee("4", "Dan", "Manager", 45);
//     // pays: 280, 320, 360, 400 — median: (320+360)/2 = 340
//     expect(registry.getMedianPaid(8)).toBe(340);
//   });

//   it("handles overtime correctly when calculating median", () => {
//     // Alice: 40*8 + 40*1.5*2=440, Bob: 35*8 + 35*1.5*2=385, Carol: 50*8 + 50*1.5*2=550
//     // sorted: 385, 440, 550 — median: 440
//     expect(registry.getMedianPaid(10)).toBe(440);
//   });
// });

// describe("Part 4 - getPayrollSummary", () => {
//   it("returns the correct total", () => {
//     const total =
//       registry.calculatePayForDay("1", "2025-01-01", 8) +
//       registry.calculatePayForDay("2", "2025-01-01", 8) +
//       registry.calculatePayForDay("3", "2025-01-01", 8);
//     expect(registry.getPayrollSummary(8).total).toBeCloseTo(total);
//   });

//   it("returns the correct average", () => {
//     const total =
//       registry.calculatePayForDay("1", "2025-01-01", 8) +
//       registry.calculatePayForDay("2", "2025-01-01", 8) +
//       registry.calculatePayForDay("3", "2025-01-01", 8);
//     expect(registry.getPayrollSummary(8).average).toBeCloseTo(total / 3);
//   });

//   it("returns the correct median", () => {
//     expect(registry.getPayrollSummary(8).median).toBe(registry.getMedianPaid(8));
//   });

//   it("returns the correct highest pay", () => {
//     expect(registry.getPayrollSummary(8).highest).toBeCloseTo(50 * 8);
//   });

//   it("returns the correct lowest pay", () => {
//     expect(registry.getPayrollSummary(8).lowest).toBeCloseTo(35 * 8);
//   });

//   it("returns a falsy value when the registry is empty", () => {
//     const empty = new EmployeeRegistry();
//     expect(empty.getPayrollSummary(8)).toBeFalsy();
//   });
// });