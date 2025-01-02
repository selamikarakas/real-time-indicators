import { CryptocurrencyData } from "@/types/cryptocurrency"
import { match } from "ts-pattern"

export const getSortedData = (
  data: CryptocurrencyData[], 
  sortColumn: string | null, 
  sortDirection: 'asc' | 'desc'
) => {
  if (!sortColumn) return data;

  return [...data].sort((a, b) => {
    const getValue = (item: CryptocurrencyData) => match(sortColumn)
      .with('rank', () => item.rank)
      .with('price', () => item.currentPrice)
      .with('24h', () => item.priceChangePercentage24h)
      .with('7d', () => item.priceChangePercentage7d)
      .with('marketCap', () => item.marketCap)
      .with('volume', () => item.volume24h)
      .with('supply', () => item.circulatingSupply)
      .otherwise(() => 0);

    const aValue = getValue(a);
    const bValue = getValue(b);
    
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });
}; 