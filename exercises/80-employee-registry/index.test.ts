import { describe, it, expect, beforeEach } from "vitest";
import { EmployeeRegistry } from "./index.js";

// Uncomment each section of tests as you reach the relevant part.

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
    expect(emp.name).toBe("Alice");
    expect(emp.jobTitle).toBe("Engineer");
    expect(emp.hourlyRate).toBe(40);
  });

  it("returns a falsy value for a duplicate id", () => {
    expect(registry.addEmployee("1", "Duplicate", "Engineer", 40)).toBeFalsy();
  });
});

describe("Part 1 - removeEmployee", () => {
  it("returns true when the employee was removed", () => {
    expect(registry.removeEmployee("1")).toBe(true);
  });

  it("removes the employee so they can no longer be retrieved", () => {
    registry.removeEmployee("1");
    expect(() => registry.getEmployee("1")).toThrow();
  });

  it("returns false when the employee does not exist", () => {
    expect(registry.removeEmployee("999")).toBe(false);
  });
});

describe("Part 1 - getEmployee", () => {
  it("returns the correct employee", () => {
    expect(registry.getEmployee("2").name).toBe("Bob");
  });

  it("throws for a non-existent id", () => {
    expect(() => registry.getEmployee("999")).toThrow();
  });
});

// ─── PART 2 ───────────────────────────────────────────────────────────────────

// describe("Part 2 - logHours", () => {
//   it("returns the hours logged", () => {
//     expect(registry.logHours("1", "2025-01-01", 8)).toBe(8);
//   });

//   it("throws for a non-existent employee", () => {
//     expect(() => registry.logHours("999", "2025-01-01", 8)).toThrow();
//   });

//   it("overwrites hours if called again for the same day", () => {
//     registry.logHours("1", "2025-01-01", 8);
//     registry.logHours("1", "2025-01-01", 6);
//     expect(registry.calculatePayForDay("1", "2025-01-01")).toBe(40 * 6);
//   });
// });

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
//     registry.logHours("1", "2025-05-15", 8);
//     expect(registry.calculatePayForDay("1", "2025-05-15")).toBe(40 * 8);
//   });

//   it("calculates overtime for hours above 8", () => {
//     registry.logHours("1", "2025-05-15", 10);
//     expect(registry.calculatePayForDay("1", "2025-05-15")).toBe(40 * 8 + 2 * 40 * 1.5);
//   });

//   it("returns 0 for a day with no logged hours", () => {
//     expect(registry.calculatePayForDay("1", "2025-05-15")).toBe(0);
//   });

//   it("applies the bonus multiplier to hourlyRate before overtime", () => {
//     registry.logHours("1", "2025-06-15", 8);
//     expect(registry.calculatePayForDay("1", "2025-06-15")).toBe(80 * 8);
//   });

//   it("applies bonus and calculates overtime on the boosted rate", () => {
//     registry.logHours("1", "2025-06-15", 10);
//     expect(registry.calculatePayForDay("1", "2025-06-15")).toBe(80 * 8 + 80 * 1.5 * 2);
//   });

//   it("works correctly on the first and last day of a bonus period", () => {
//     registry.logHours("1", "2025-06-01", 8);
//     registry.logHours("1", "2025-06-30", 8);
//     expect(registry.calculatePayForDay("1", "2025-06-01")).toBe(80 * 8);
//     expect(registry.calculatePayForDay("1", "2025-06-30")).toBe(80 * 8);
//   });

//   it("throws for a non-existent employee", () => {
//     expect(() => registry.calculatePayForDay("999", "2025-06-15")).toThrow();
//   });
// });

// describe("Part 2 - calculatePayForPeriod", () => {
//   beforeEach(() => {
//     registry.addBonusPeriod("2025-06-15", "2025-06-30", 2);
//     registry.logHours("1", "2025-05-01", 8);
//     registry.logHours("1", "2025-05-02", 8);
//     registry.logHours("1", "2025-05-03", 8);
//     registry.logHours("1", "2025-06-14", 8);
//     registry.logHours("1", "2025-06-15", 8);
//   });

