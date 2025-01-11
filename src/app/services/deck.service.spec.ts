import { TestBed } from '@angular/core/testing'
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing'
import { DeckService } from './deck.service'
import { provideHttpClient } from '@angular/common/http'
import { DeckResponse } from '../interfaces/deck.interface'

describe('DeckService', () => {
  let service: DeckService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeckService, provideHttpClient(), provideHttpClientTesting()],
    })
    service = TestBed.inject(DeckService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should fetch a shuffled deck', () => {
    const mockResponse: DeckResponse = {
      success: true,
      deck_id: '3p40paa87x90',
      shuffled: true,
      remaining: 52,
    }

    service.getShuffledDeck().subscribe((response: DeckResponse) => {
      expect(response).toEqual(mockResponse)
    })

    const req = httpMock.expectOne(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    )
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should draw cards from a deck', () => {
    const mockDeckId = '3p40paa87x90'
    const mockCount = 2
    const mockResponse: DeckResponse = {
      success: true,
      deck_id: mockDeckId,
      shuffled: false,
      remaining: 50,
    }

    service
      .drawCards(mockDeckId, mockCount)
      .subscribe((response: DeckResponse) => {
        expect(response).toEqual(mockResponse)
      })

    const req = httpMock.expectOne(
      `https://deckofcardsapi.com/api/deck/${mockDeckId}/draw/?count=${mockCount}`
    )
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })
})
