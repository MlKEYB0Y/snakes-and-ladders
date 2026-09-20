# Snakes and Ladders

Core domain engine for a Snakes and Ladders board game.

## Currently implemented

- A new game starts every player on square 1.
- Basic movement: a player's position advances by a die roll.

Everything else above (winning, bounce-back, turn order, blocking moves after a win) is still to be built. This is a work in progress, developed test-first.

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

