import { useEffect, useState } from 'react'
import { fetchCryptos } from '../api/coinGecko'
import { CryptoCard } from '../components/CryptoCard'
import type { Crypto } from '../types/crypto'

export const Home = () => {
  const [cryptoList, setCryptoList] = useState<Crypto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const fetchCryptoData = async () => {
    try {
      const data = await fetchCryptos()
      setCryptoList(data)
    } catch (err) {
      console.error('Error fetching crypto: ', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCryptoData()
  }, [])

  return (
    <div className='app'>
      <div className='controls'>
        <div className='filter-group'></div>
        <div className='view-toggle'>
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            Grid
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className='loading'>
          <div className='spinner'></div>
          <p>Loading crypto data...</p>
        </div>
      ) : (
        <div className={`crypto-container ${viewMode}`}>
          {cryptoList.map((crypto, key) => (
            <CryptoCard key={key} crypto={crypto} />
          ))}
        </div>
      )}
    </div>
  )
}
