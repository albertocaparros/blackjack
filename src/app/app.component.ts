import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { DeckDisplayComponent } from './components/deck-display/deck-display.component'
import { GameRoundComponent } from './components/game-round/game-round.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DeckDisplayComponent, GameRoundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'blackjack'
}
