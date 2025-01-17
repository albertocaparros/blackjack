export interface Card {
  code: string
  image: string
  images: {
    svg: string
    png: string
  }
  value: string
  suit: 'CLUBS' | 'DIAMONDS' | 'HEARTS' | 'SPADES'
}
