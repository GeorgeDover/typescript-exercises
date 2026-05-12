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

// Add any interfaces or types needed here

export class EmployeeRegistry extends EmployeeRegistryAbstract {
  // Add class variables here

  constructor() {
    super();
  }

  // Override + implement abstract methods here
}