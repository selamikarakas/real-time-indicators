'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { CryptocurrencyData } from "@/types/cryptocurrency"
import { useState } from "react"
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpDown,
  ChevronUp,
  ChevronDown
} from "lucide-react"
import { getUniqueKey } from "@/lib/utils"

interface CryptoTableProps {
  data: CryptocurrencyData[]
}

export function CryptoTable({ data }: CryptoTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const getSortedData = (data: CryptocurrencyData[]) => {
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

      if (sortDirection === 'asc') {
        return aValue - bValue;
      }
      return bValue - aValue;
    });
  };

  const getCurrentPageData = () => {
    const sortedData = getSortedData(data);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  };

  // Format number to currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Format large numbers
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: "compact",
      compactDisplay: "short",
    }).format(value)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const PriceChangeCell = ({ value }: { value: number }) => {
    const isPositive = value >= 0
    const Icon = isPositive ? TrendingUp : TrendingDown
    
    return (
      <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <Icon size={16} />
        <span>{value.toFixed(2)}%</span>
      </div>
    )
  }

  const SortableHeader = ({ column, children }: { column: string, children: React.ReactNode }) => {
    const isSorted = sortColumn === column;
    const Icon = isSorted 
      ? (sortDirection === 'asc' ? ChevronUp : ChevronDown)
      : ArrowUpDown;

    return (
      <div className="flex items-center gap-1">
        {children}
        <Icon 
          size={16} 
          className={`${isSorted ? 'text-primary' : 'text-gray-500'}`}
        />
      </div>
    );
  };

  // First, let's add sorting state
  const [sortColumn, setSortColumn] = useState<string | null>('rank')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  // Add a sort handler function
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              onClick={() => handleSort('rank')} 
              className="w-[100px] cursor-pointer"
            >
              <SortableHeader column="rank">
                Rank
              </SortableHeader>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead onClick={() => handleSort('price')} className="cursor-pointer">
              <SortableHeader column="price">
                Price
              </SortableHeader>
            </TableHead>
            <TableHead onClick={() => handleSort('24h')} className="cursor-pointer">
              <SortableHeader column="24h">
                24h %
              </SortableHeader>
            </TableHead>
            <TableHead onClick={() => handleSort('7d')} className="cursor-pointer">
              <SortableHeader column="7d">
                7d %
              </SortableHeader>
            </TableHead>
            <TableHead onClick={() => handleSort('marketCap')} className="cursor-pointer">
              <SortableHeader column="marketCap">
                Market Cap
              </SortableHeader>
            </TableHead>
            <TableHead onClick={() => handleSort('volume')} className="cursor-pointer">
              <SortableHeader column="volume">
                Volume (24h)
              </SortableHeader>
            </TableHead>
            <TableHead onClick={() => handleSort('supply')} className="cursor-pointer">
              <SortableHeader column="supply">
                Circulating Supply
              </SortableHeader>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentPageData().map((crypto, index) => (
            <TableRow key={getUniqueKey(crypto, index)}>
              <TableCell>{crypto.rank}</TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-500">{crypto.symbol}</span>
                  <span>{crypto.name}</span>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(crypto.currentPrice)}</TableCell>
              <TableCell className={crypto.priceChangePercentage24h > 0 ? 'text-green-600' : 'text-red-600'}>
                {formatPercentage(crypto.priceChangePercentage24h)}
              </TableCell>
              <TableCell className={crypto.priceChangePercentage7d > 0 ? 'text-green-600' : 'text-red-600'}>
                {formatPercentage(crypto.priceChangePercentage7d)}
              </TableCell>
              <TableCell>{formatCurrency(crypto.marketCap)}</TableCell>
              <TableCell>{formatNumber(crypto.volume24h)}</TableCell>
              <TableCell>{formatNumber(crypto.circulatingSupply)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
} 