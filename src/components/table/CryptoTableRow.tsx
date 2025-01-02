import { TableCell, TableRow } from "@/components/ui/table"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { CryptocurrencyData } from "@/types/cryptocurrency"
import { TrendingDown, TrendingUp } from "lucide-react"

interface PriceChangeCellProps {
  value: number
}

const PriceChangeCell = ({ value }: PriceChangeCellProps) => {
  const isPositive = value >= 0
  const Icon = isPositive ? TrendingUp : TrendingDown
  
  return (
    <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      <Icon size={16} />
      <span>{value.toFixed(2)}%</span>
    </div>
  )
}

interface CryptoTableRowProps {
  crypto: CryptocurrencyData
  index: number
}

export function CryptoTableRow({ crypto, index }: CryptoTableRowProps) {
  return (
    <TableRow key={`${crypto.id}-${crypto.rank}-${crypto.symbol}-${index}`}>
      <TableCell>{crypto.rank}</TableCell>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-gray-500">{crypto.symbol}</span>
          <span>{crypto.name}</span>
        </div>
      </TableCell>
      <TableCell>{formatCurrency(crypto.currentPrice)}</TableCell>
      <TableCell>
        <PriceChangeCell value={crypto.priceChangePercentage24h} />
      </TableCell>
      <TableCell>
        <PriceChangeCell value={crypto.priceChangePercentage7d} />
      </TableCell>
      <TableCell>{formatCurrency(crypto.marketCap)}</TableCell>
      <TableCell>{formatNumber(crypto.volume24h)}</TableCell>
      <TableCell>{formatNumber(crypto.circulatingSupply)}</TableCell>
    </TableRow>
  )
} 