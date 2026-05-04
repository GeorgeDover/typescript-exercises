/* TODO: Complete the class by adding typed properties and returns
Hint: https://www.typescriptlang.org/docs/handbook/2/classes.html#class-members*/

export class Book {
  title
  year

  constructor(title, year) {
    this.title = title;
    this.year = year;
  }

  summary() {
    return `${this.title} (${this.year})`;
  }
}