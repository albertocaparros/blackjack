import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { DeckDisplayComponent } from './deck-display.component'
import { DeckService } from '../../services/deck.service'

describe('DeckDisplayComponent', () => {
  let fixture: ComponentFixture<DeckDisplayComponent>
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

    await TestBed.configureTestingModule({
      imports: [DeckDisplayComponent],
      providers: [{ provide: DeckService, useValue: mockDeckService }],
    }).compileComponents()

    fixture = TestBed.createComponent(DeckDisplayComponent)
  })

  it('should initialize the deck on load', () => {
    fixture.detectChanges()
    expect(mockDeckService.initializeDeck).toHaveBeenCalled()
  })

  it('should display deck details when loaded', () => {
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.textContent).toContain('Deck ID: test-deck-id')
    expect(compiled.textContent).toContain('Remaining Cards: 52')
  })

  it('should display loading message if deck is not loaded', () => {
    mockDeckService.getDeck.mockReturnValue(of(null))
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.textContent).toContain('Loading...')
  })
})
