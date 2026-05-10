/* A company needs an employee registry system. There are 4 parts to this exercise
   with increasing scope. Read all parts before starting — your solution to each
   part should be extensible enough to minimise rewrites as requirements grow.
   Uncomment methods in registry.abstract.ts as you reach the next part.
   Total suggested time: 90 minutes. */

/* PART 1 (~15 min):
   Implement the following methods on EmployeeRegistry:
   - addEmployee(id: string, name: string, jobTitle: string, hourlyRate: number): string
     Returns the id of the newly created employee.
   - removeEmployee(id: string): boolean
     Returns true if the employee was removed, false otherwise.
   - getEmployee(id: string): Employee */

/* PART 2 (~25 min):
   - addBonusPeriod(start: string, end: string, multiplier: number): boolean
     Registers a company-wide bonus period using date strings e.g. "2025-06-01".
     multiplier must be >= 1. Bonus periods may not overlap with existing ones.
     Returns true if the period was added successfully, false otherwise.
   - calculatePayForDay(id: string, day: string, hoursWorked: number): number
     Calculates pay for hours worked on a given day (as a date string).
     Hours above 8 in a single day are overtime, paid at 1.5x hourlyRate.
     If the day falls within a registered bonus period, the bonus multiplier
     is applied to hourlyRate BEFORE overtime is calculated.
     e.g. at 2x bonus: effectiveRate = hourlyRate * 2, overtime = effectiveRate * 1.5
   - calculatePayForPeriod(id: string, start: string, end: string, hoursPerDay: number): number
     Returns total pay for an employee across all days in the date range (inclusive).
     Calls calculatePayForDay for each day in the range. */

/* PART 3 (~20 min):
   - updateHourlyRate(id: string, newRate: number, effectiveFrom?: string): number
     Updates the employee's hourly rate. Returns the new rate.
     Accepts an optional effectiveFrom date string (e.g. "2024-01-01") indicating
     when the new rate came into effect. If omitted, defaults to today.
     Rate history must be stored so that calculatePayForDay and calculatePayForPeriod
     use whichever rate was active on the day being calculated, not the current rate.
     A day uses the most recent rate whose effectiveFrom is on or before that day. */

/* PART 4 (~30 min):
   - getMedianPaid(): number
     Returns the median pay value across all employees for the last year.
   - getPayrollSummary(): PayrollSummary
     Returns an object containing total, average, median, highest and lowest
     pay across all employees for the last year. All values are numbers. */

import { EmployeeRegistryAbstract } from "./registry.abstract.js";

export interface Employee {
  name: string;
  jobTitle: string;
  hourlyRate: number;
}

export interface PayrollSummary {
  total: number;
  average: number;
  median: number;
  highest: number;
  lowest: number;
}

type RateEntry = {
  rate: number;
  effectiveFrom: string;
};

type EmployeeRecord = Employee & {
  rateHistory: RateEntry[];
};

type BonusPeriod = {
  start: string;
  end: string;
  multiplier: number;
};

export class EmployeeRegistry extends EmployeeRegistryAbstract {
  private employees: Map<string, EmployeeRecord> = new Map();
  private bonusPeriods: BonusPeriod[] = [];

  constructor() {
    super();
  }

  override addEmployee(id: string, name: string, jobTitle: string, hourlyRate: number): string | null {
    if (this.employees.has(id)) return null;

    this.employees.set(id, { name, jobTitle, hourlyRate, rateHistory: [
      { rate: hourlyRate, effectiveFrom: "1970-01-01"}
    ]});
    return id;
  }

  override removeEmployee(id: string): boolean {
    if (!this.employees.has(id)) return false;
    return this.employees.delete(id);
  }

  override getEmployee(id: string): Employee {
    if (!this.employees.has(id)) throw new Error(`Employee not found: ${id}`);
    return this.employees.get(id)!;
  }

  override addBonusPeriod(start: string, end: string, multiplier: number): boolean {
    if (multiplier < 1) return false;

    for (const period of this.bonusPeriods) {
      if (start < period.end && end > period.start) return false;
    }

    this.bonusPeriods.push({ start, end, multiplier });
    return true;
  }

  private getRateForDay(record: EmployeeRecord, day: string): number {
    const active = record.rateHistory
      .filter(e => e.effectiveFrom <= day)
      .at(-1);
    return active?.rate ?? record.hourlyRate;
  }

  private getBonusMultiplierForDay(day: string): number {
    return this.bonusPeriods.find(
      p => day >= p.start && day <= p.end
    )?.multiplier ?? 1;
  }

  override calculatePayForDay(id: string, day: string, hoursWorked: number): number {
    const record = this.employees.get(id);
    if (!record) throw new Error(`Employee not found: ${id}`);

    const rate = this.getRateForDay(record, day);
    const multiplier = this.getBonusMultiplierForDay(day);
    const effectiveRate = rate * multiplier;

    const regularHours = Math.min(hoursWorked, 8);
    const overtimeHours = Math.max(hoursWorked - 8, 0);

    return (effectiveRate * regularHours) + (effectiveRate * 1.5 * overtimeHours);
  }

  override calculatePayForPeriod(id: string, start: string, end: string, hoursPerDay: number): number {
    if (!this.employees.has(id)) throw new Error(`Employee not found: ${id}`);

    let total = 0;
    const current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
      const day = current.toISOString().slice(0, 10);
      total += this.calculatePayForDay(id, day, hoursPerDay);
      current.setDate(current.getDate() + 1);
    }

    return total;
  }

  override updateHourlyRate(id: string, newRate: number, effectiveFrom?: string): number {
    const record = this.employees.get(id);
    if (!record) throw new Error(`Employee not found: ${id}`);

    const from = effectiveFrom ?? new Date().toISOString().slice(0, 10);

    record.hourlyRate = newRate;
    record.rateHistory.push({ rate: newRate, effectiveFrom: from });
    record.rateHistory.sort((a, b) => a.effectiveFrom.localeCompare(b.effectiveFrom));

    return newRate;
  }

  override getMedianPaid(hoursWorked: number): number {
    const pays = [...this.employees.keys()]
      .map(id => this.calculatePayForDay(id, new Date().toISOString().slice(0, 10), hoursWorked))
      .sort((a, b) => a - b);

    const mid = Math.floor(pays.length / 2);
    return pays.length % 2 !== 0
      ? pays[mid]!
      : (pays[mid - 1]! + pays[mid]!) / 2;
  }

  override getPayrollSummary(hoursWorked: number): PayrollSummary {
    if (this.employees.size === 0) return null!;

    const pays = [...this.employees.keys()]
      .map(id => this.calculatePayForDay(id, new Date().toISOString().slice(0, 10), hoursWorked));

    const total = pays.reduce((sum, p) => sum + p, 0);

    return {
      total,
      average: total / pays.length,
      median: this.getMedianPaid(hoursWorked),
      highest: Math.max(...pays),
      lowest: Math.min(...pays),
    };
  }
}