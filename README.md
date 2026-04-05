# Blackjack (Deck of Cards API)

Angular **18** demo that integrates the public [Deck of Cards API](https://deckofcardsapi.com/): fetch a shuffled deck, show deck metadata, and deal an opening hand to the player and dealer.

## Current scope (MVP)

This repository is intentionally scoped as a **portfolio slice** — not a full casino game.

| Done | Description |
|------|-------------|
| Yes | Fetch and display a shuffled deck (ID, remaining count) |
| Yes | Draw four cards and show two per side (player / dealer) in the first round |
| Yes | **Standalone** components, **control flow** syntax in templates, **Jest** unit tests, **Cypress** E2E (including a **mocked API** path for reliable CI) |
| No | Hit / Stand, dealer rules to 17, win/loss outcome, betting, animations |

Roadmap items (hit, stand, scoring, UX polish) are **future work** if this project is extended.

## Stack

- Angular 18, RxJS, Angular Material + CDK (versions aligned with Angular **18.2**)
- Jest + `@testing-library/angular` for unit tests
- Cypress for E2E (`npm run e2e` runs headless; `npm run cypress:open` for interactive)
- ESLint, Prettier, Husky

## Scripts

```bash
npm ci
npm start          # dev server → http://localhost:4200
npm test           # Jest
npm run lint
npm run build
npm run e2e        # Cypress (ensure dev server is not already bound to :4200, or use CI)
```

## CI

GitHub Actions runs **lint**, **Jest**, **production build**, and **Cypress** against `ng serve` so the critical shuffle + deal flow stays green without depending on the external API at test time.

## License

Private / portfolio.
