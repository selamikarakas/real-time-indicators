'use client'

import { Table, TableBody } from "@/components/ui/table"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { CryptocurrencyData } from "@/types/cryptocurrency"
import { useState } from "react"
import { CryptoTableHeader } from "./table/CryptoTableHeader"
import { CryptoTableRow } from "./table/CryptoTableRow"
import { getSortedData } from "@/lib/sorting"

interface CryptoTableProps {
  data: CryptocurrencyData[]
}

const ASCENDING_COLUMNS = ["rank", "name"];

export function CryptoTable({ data }: CryptoTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string | null>('rank')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const itemsPerPage = 10
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection(ASCENDING_COLUMNS.includes(column) ? 'asc' : 'desc')
    }
  }

  const getCurrentPageData = () => {
    const sortedData = getSortedData(data, sortColumn, sortDirection);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }

  return (
    <div className="w-full">
      <Table>
        <CryptoTableHeader
          onSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <TableBody>
          {getCurrentPageData().map((crypto, index) => (
            <CryptoTableRow
              key={`${crypto.id}-${crypto.rank}-${index}`}
              crypto={crypto}
              index={index}
            />
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