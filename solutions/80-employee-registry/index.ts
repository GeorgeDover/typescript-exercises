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
  hoursLog: Map<string, number>;
};

type BonusPeriod = {
  start: string;
  end: string;
  multiplier: number;
};

export class EmployeeRegistry extends EmployeeRegistryAbstract {
  private employees = new Map<string, EmployeeRecord>();
  private bonusPeriods: BonusPeriod[] = [];

  constructor() {
    super();
  }

  override addEmployee(id: string, name: string, jobTitle: string, hourlyRate: number): string | null {
    if (this.employees.has(id)) return null;

    this.employees.set(id, {
      name,
      jobTitle,
      hourlyRate,
      rateHistory: [{ rate: hourlyRate, effectiveFrom: "1970-01-01" }],
      hoursLog: new Map<string, number>(),
    });

    return id;
  }

  override removeEmployee(id: string): boolean { return this.employees.delete(id); }

  override getEmployee(id: string): Employee {
    const record = this.employees.get(id);
    if (!record) throw new Error(`Employee not found: ${id}`);

    return record;
  }

  override logHours(id: string, day: string, hoursWorked: number): number {
    const record = this.employees.get(id);
    if (!record) throw new Error(`Employee not found: ${id}`);

    record.hoursLog.set(day, hoursWorked);

    return hoursWorked;
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
    return this.bonusPeriods.find(p => day >= p.start && day <= p.end)?.multiplier ?? 1;
  }

  override calculatePayForDay(id: string, day: string): number {
    const record = this.employees.get(id);
    if (!record) throw new Error(`Employee not found: ${id}`);

    const hoursWorked = record.hoursLog.get(day) ?? 0;
    if (hoursWorked === 0) return 0;

    const rate = this.getRateForDay(record, day);
    const multiplier = this.getBonusMultiplierForDay(day);
    const effectiveRate = rate * multiplier;
    const regularHours = Math.min(hoursWorked, 8);
    const overtimeHours = Math.max(hoursWorked - 8, 0);

    return (effectiveRate * regularHours) + (effectiveRate * 1.5 * overtimeHours);
  }

  override calculatePayForPeriod(id: string, start: string, end: string): number {
    if (!this.employees.has(id)) throw new Error(`Employee not found: ${id}`);

    let total = 0;
    const current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
      const day = current.toISOString().slice(0, 10);
      total += this.calculatePayForDay(id, day);
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

  override getMedianPaid(start: string, end: string): number {
    const pays = [...this.employees.keys()]
      .map(id => this.calculatePayForPeriod(id, start, end))
      .sort((a, b) => a - b);

    const mid = Math.floor(pays.length / 2);
    if (pays.length % 2 !== 0) return pays[mid] ?? 0;

    const lower = pays[mid - 1] ?? 0;
    const upper = pays[mid] ?? 0;

    return (lower + upper) / 2;
  }

  override getPayrollSummary(start: string, end: string): PayrollSummary | null {
    if (this.employees.size === 0) return null;

    const pays = [...this.employees.keys()]
      .map(id => this.calculatePayForPeriod(id, start, end));

    const total = pays.reduce((sum, p) => sum + p, 0);

    return {
      total,
      average: total / pays.length,
      median: this.getMedianPaid(start, end),
      highest: Math.max(...pays),
      lowest: Math.min(...pays),
    };
  }
}