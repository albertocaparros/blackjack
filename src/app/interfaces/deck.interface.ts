import { Card } from './card.interface'

export interface DeckResponse {
  success: boolean
  deck_id: string
  shuffled: boolean
  remaining: number
  cards?: Card[]
}
