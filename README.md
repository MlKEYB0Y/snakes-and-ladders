# Snakes and Ladders

Core domain engine for a Snakes and Ladders board game.

## Currently implemented

- A new game starts every player on square 1, unless given a different starting square.
- Basic movement: a player's position advances by a die roll, and rolls accumulate across turns.
- A player who reaches square 100 wins: `takeTurn` returns `"<name> wins"`.

Work in progress, developed test-first.

## Getting started

```bash
npm install
npm test
```

## Scripts

- `npm test` — run the test suite once
- `npm run test:watch` — run tests in watch mode
- `npm run typecheck` — type-check with `tsc --noEmit`
- `npm run build` — compile to `dist/`
- `npm run lint` — check linting and formatting (Biome)
- `npm run format` — auto-fix formatting and import order (Biome)

