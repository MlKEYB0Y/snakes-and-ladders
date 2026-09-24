# Snakes and Ladders

Core domain engine for a Snakes and Ladders board game.

## Currently implemented

- A new game starts every player on square 1, unless given a different starting square.
- Basic movement: a player's position advances by a die roll, and rolls accumulate across turns.
- A player must land exactly on square 100 to win: `takeTurn` returns `"<name> wins"`.
- Overshooting 100 bounces the player back by the extra amount (e.g. 97 + 4 → 99).
- Once a player has won, further turns throw a `"Game is over."` error.
- Players take turns in the order given; `getCurrentPlayer()` returns whose turn it is.
- Taking a turn out of order throws an `"It's not <name>'s turn."` error.
- Each player's position is tracked independently.

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

## Linting and formatting

The project uses [Biome](https://biomejs.dev) for both linting and formatting, configured in `biome.json`. In VS Code, install the recommended Biome extension to format on save.

