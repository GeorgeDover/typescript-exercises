# TypeScript Exercises

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)

## Setup

```bash
git clone https://github.com/GeorgeDover/typescript-exercises.git
cd typescript-exercises
npm install
```

It is also generally a good idea to turn off autocomplete, linting and automatic formatting within your IDE - assume you won't have these available during an interview.

## Running an Exercise

```bash
npx tsx exercises/00-hello-world
```

## Running Tests

```bash
npm test                                # run all tests once (typecheck enabled)
npm test exercises/00-hello-world       # run tests within specific exercise (typecheck enabled)
npm run test:watch                      # re-run on file changes
```