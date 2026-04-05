/**
 * Deterministic E2E: Deck of Cards API is mocked in cypress/support/e2e.js
 */
describe('Blackjack MVP — deck shuffle and deal', () => {
  it('loads a shuffled deck and displays initial deal', () => {
    cy.visit('/')

    cy.wait('@shuffleDeck')
    cy.wait('@drawCards')

    cy.contains('h1', 'Blackjack Game')
    cy.contains('Deck ID: mock-deck-e2e')
    cy.contains('Remaining Cards: 52')
    cy.contains('Game has started!')
    cy.contains('ACE of SPADES')
    cy.contains('3 of DIAMONDS')
    cy.contains('2 of HEARTS')
    cy.contains('4 of CLUBS')
  })
})
