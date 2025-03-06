import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(prefixClass(inputs));
}

function prefixClass(classNames: ClassValue[]): string {
  const prefix = "";
  return clsx(classNames)
    .split(" ")
    .map((className) => `${prefix}${className}`)
    .join(" ");
}

export function loggerError(message: string, ...other: unknown[]): void {
  // eslint-disable-next-line no-console
  console.error(`[Sovendus App Settings] - ${message}`, ...other);
}

export function loggerInfo(message: string, ...other: unknown[]): void {
  // eslint-disable-next-line no-console
  console.log(`[Sovendus App Settings] - ${message}`, ...other);
}
