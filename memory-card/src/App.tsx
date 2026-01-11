import { Card } from './components/Card'
import { GameHeader } from './components/GameHeader'
import WinMessage from './components/WinMessage'
import { useGameLogic } from './hooks/useGameLogic'

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

function App() {
  const { cards, score, moves, isGameComplete, resetGame, handleCardClick } =
    useGameLogic(cardValues)

  return (
    <div className='app'>
      <GameHeader score={score} moves={moves} onReset={resetGame} />

      {isGameComplete && <WinMessage moves={moves} />}

      <div className='cards-grid'>
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  )
}

export default App
