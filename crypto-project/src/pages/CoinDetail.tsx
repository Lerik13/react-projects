import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { fetchCoinData } from '../api/coinGecko'
import type { Coin } from '../types/crypto'
import { formatPrice } from '../utils/formatter'

export const CoinDetail = () => {
  const { id } = useParams<string>()
  const [coin, setCoin] = useState<Coin | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const loadCoinData = async () => {
    try {
      const data = await fetchCoinData(id)
      setCoin(data)
      console.log(data)
    } catch (err) {
      console.error('Error fetching crypto: ', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCoinData()
  }, [id])

  if (isLoading) {
    return (
      <div className='loading'>
        <div className='spinner'></div>
        <p>Loading const first = useContext(second) data...</p>
      </div>
    )
  }

  if (!coin) {
    return (
      <div className='app'>
        <div className='no-results'>
          <p>Coin not found</p>
          <button onClick={() => navigate('/')} className='back-button'>
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const price_change = coin.market_data.price_change_percentage_24h || 0
  const isPositive = price_change >= 0

  return (
    <div className='app'>
      <header>
        <div className='header-content'>
          <div className='logo-section'>
            <h1>🚀 Crypto Tracker</h1>
            <p>Real-time crypto-currency prices and market data</p>
          </div>
          <div className='search-section'></div>

          <button onClick={() => navigate('/')} className='back-button'>
            ← Back to List
          </button>
        </div>
      </header>

      <div className='coin-detail'>
        <div className='coin-header'>
          <div className='coin-title'>
            <img src={coin.image.large} alt={coin.name} />
            <div>
              <h1>{coin.name}</h1>
              <p className='symbol'>{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
          <span>Rank #{coin.market_data.market_cap_rank}</span>
        </div>

        <div className='coin-price-section'>
          <div className='current-price'>
            <p className='price'>
              {formatPrice(coin.market_data.current_price.usd)}
            </p>
            <span
              className={`change-badge ${isPositive ? 'positive' : 'negative'}`}
            >
              {isPositive ? '↑' : '↓'} {Math.abs(price_change).toFixed(2)}%
            </span>
          </div>

          <div className='price-ranges'>
            <div className='price-range'>
              <span className='range-label'>24h High</span>
              <span className='range-value'>
                {formatPrice(coin.market_data.high_24h.usd)}|
              </span>
            </div>
            <div className='price-range'>
              <span className='range-label'>24h Low</span>
              <span className='range-value'>
                {formatPrice(coin.market_data.low_24h.usd)}|
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