//   it("returns total pay across all logged days in the range", () => {
//     const expected = 40 * 8 * 3;
//     expect(registry.calculatePayForPeriod("1", "2025-05-01", "2025-05-03")).toBeCloseTo(expected);
//   });

//   it("days with no logged hours contribute 0", () => {
//     const expected = registry.calculatePayForDay("1", "2025-05-01") * 3;
//     expect(registry.calculatePayForPeriod("1", "2025-05-01", "2025-05-05")).toBeCloseTo(expected);
//   });

//   it("correctly applies bonus for days within a bonus period", () => {
//     const day1 = registry.calculatePayForDay("1", "2025-06-14");
//     const day2 = registry.calculatePayForDay("1", "2025-06-15");
//     expect(
//       registry.calculatePayForPeriod("1", "2025-06-14", "2025-06-15")
//     ).toBeCloseTo(day1 + day2);
//   });

//   it("handles a single day range", () => {
//     expect(
//       registry.calculatePayForPeriod("1", "2025-05-01", "2025-05-01")
//     ).toBeCloseTo(registry.calculatePayForDay("1", "2025-05-01"));
//   });

//   it("throws for a non-existent employee", () => {
//     expect(() => registry.calculatePayForPeriod("999", "2025-05-01", "2025-05-03")).toThrow();
//   });
// });

// ─── PART 3 ───────────────────────────────────────────────────────────────────

// describe("Part 3 - updateHourlyRate", () => {
//   it("updates and returns the new hourly rate", () => {
//     expect(registry.updateHourlyRate("1", 50)).toBe(50);
//     expect(registry.getEmployee("1").hourlyRate).toBe(50);
//   });

//   it("throws for a non-existent employee", () => {
//     expect(() => registry.updateHourlyRate("999", 50)).toThrow();
//   });

//   it("uses the original rate for days before the effectiveFrom date", () => {
//     registry.updateHourlyRate("1", 60, "2025-06-01");
//     registry.logHours("1", "2025-05-31", 8);
//     expect(registry.calculatePayForDay("1", "2025-05-31")).toBe(40 * 8);
//   });

//   it("uses the new rate on and after the effectiveFrom date", () => {
//     registry.updateHourlyRate("1", 60, "2025-06-01");
//     registry.logHours("1", "2025-06-01", 8);
//     registry.logHours("1", "2025-06-15", 8);
//     expect(registry.calculatePayForDay("1", "2025-06-01")).toBe(60 * 8);
//     expect(registry.calculatePayForDay("1", "2025-06-15")).toBe(60 * 8);
//   });

//   it("uses the most recent rate when multiple changes have occurred", () => {
//     registry.updateHourlyRate("1", 50, "2025-03-01");
//     registry.updateHourlyRate("1", 60, "2025-06-01");
//     registry.logHours("1", "2025-02-15", 8);
//     registry.logHours("1", "2025-04-01", 8);
//     registry.logHours("1", "2025-07-01", 8);
//     expect(registry.calculatePayForDay("1", "2025-02-15")).toBe(40 * 8);
//     expect(registry.calculatePayForDay("1", "2025-04-01")).toBe(50 * 8);
//     expect(registry.calculatePayForDay("1", "2025-07-01")).toBe(60 * 8);
//   });

//   it("calculatePayForPeriod uses the correct rate across a rate change", () => {
//     registry.updateHourlyRate("1", 60, "2025-06-01");
//     registry.logHours("1", "2025-05-31", 8);
//     registry.logHours("1", "2025-06-01", 8);
//     const expected =
//       registry.calculatePayForDay("1", "2025-05-31") +
//       registry.calculatePayForDay("1", "2025-06-01");
//     expect(
//       registry.calculatePayForPeriod("1", "2025-05-31", "2025-06-01")
//     ).toBeCloseTo(expected);
//   });

//   it("rate changes interact correctly with bonus periods", () => {
//     registry.updateHourlyRate("1", 60, "2025-06-01");
//     registry.addBonusPeriod("2025-06-15", "2025-06-30", 2);
//     registry.logHours("1", "2025-06-15", 8);
//     expect(registry.calculatePayForDay("1", "2025-06-15")).toBe(120 * 8);
//   });

