import { Component, OnInit } from '@angular/core'
import { DeckService } from '../../services/deck.service'
import { DeckResponse } from '../../interfaces/deck.interface'
import { filter, switchMap } from 'rxjs'

@Component({
  selector: 'app-game-round',
  standalone: true,
  imports: [],
  templateUrl: './game-round.component.html',
  styleUrl: './game-round.component.scss',
})
export class GameRoundComponent implements OnInit {
  playerCards: string[] = []
  dealerCards: string[] = []

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.startGameRound()
  }

  private startGameRound(): void {
    this.deckService
      .getDeck()
      .pipe(
        filter((deck) => deck !== null),
        switchMap((deck) => {
          if (!deck) {
            throw new Error('Deck is null or undefined')
          }
          return this.deckService.drawCards(deck.deck_id, 4)
        })
      )
      .subscribe({
        next: (response: DeckResponse) => {
          if (response.cards) {
            this.playerCards = [
              `${response.cards[0].value} of ${response.cards[0].suit}`,
              `${response.cards[2].value} of ${response.cards[2].suit}`,
            ]
            this.dealerCards = [
              `${response.cards[1].value} of ${response.cards[1].suit}`,
              `${response.cards[3].value} of ${response.cards[3].suit}`,
            ]
          }
        },
        error: (err) => console.error('Failed to deal cards', err),
      })
  }
}
