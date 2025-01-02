import { CryptoTable } from "@/components/CryptoTable"
import { fullCryptocurrencyData } from "@/data/cryptocurrencyData"

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Cryptocurrency Market</h1>
      <CryptoTable data={fullCryptocurrencyData} />
    </main>
  )
}
