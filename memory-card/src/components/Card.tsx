import type { Cards } from '../App'

type Props = {
  card: Cards
  onClick: (card: Cards) => void
}

export const Card = ({ card, onClick }: Props) => {
  return (
    <div
      className={`card ${card.isFlipped ? 'flipped' : ''} ${
        card.isMatched ? 'matched' : ''
      }`}
      onClick={() => onClick(card)}
    >
      <div className='card-front'>?</div>
      <div className='card-back'>{card.value}</div>
    </div>
  )
}
