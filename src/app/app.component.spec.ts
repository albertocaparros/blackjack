import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { DeckDisplayComponent } from './components/deck-display/deck-display.component'
import { GameRoundComponent } from './components/game-round/game-round.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Mock HttpClient
        AppComponent, // Add standalone component to imports
        DeckDisplayComponent, // Add standalone component to imports
        GameRoundComponent, // Add standalone component to imports
      ],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have the title 'blackjack'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('blackjack')
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Blackjack Game'
    )
  })
})
