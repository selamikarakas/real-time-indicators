'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { CryptocurrencyData } from "@/types/cryptocurrency"
import { useState } from "react"

interface CryptoTableProps {
  data: CryptocurrencyData[]
}

export function CryptoTable({ data }: CryptoTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

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

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>24h %</TableHead>
            <TableHead>7d %</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Volume (24h)</TableHead>
            <TableHead>Circulating Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentPageData().map((crypto) => (
            <TableRow key={crypto.id}>
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                  className="cursor-pointer"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
} 