import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { DeckResponse } from '../interfaces/deck.interface'

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private readonly API_BASE_URL = 'https://deckofcardsapi.com/api/deck'
  private deckSubject = new BehaviorSubject<DeckResponse | null>(null)

  constructor(private http: HttpClient) {}

  initializeDeck(): void {
    this.getShuffledDeck().subscribe({
      next: (response) => {
        this.deckSubject.next(response)
      },
      error: (err) => console.error('Failed to initialize deck', err),
    })
  }

  getShuffledDeck(): Observable<DeckResponse> {
    return this.http.get<DeckResponse>(
      `${this.API_BASE_URL}/new/shuffle/?deck_count=1`
    )
  }

  getDeck(): Observable<DeckResponse | null> {
    return this.deckSubject.asObservable()
  }

  /**
   * Draw cards from a deck.
   * @param deckId - The ID of the deck.
   * @param count - The number of cards to draw.
   */
  drawCards(deckId: string, count: number): Observable<DeckResponse> {
    return this.http.get<DeckResponse>(
      `${this.API_BASE_URL}/${deckId}/draw/?count=${count}`
    )
  }
}
