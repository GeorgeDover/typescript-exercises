import type { Employee, PayrollSummary } from "./index.ts";

// This is a read-only scaffolding file.
// Uncomment each method as you reach the relevant part.

export abstract class EmployeeRegistryAbstract {

  // ─── PART 1 ───────────────────────────────────────────────────────────────
  addEmployee(_id: string, _name: string, _jobTitle: string, _hourlyRate: number): string | null { return null; }
  removeEmployee(_id: string): boolean { return false; }
  getEmployee(_id: string): Employee { throw new Error("Not implemented"); }

  // ─── PART 2 ───────────────────────────────────────────────────────────────
  // addBonusPeriod(_start: string, _end: string, _multiplier: number): boolean { return false; }
  // calculatePayForDay(_id: string, _day: string, _hoursWorked: number): number { throw new Error("Not implemented"); }
  // calculatePayForPeriod(_id: string, _start: string, _end: string, _hoursPerDay: number): number { throw new Error("Not implemented"); }

  // ─── PART 3 ───────────────────────────────────────────────────────────────
  // updateHourlyRate(_id: string, _newRate: number, _effectiveFrom?: string): number { throw new Error("Not implemented"); }

  // ─── PART 4 ───────────────────────────────────────────────────────────────
  // getPayrollSummary(_hoursWorked: number): PayrollSummary { return {} as PayrollSummary; }
  // getMedianPaid(_hoursWorked: number): number { return 0; }
}