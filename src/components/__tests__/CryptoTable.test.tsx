import { render, screen, fireEvent, within } from '@testing-library/react'
import { CryptoTable } from '../CryptoTable'
import { CryptocurrencyData } from '@/types/cryptocurrency'

const mockData: CryptocurrencyData[] = [
  {
    id: "bitcoin",
    rank: 1,
    symbol: "BTC",
    name: "Bitcoin",
    currentPrice: 65432.89,
    marketCap: 1285632547896,
    volume24h: 48562314785,
    circulatingSupply: 19584362,
    totalSupply: 21000000,
    priceChangePercentage24h: 2.45,
    priceChangePercentage7d: -1.23,
    ath: 69044.77,
    athDate: "2021-11-10T14:24:11.849Z",
    lastUpdated: "2024-03-20T10:00:00.000Z"
  },
  // Add more mock data to test pagination
  ...Array(15).fill(null).map((_, index) => ({
    id: `crypto-${index + 2}`,
    rank: index + 2,
    symbol: `CRY${index + 2}`,
    name: `Crypto ${index + 2}`,
    currentPrice: 1000 + index,
    marketCap: 1000000000 + index,
    volume24h: 10000000 + index,
    circulatingSupply: 1000000 + index,
    totalSupply: 2000000 + index,
    priceChangePercentage24h: index % 2 === 0 ? 1.23 : -1.23,
    priceChangePercentage7d: index % 2 === 0 ? 2.34 : -2.34,
    ath: 2000 + index,
    athDate: "2021-11-10T14:24:11.849Z",
    lastUpdated: "2024-03-20T10:00:00.000Z"
  }))
]

describe('CryptoTable', () => {
  it('renders the table with correct headers', () => {
    render(<CryptoTable data={mockData} />)
    
    expect(screen.getByText('Rank')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByText('24h %')).toBeInTheDocument()
    expect(screen.getByText('7d %')).toBeInTheDocument()
    expect(screen.getByText('Market Cap')).toBeInTheDocument()
    expect(screen.getByText('Volume (24h)')).toBeInTheDocument()
    expect(screen.getByText('Circulating Supply')).toBeInTheDocument()
  })

  it('displays correct number of rows per page', () => {
    render(<CryptoTable data={mockData} />)
    
    const rows = screen.getAllByRole('row')
    // Add 1 for header row
    expect(rows.length).toBe(11) // 10 data rows + 1 header row
  })

  it('handles pagination correctly', () => {
    render(<CryptoTable data={mockData} />)
    
    // Check first page content
    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    
    // Go to next page
    const nextButton = screen.getByRole('button', { name: /go to next page/i })
    fireEvent.click(nextButton)
    
    // Check second page content
    expect(screen.getByText('Crypto 11')).toBeInTheDocument()
    
    // Go back to first page
    const prevButton = screen.getByRole('button', { name: /go to previous page/i })
    fireEvent.click(prevButton)
    
    // Verify we're back on first page
    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
  })

  it('formats numbers correctly', () => {
    render(<CryptoTable data={mockData} />)
    
    // Check currency formatting
    expect(screen.getByText('$65,432.89')).toBeInTheDocument()
    
    // Check percentage formatting for Bitcoin specifically
    const bitcoinRow = screen.getByRole('row', { name: /bitcoin/i })
    expect(within(bitcoinRow).getByText('+2.45%')).toBeInTheDocument()
    expect(within(bitcoinRow).getByText('-1.23%')).toBeInTheDocument()
  })
}) 