/**
 * Log an error message with the Sovendus App Settings prefix
 */
export function loggerError(message: string, ...other: unknown[]): void {
  // eslint-disable-next-line no-console
  console.error(`[Sovendus App Settings] - ${message}`, ...other);
}

/**
 * Log an info message with the Sovendus App Settings prefix
 */
export function loggerInfo(message: string, ...other: unknown[]): void {
  // eslint-disable-next-line no-console
  console.log(`[Sovendus App Settings] - ${message}`, ...other);
}
