import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of, throwError } from 'rxjs'
import { GameRoundComponent } from './game-round.component'
import { DeckService } from '../../services/deck.service'

describe('GameRoundComponent', () => {
  let component: GameRoundComponent
  let fixture: ComponentFixture<GameRoundComponent>
  let mockDeckService: jest.Mocked<DeckService>

  beforeEach(async () => {
    mockDeckService = {
      initializeDeck: jest.fn(),
      getDeck: jest.fn(),
      drawCards: jest.fn(),
      getShuffledDeck: jest.fn(),
    } as unknown as jest.Mocked<DeckService>

    mockDeckService.getDeck.mockReturnValue(
      of({
        deck_id: 'test-deck-id',
        success: true,
        shuffled: true,
        remaining: 52,
      })
    )

    mockDeckService.drawCards.mockReturnValue(
      of({
        success: true,
        deck_id: 'test-deck-id',
        shuffled: false,
        remaining: 48,
        cards: [
          {
            value: '5',
            suit: 'CLUBS',
            code: '5C',
            image: 'https://deckofcardsapi.com/static/img/5C.png',
            images: {
              svg: 'https://deckofcardsapi.com/static/img/5C.svg',
              png: 'https://deckofcardsapi.com/static/img/5C.png',
            },
          },
          {
            value: 'KING',
            suit: 'HEARTS',
            code: 'KH',
            image: 'https://deckofcardsapi.com/static/img/KH.png',
            images: {
              svg: 'https://deckofcardsapi.com/static/img/KH.svg',
              png: 'https://deckofcardsapi.com/static/img/KH.png',
            },
          },
          {
            value: '7',
            suit: 'SPADES',
            code: '7S',
            image: 'https://deckofcardsapi.com/static/img/7S.png',
            images: {
              svg: 'https://deckofcardsapi.com/static/img/7S.svg',
              png: 'https://deckofcardsapi.com/static/img/7S.png',
            },
          },
          {
            value: 'ACE',
            suit: 'DIAMONDS',
            code: 'AD',
            image: 'https://deckofcardsapi.com/static/img/AD.png',
            images: {
              svg: 'https://deckofcardsapi.com/static/img/AD.svg',
              png: 'https://deckofcardsapi.com/static/img/AD.png',
            },
          },
        ],
      })
    )

    await TestBed.configureTestingModule({
      imports: [GameRoundComponent],
      providers: [{ provide: DeckService, useValue: mockDeckService }],
    }).compileComponents()

    fixture = TestBed.createComponent(GameRoundComponent)
    component = fixture.componentInstance
  })

  it('should wait for deck and draw cards when ready', () => {
    fixture.detectChanges()
    expect(mockDeckService.drawCards).toHaveBeenCalledWith('test-deck-id', 4)
    expect(component.playerCards).toEqual(['5 of CLUBS', '7 of SPADES'])
    expect(component.dealerCards).toEqual(['KING of HEARTS', 'ACE of DIAMONDS'])
  })

  it('should handle errors during card drawing', () => {
    mockDeckService.drawCards.mockReturnValue(
      throwError(() => new Error('API error'))
    )
    fixture.detectChanges()
    expect(mockDeckService.drawCards).toHaveBeenCalled()
  })
})
