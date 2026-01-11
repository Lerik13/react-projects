import { useState } from 'react'

export type Cards = {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

const shuffleArray = (array: string[]) => {
  const shuffled: string[] = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface ReturnType {
  cards: Cards[]
  score: number
  moves: number
  isGameComplete: boolean
  resetGame: () => void
  handleCardClick: (card: Cards) => void
}

export const useGameLogic = (cardValues: string[]): ReturnType => {
  const createCards = (): Cards[] => {
    return shuffleArray(cardValues).map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }))
  }

  const [cards, setCards] = useState<Cards[]>(createCards)
  const [flippedCards, setFlippedCards] = useState<number[]>([]) // tracking 2 cards, that are flipped
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [score, setScore] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [isLocked, setIsLocked] = useState<boolean>(false)

  const resetGame = (): void => {
    setCards(createCards())
    setScore(0)
    setMoves(0)
    setFlippedCards([])
    setMatchedCards([])
    setIsLocked(false)
  }

  const handleCardClick = (card: Cards) => {
    // Don't allow clicking if card is already flipped, matched
    if (
      card.isFlipped ||
      card.isMatched ||
      isLocked ||
      flippedCards.length === 2
    ) {
      return
    }

    // Update card flipped state
    const newCards: Cards[] = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true }
      } else {
        return c
      }
    })
    setCards(newCards)

    const newFlippedCards: number[] = [...flippedCards, card.id]
    setFlippedCards(newFlippedCards)

    // Check for match if 2 cards are flipped
    if (flippedCards.length === 1) {
      const firstCard: Cards = cards[flippedCards[0]]

      if (firstCard.value === card.value) {
        setIsLocked(true)

        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id])

          setScore((prev) => prev + 1)

          setCards((prev) =>
            prev.map((c: Cards) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true }
              } else {
                return c
              }
            })
          )
          setFlippedCards([])
          setIsLocked(false)
        }, 500)
      } else {
        // flip back card 1, card 2
        setTimeout(() => {
          const flippedBackCard: Cards[] = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false }
            } else {
              return c
            }
          })

          setCards(flippedBackCard)
          setFlippedCards([])
          setIsLocked(false)
        }, 1000)
      }

      setMoves((prev) => prev + 1)
    }
  }

  const isGameComplete: boolean = matchedCards.length === cardValues.length

  return { cards, score, moves, isGameComplete, resetGame, handleCardClick }
}
