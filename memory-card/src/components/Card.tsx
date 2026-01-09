type Props = {
  card: string
}

export const Card = ({ card }: Props) => {
  return (
    <div className='card'>
      <div className='card-front'>?</div>
      <div className='card-back'>{card}</div>
    </div>
  )
}
