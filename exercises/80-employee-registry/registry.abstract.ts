import type { Employee, PayrollSummary } from "./index.ts";

// This is a read-only scaffolding file. Do not modify it.
// Uncomment each method as you reach the relevant part.

export abstract class EmployeeRegistryAbstract {

  // ─── PART 1 ───────────────────────────────────────────────────────────────
  addEmployee(id: string, name: string, jobTitle: string, hourlyRate: number): string { return ""; }
  removeEmployee(id: string): boolean { return false; }
  getEmployee(id: string): Employee { return {} as Employee; }

  // ─── PART 2 ───────────────────────────────────────────────────────────────
  // addBonusPeriod(start: string, end: string, multiplier: number): boolean { return false; }
  // calculatePayForDay(id: string, day: string, hoursWorked: number): number { return 0; }
  // calculatePayForPeriod(id: string, start: string, end: string, hoursPerDay: number): number { return 0; }

  // ─── PART 3 ───────────────────────────────────────────────────────────────
  // updateHourlyRate(id: string, newRate: number, effectiveFrom?: string): number { return 0; }

  // ─── PART 4 ───────────────────────────────────────────────────────────────
  // getPayrollSummary(hoursWorked: number): PayrollSummary { return {} as PayrollSummary; }
  // getMedianPaid(hoursWorked: number): number { return 0; }
}