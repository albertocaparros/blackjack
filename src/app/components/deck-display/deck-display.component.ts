import { Component, OnInit } from '@angular/core'
import { DeckService } from '../../services/deck.service'
import { DeckResponse } from '../../interfaces/deck.interface'

@Component({
  selector: 'app-deck-display',
  standalone: true,
  imports: [],
  templateUrl: './deck-display.component.html',
  styleUrl: './deck-display.component.scss',
})
export class DeckDisplayComponent implements OnInit {
  deck: DeckResponse | null = null

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.deckService.initializeDeck()
    this.deckService.getDeck().subscribe((deck) => (this.deck = deck))
  }
}
