import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react"

interface SortableHeaderProps {
  column: string
  children: React.ReactNode
  sortColumn: string | null
  sortDirection: 'asc' | 'desc'
}

const SortableHeader = ({ column, children, sortColumn, sortDirection }: SortableHeaderProps) => {
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

interface CryptoTableHeaderProps {
  onSort: (column: string) => void
  sortColumn: string | null
  sortDirection: 'asc' | 'desc'
}

export function CryptoTableHeader({ onSort, sortColumn, sortDirection }: CryptoTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead 
          onClick={() => onSort('rank')} 
          className="w-[100px] cursor-pointer"
        >
          <SortableHeader column="rank" sortColumn={sortColumn} sortDirection={sortDirection}>
            Rank
          </SortableHeader>
        </TableHead>
        <TableHead onClick={() => onSort('name')} className="cursor-pointer">
          <SortableHeader column="name" sortColumn={sortColumn} sortDirection={sortDirection}>
            Name
          </SortableHeader>
        </TableHead>
        
        <TableHead onClick={() => onSort('price')} className="cursor-pointer">
          <SortableHeader column="price" sortColumn={sortColumn} sortDirection={sortDirection}>
            Price
          </SortableHeader>
        </TableHead>
        <TableHead onClick={() => onSort('24h')} className="cursor-pointer">
          <SortableHeader column="24h" sortColumn={sortColumn} sortDirection={sortDirection}>
            24h %
          </SortableHeader>
        </TableHead>
        <TableHead onClick={() => onSort('7d')} className="cursor-pointer">
          <SortableHeader column="7d" sortColumn={sortColumn} sortDirection={sortDirection}>
            7d %
          </SortableHeader>
        </TableHead>
        <TableHead onClick={() => onSort('marketCap')} className="cursor-pointer">
          <SortableHeader column="marketCap" sortColumn={sortColumn} sortDirection={sortDirection}>
            Market Cap
          </SortableHeader>
        </TableHead>
        <TableHead onClick={() => onSort('volume')} className="cursor-pointer">
          <SortableHeader column="volume" sortColumn={sortColumn} sortDirection={sortDirection}>
            Volume (24h)
          </SortableHeader>
        </TableHead>
        <TableHead onClick={() => onSort('supply')} className="cursor-pointer">
          <SortableHeader column="supply" sortColumn={sortColumn} sortDirection={sortDirection}>
            Circulating Supply
          </SortableHeader>
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}