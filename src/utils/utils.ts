import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function loggerError(message: string, ...other: unknown[]): void {
  // eslint-disable-next-line no-console
  console.error(`[Sovendus App Settings] - ${message}`, ...other);
}

export function loggerInfo(message: string, ...other: unknown[]): void {
  // eslint-disable-next-line no-console
  console.log(`[Sovendus App Settings] - ${message}`, ...other);
}
