import React from 'react'

type Props = {
  moves: number
}

const WinMessage = ({ moves }: Props) => {
  return (
    <div className='win-message'>
      <h2>Congratulations</h2>
      <p>You completed the game in {moves} moves</p>
    </div>
  )
}

export default WinMessage