//   it("bonus period before a rate change uses the original rate", () => {
//     registry.updateHourlyRate("1", 60, "2025-06-01");
//     registry.addBonusPeriod("2025-04-01", "2025-04-30", 2);
//     registry.logHours("1", "2025-04-15", 8);
//     expect(registry.calculatePayForDay("1", "2025-04-15")).toBe(80 * 8);
//   });
// });

// ─── PART 4 ───────────────────────────────────────────────────────────────────

// describe("Part 4 - getMedianPaid", () => {
//   beforeEach(() => {
//     // Alice: 40 * 8 * 3 = 960
//     // Bob:   35 * 8 * 3 = 840
//     // Carol: 50 * 8 * 3 = 1200
//     for (const day of ["2025-01-01", "2025-01-02", "2025-01-03"]) {
//       registry.logHours("1", day, 8);
//       registry.logHours("2", day, 8);
//       registry.logHours("3", day, 8);
//     }
//   });

//   it("returns the median pay for an odd number of employees", () => {
//     // sorted: 840, 960, 1200 — median: 960
//     expect(registry.getMedianPaid("2025-01-01", "2025-01-03")).toBe(960);
//   });

//   it("returns the average of the two middle values for an even number of employees", () => {
//     registry.addEmployee("4", "Dan", "Manager", 45);
//     registry.logHours("4", "2025-01-01", 8);
//     registry.logHours("4", "2025-01-02", 8);
//     registry.logHours("4", "2025-01-03", 8);
//     // pays: 840, 960, 1080, 1200 — median: (960 + 1080) / 2 = 1020
//     expect(registry.getMedianPaid("2025-01-01", "2025-01-03")).toBe(1020);
//   });

//   it("employees with no logged hours contribute 0 to the median", () => {
//     const empty = new EmployeeRegistry();
//     empty.addEmployee("1", "Alice", "Engineer", 40);
//     empty.addEmployee("2", "Bob", "Designer", 35);
//     // sorted: 0, 0 — median: 0
//     expect(empty.getMedianPaid("2025-01-01", "2025-01-03")).toBe(0);
//   });
// });

// describe("Part 4 - getPayrollSummary", () => {
//   beforeEach(() => {
//     // Alice: 960, Bob: 840, Carol: 1200
//     for (const day of ["2025-01-01", "2025-01-02", "2025-01-03"]) {
//       registry.logHours("1", day, 8);
//       registry.logHours("2", day, 8);
//       registry.logHours("3", day, 8);
//     }
//   });

//   it("returns the correct total", () => {
//     expect(registry.getPayrollSummary("2025-01-01", "2025-01-03")?.total).toBeCloseTo(3000);
//   });

//   it("returns the correct average", () => {
//     expect(registry.getPayrollSummary("2025-01-01", "2025-01-03")?.average).toBeCloseTo(1000);
//   });

//   it("returns the correct median", () => {
//     expect(registry.getPayrollSummary("2025-01-01", "2025-01-03")?.median).toBe(960);
//   });

//   it("returns the correct highest pay", () => {
//     expect(registry.getPayrollSummary("2025-01-01", "2025-01-03")?.highest).toBeCloseTo(1200);
//   });

//   it("returns the correct lowest pay", () => {
//     expect(registry.getPayrollSummary("2025-01-01", "2025-01-03")?.lowest).toBeCloseTo(840);
//   });

//   it("returns a falsy value when the registry is empty", () => {
//     const empty = new EmployeeRegistry();
//     expect(empty.getPayrollSummary("2025-01-01", "2025-01-03")).toBeFalsy();
//   });

//   it("reflects bonus periods in the summary", () => {
//     registry.addBonusPeriod("2025-01-01", "2025-01-03", 2);
//     // Alice: 80*8*3=1920, Bob: 70*8*3=1680, Carol: 100*8*3=2400
//     const summary = registry.getPayrollSummary("2025-01-01", "2025-01-03");
//     expect(summary?.total).toBeCloseTo(6000);
//     expect(summary?.highest).toBeCloseTo(2400);
//     expect(summary?.lowest).toBeCloseTo(1680);
//   });
// });