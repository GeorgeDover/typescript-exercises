/* TODO: Complete the class by adding type annotations to all properties, parameters and returns
Hint: https://www.typescriptlang.org/docs/handbook/2/classes.html#class-members*/

export class Book {
  title: string;
  year: number;

  constructor(title: string, year: number) {
    this.title = title;
    this.year = year;
  }

  summary(): string {
    return `${this.title} (${this.year})`;
  }
}