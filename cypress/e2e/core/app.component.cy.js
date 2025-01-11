describe('App Integration Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the app title', () => {
    cy.contains('Blackjack Game')
  })

  it('should render DeckDisplayComponent', () => {
    cy.get('app-deck-display').should('exist')
  })

  it('should render GameRoundComponent', () => {
    cy.get('app-game-round').should('exist')
  })

  it('should display the deck details from DeckDisplayComponent', () => {
    cy.get('app-deck-display').contains('Deck ID').should('exist')
    cy.get('app-deck-display').contains('Remaining Cards').should('exist')
  })

  it('should display the game round information from GameRoundComponent', () => {
    cy.get('app-game-round').contains("Player's Cards").should('exist')
    cy.get('app-game-round').contains("Dealer's Cards").should('exist')
  })
})
