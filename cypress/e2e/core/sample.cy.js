describe('My First Test', () => {
  it('Visits the app root URL', () => {
    cy.visit('/')
    cy.contains('blackjack') // Adjust based on your app content
  })
})
