import { useEffect, useState } from 'react'
import { fetchCryptos } from '../api/coinGecko'
import { CryptoCard } from '../components/CryptoCard'

export const Home = () => {
  const [cryptoList, setCryptoList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      {isLoading ? (
        <div className='loading'>
          <div className='spinner'></div>
          <p>Loading crypto data...</p>
        </div>
      ) : (
        <div className='crypto-container'>
          {cryptoList.map((crypto, key) => (
            <CryptoCard key={key} crypto={crypto} />
          ))}
        </div>
      )}
    </div>
  )
}
