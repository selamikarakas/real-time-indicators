import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CryptocurrencyData } from "@/types/cryptocurrency"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUniqueKey = (crypto: CryptocurrencyData, index: number): string => {
  return `${crypto.id}-${crypto.rank}-${crypto.symbol}-${index}`;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    compactDisplay: "short",
  }).format(value)
}

export const formatPercentage = (value: number) => {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
}
