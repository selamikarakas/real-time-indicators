export interface CryptocurrencyData {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number | null;
  priceChangePercentage24h: number;
  priceChangePercentage7d: number;
  ath: number;
  athDate: string;
  lastUpdated: string;
} 