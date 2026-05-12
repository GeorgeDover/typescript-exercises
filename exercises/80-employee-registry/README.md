# Employee Registry

### Requirements
A company needs an employee registry system.
- Methods should throw an `Error` when called with a non-existent employee id.
- For methods where failure is an expected condition, return a falsy value instead.

### How to perform this exercise
- There are 4 parts to this exercise with increasing scope - read **all parts** before starting.
- Your solution to each part should be extensible enough to minimise rewrites as requirements grow.
- Uncomment methods in `registry.abstract.ts` and tests in `index.test.ts` as you reach each part.
- Use provided interfaces and override abstract methods so tests can run properly.

**Time limit: 90 minutes**

---

## Part 1 · 15 min

- `addEmployee(id, name, jobTitle, hourlyRate)` — adds a new employee to the registry and returns their id
- `removeEmployee(id)` — removes an employee from the registry
- `getEmployee(id)` — retrieves an employee by id


## Part 2 · 20 min

- `logHours(id, day, hoursWorked)` — records the hours an employee worked on a given day as a date string e.g. `"2025-06-01"`. Returns the hours logged
- `calculatePayForDay(id, day)` — calculates an employee's pay for a given day using their logged hours. Hours above 8 are overtime at 1.5x
- `calculatePayForPeriod(id, start, end)` — calculates total pay for an employee across a date range using their logged hours


## Part 3 · 25 min

- `addBonusPeriod(start, end, multiplier)` — registers a company-wide bonus period. Multiplier must be >= 1 and periods may not overlap. Returns `true` if added successfully, `false` otherwise
- `updateHourlyRate(id, newRate, effectiveFrom?)` — updates an employee's hourly rate from a given date, defaulting to today. Pay calculations must reflect whichever rate was active on the day being calculated


## Part 4 · 30 min

- `getMedianPaid(start, end)` — returns the median pay across all employees for the given date range
- `getPayrollSummary(start, end)` — returns total, average, median, highest and lowest pay across all employees for the given date range