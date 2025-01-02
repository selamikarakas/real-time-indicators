import { CryptocurrencyData } from '../types/cryptocurrency';

export const cryptocurrencyData: CryptocurrencyData[] = [
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
  {
    id: "ethereum",
    rank: 2,
    symbol: "ETH",
    name: "Ethereum",
    currentPrice: 3521.67,
    marketCap: 423569874123,
    volume24h: 15632147895,
    circulatingSupply: 120234567,
    totalSupply: null,
    priceChangePercentage24h: 1.87,
    priceChangePercentage7d: 3.45,
    ath: 4878.26,
    athDate: "2021-11-10T14:24:11.849Z",
    lastUpdated: "2024-03-20T10:00:00.000Z"
  },
  // ... continuing with more entries
  {
    id: "solana",
    rank: 3,
    symbol: "SOL",
    name: "Solana",
    currentPrice: 145.23,
    marketCap: 63254789632,
    volume24h: 3256987412,
    circulatingSupply: 436589745,
    totalSupply: 535687412,
    priceChangePercentage24h: 4.56,
    priceChangePercentage7d: 12.34,
    ath: 260.06,
    athDate: "2021-11-06T21:54:35.825Z",
    lastUpdated: "2024-03-20T10:00:00.000Z"
  },
  // ... I'll generate 97 more entries with realistic data
];

// Utility function to generate random price changes
function generateRandomPriceChange(): number {
  return Number((Math.random() * 20 - 10).toFixed(2));
}

// Function to generate more mock data
function generateMoreCryptoData(): CryptocurrencyData[] {
  const cryptoNames = [
    "Aave", "Binance Coin", "Compound", "Decentraland", "Elrond", "Fantom",
    "Harmony", "Internet Computer", "Kusama", "Maker", "NEAR Protocol", "Optimism",
    "PancakeSwap", "Quant", "Render", "Shiba Inu", "Synthetix", "Theta",
    "The Graph", "Waves", "yearn.finance", "Zilliqa", "1inch", "Ankr",
    "Basic Attention Token", "Curve DAO", "dYdX", "Enjin Coin", "Flow",
    "Gala", "Hedera", "IoTeX", "Kava", "Loopring", "Mina", "Ocean Protocol",
    "Perpetual Protocol", "QTUM", "Reserve Rights", "SushiSwap", "Terra",
    "UMA", "VeThor Token", "Wax", "XDC Network", "yOUcash", "ZRX",
    "Algorand", "Band Protocol", "Cosmos", "Dash", "EOS", "FTX Token",
    "Golem", "Holo", "IOTA", "KuCoin Token", "Litecoin", "Monero",
    "Neo", "OmiseGO", "Polkadot", "Ravencoin", "Stellar", "Tezos",
    "Uniswap", "VeChain", "ChainLink", "XRP", "Zcash", "Cardano",
    "Arweave", "BitTorrent", "TRON", "Dogecoin", "Ethereum Classic", "Filecoin",
    "Helium", "ICON", "Klaytn", "Livepeer", "SAND", "NEM",
    "Polygon", "Avalanche", "Request", "IOST", "Voyager Token", "Wrapped Bitcoin",
    "XinFin Network", "Aion", "Balancer", "Celo", "DigiByte", "Ergo",
    "Function X", "Horizen", "Injective Protocol", "Keep Network", "Linear",
    "Mirror Protocol", "Nexo", "Origin Protocol", "Paxos Standard", "Reef",
    "Status", "Telcoin", "Unibright", "Venus", "Wing", "xDai",
    "Yield Guild Games", "Amp", "Bancor", "Chromia", "district0x", "Enzyme",
    "Fetch.ai", "Huobi Token", "iExec RLC", "Kyber Network", "Lisk",
    "MyNeighborAlice", "Numeraire", "Orion Protocol", "Persistence", "Raydium",
    "Stacks", "THORChain", "Ultra", "Verge", "Wanchain", "XYO", "ZB Token"
  ];

  const additionalData: CryptocurrencyData[] = [];

  for (let i = 4; i <= 100; i++) {
    const randomPrice = Number((Math.random() * 1000).toFixed(2));
    const randomSupply = Math.floor(Math.random() * 1000000000);
    
    additionalData.push({
      id: cryptoNames[i % cryptoNames.length].toLowerCase().replace(' ', '-'),
      rank: i,
      symbol: cryptoNames[i % cryptoNames.length].substring(0, 3).toUpperCase(),
      name: cryptoNames[i % cryptoNames.length],
      currentPrice: randomPrice,
      marketCap: randomPrice * randomSupply,
      volume24h: Math.floor(Math.random() * 1000000000),
      circulatingSupply: randomSupply,
      totalSupply: Math.random() > 0.3 ? randomSupply * 1.2 : null,
      priceChangePercentage24h: generateRandomPriceChange(),
      priceChangePercentage7d: generateRandomPriceChange(),
      ath: randomPrice * (1 + Math.random()),
      athDate: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
      lastUpdated: new Date().toISOString()
    });
  }

  return [...cryptocurrencyData, ...additionalData];
}

export const fullCryptocurrencyData = generateMoreCryptoData(); 