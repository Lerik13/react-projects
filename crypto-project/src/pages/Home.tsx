import { useEffect, useState } from 'react'
import { fetchCryptos } from '../api/coinGecko'
import { CryptoCard } from '../components/CryptoCard'
import type { Crypto } from '../types/crypto'

enum Sort {
  market_cap_rank = 'market_cap_rank',
  name = 'name',
  price = 'price',
  price_desc = 'price_desc',
  change = 'change',
  market_cap = 'market_cap',
}

export const Home = () => {
  const [cryptoList, setCryptoList] = useState<Crypto[]>([])
  const [filteredList, setFilteredList] = useState<Crypto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<Sort>(Sort.market_cap_rank)

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

  const filterAndSort = () => {
    const filtered = [...cryptoList]
    filtered.sort((a, b) => {
      switch (sortBy) {
        case Sort.name:
          return a.name.localeCompare(b.name)
        case Sort.price:
          return a.current_price - b.current_price
        case Sort.price_desc:
          return b.current_price - a.current_price
        case Sort.change:
          return a.price_change_percentage_24h - b.price_change_percentage_24h
        case Sort.market_cap:
          return a.market_cap - b.market_cap
        default:
          return a.market_cap_rank - b.market_cap_rank
      }
    })

    setFilteredList(filtered)
  }

  useEffect(() => {
    filterAndSort()
  }, [sortBy, cryptoList])

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as Sort)
  }
  return (
    <div className='app'>
      <div className='controls'>
        <div className='filter-group'>
          <label>Sort by:</label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value={Sort.market_cap_rank}>Rank</option>
            <option value={Sort.name}>Name</option>
            <option value={Sort.price}>Price (Low to High)</option>
            <option value={Sort.price_desc}>Price (High to Low)</option>
            <option value={Sort.change}>24h Change</option>
            <option value={Sort.market_cap}>Market Cap</option>
          </select>
        </div>
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
          {filteredList.map((crypto, key) => (
            <CryptoCard key={key} crypto={crypto} />
          ))}
        </div>
      )}
    </div>
  )
}
