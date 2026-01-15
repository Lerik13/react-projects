export interface Crypto {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap_rank: number
  market_cap: number
  total_volume: number
}

export interface Coin {
  name: string
  symbol: string
  image: { thumb: string; small: string; large: string }
  market_data: {
    market_cap_rank: number
    current_price: { usd: number }
    price_change_percentage_24h: number
    high_24h: { usd: number }
    low_24h: { usd: number }
    market_cap: { usd: number }
    total_volume: { usd: number }
    circulating_supply: string
    total_supply: string
  }
}
