const mockCards = [
  {
    code: 'AS',
    image: '',
    images: { svg: '', png: '' },
    value: 'ACE',
    suit: 'SPADES',
  },
  {
    code: '2H',
    image: '',
    images: { svg: '', png: '' },
    value: '2',
    suit: 'HEARTS',
  },
  {
    code: '3D',
    image: '',
    images: { svg: '', png: '' },
    value: '3',
    suit: 'DIAMONDS',
  },
  {
    code: '4C',
    image: '',
    images: { svg: '', png: '' },
    value: '4',
    suit: 'CLUBS',
  },
]

beforeEach(() => {
  cy.intercept('GET', '**/api/deck/new/shuffle/**', {
    statusCode: 200,
    body: {
      success: true,
      deck_id: 'mock-deck-e2e',
      shuffled: true,
      remaining: 52,
    },
  }).as('shuffleDeck')

  cy.intercept('GET', '**/api/deck/mock-deck-e2e/draw/**', {
    statusCode: 200,
    body: {
      success: true,
      deck_id: 'mock-deck-e2e',
      remaining: 48,
      cards: mockCards,
    },
  }).as('drawCards')
})
