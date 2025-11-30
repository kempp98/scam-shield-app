/**
 * Logging utility for the application
 * Logs to console in development, can be extended to send to external services in production
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Log an error message
   * In production, this could be sent to an error tracking service like Sentry
   */
  error(message: string, error?: unknown): void {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error);
    }
    // In production: send to error tracking service
    // Example: Sentry.captureException(error, { extra: { message } });
  }

  /**
   * Log a warning message
   */
  warn(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data);
    }
  }

  /**
   * Log an informational message
   */
  info(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, data);
    }
  }

  /**
   * Log a debug message (only in development)
   */
  debug(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, data);
    }
  }

  /**
   * Generic log method with level
   */
  log(level: LogLevel, message: string, data?: unknown): void {
    switch (level) {
      case 'error':
        this.error(message, data);
        break;
      case 'warn':
        this.warn(message, data);
        break;
      case 'info':
        this.info(message, data);
        break;
      case 'debug':
        this.debug(message, data);
        break;
    }
  }
}

// Export a singleton instance
export const logger = new Logger();
