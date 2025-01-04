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
      .with('name', () => item.symbol?.toLowerCase() ?? '') // Handling name safely
      .otherwise(() => 0);

    const aValue = getValue(a);
    const bValue = getValue(b);

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      // For string comparisons (name column)
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      // For numerical comparisons (e.g., rank, price)
      return sortDirection === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }

    // If aValue and bValue are not the same type, return 0 or custom handling
    return 0;
  });
};
