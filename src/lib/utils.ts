import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUniqueKey = (crypto: CryptocurrencyData, index: number): string => {
  return `${crypto.id}-${crypto.rank}-${crypto.symbol}-${index}`;
};
