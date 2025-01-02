import { CryptocurrencyData } from "@/types/cryptocurrency"

export const getSortedData = (
  data: CryptocurrencyData[], 
  sortColumn: string | null, 
  sortDirection: 'asc' | 'desc'
) => {
  if (!sortColumn) return data;

  return [...data].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    switch (sortColumn) {
      case 'rank':
        aValue = a.rank;
        bValue = b.rank;
        break;
      case 'price':
        aValue = a.currentPrice;
        bValue = b.currentPrice;
        break;
      case '24h':
        aValue = a.priceChangePercentage24h;
        bValue = b.priceChangePercentage24h;
        break;
      case '7d':
        aValue = a.priceChangePercentage7d;
        bValue = b.priceChangePercentage7d;
        break;
      case 'marketCap':
        aValue = a.marketCap;
        bValue = b.marketCap;
        break;
      case 'volume':
        aValue = a.volume24h;
        bValue = b.volume24h;
        break;
      case 'supply':
        aValue = a.circulatingSupply;
        bValue = b.circulatingSupply;
        break;
      default:
        return 0;
    }

    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });
}; 