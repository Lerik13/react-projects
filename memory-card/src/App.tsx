import { useEffect, useState } from 'react'
import { Card } from './components/Card'
import { GameHeader } from './components/GameHeader'

const cardValues: string[] = [
  '🍎',
  '🍌',
  '🍇',
  '🍊',
  '🍓',
  '🥝',
  '🍑',
  '🍒',
  '🍎',
  '🍌',
  '🍇',
  '🍊',
  '🍓',
  '🥝',
  '🍑',
  '🍒',
]

type Cards = {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

function App() {
  const [cards, setCards] = useState<Cards[]>(() =>
    cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }))
  )

  return (
    <div className='app'>
      <GameHeader score={4} moves={10} />

      <div className='cards-grid'>
        {cards.map((card) => (
          <Card card={card.value} />
        ))}
      </div>
    </div>
  )
}

export default App
