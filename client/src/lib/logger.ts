import { DEBUG_CONFIG } from '@/config';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  error?: Error;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private enableConsole = DEBUG_CONFIG.enabled;
  private logLevel = DEBUG_CONFIG.logLevel as keyof typeof LogLevel;

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const currentLevelIndex = levels.indexOf(level);
    const configLevelIndex = levels.indexOf(
      LogLevel[this.logLevel as keyof typeof LogLevel] || LogLevel.INFO
    );
    return currentLevelIndex >= configLevelIndex;
  }

  private formatMessage(level: LogLevel, message: string): string {
    return `[${this.getTimestamp()}] [${level}] ${message}`;
  }

  private addToLogs(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  debug(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const entry: LogEntry = {
      level: LogLevel.DEBUG,
      message,
      timestamp: this.getTimestamp(),
      data,
    };

    this.addToLogs(entry);

    if (this.enableConsole) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message), data);
    }
  }

  info(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const entry: LogEntry = {
      level: LogLevel.INFO,
      message,
      timestamp: this.getTimestamp(),
      data,
    };

    this.addToLogs(entry);

    if (this.enableConsole) {
      console.info(this.formatMessage(LogLevel.INFO, message), data);
    }
  }

  warn(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const entry: LogEntry = {
      level: LogLevel.WARN,
      message,
      timestamp: this.getTimestamp(),
      data,
    };

    this.addToLogs(entry);

    if (this.enableConsole) {
      console.warn(this.formatMessage(LogLevel.WARN, message), data);
    }
  }

  error(message: string, error?: Error | any, data?: any): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;

    const entry: LogEntry = {
      level: LogLevel.ERROR,
      message,
      timestamp: this.getTimestamp(),
      error: error instanceof Error ? error : new Error(String(error)),
      data,
    };

    this.addToLogs(entry);

    if (this.enableConsole) {
      console.error(this.formatMessage(LogLevel.ERROR, message), error, data);
    }
  }

  /**
   * Log API call
   */
  logApiCall(method: string, endpoint: string, status?: number, duration?: number): void {
    const message = `${method} ${endpoint}${status ? ` (${status})` : ''}${duration ? ` [${duration}ms]` : ''}`;
    this.info(`API: ${message}`);
  }

  /**
   * Log API error
   */
  logApiError(method: string, endpoint: string, error: any): void {
    this.error(`API Error: ${method} ${endpoint}`, error);
  }

  /**
   * Log image upload
   */
  logImageUpload(fileName: string, size: number, success: boolean): void {
    const message = `Image Upload: ${fileName} (${(size / 1024).toFixed(2)}KB) - ${success ? 'Success' : 'Failed'}`;
    if (success) {
      this.info(message);
    } else {
      this.warn(message);
    }
  }

  /**
   * Log database operation
   */
  logDatabaseOperation(operation: string, collection: string, result: boolean): void {
    const message = `DB ${operation.toUpperCase()}: ${collection} - ${result ? 'Success' : 'Failed'}`;
    if (result) {
      this.info(message);
    } else {
      this.warn(message);
    }
  }

  /**
   * Get all logs
   */
  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter((log) => log.level === level);
    }
    return [...this.logs];
  }

  /**
   * Get logs as string
   */
  getLogsAsString(limit: number = 100): string {
    return this.logs
      .slice(-limit)
      .map(
        (log) =>
          `${log.timestamp} [${log.level}] ${log.message}${log.data ? ` | ${JSON.stringify(log.data)}` : ''}`
      )
      .join('\n');
  }

  /**
   * Export logs
   */
  exportLogs(): string {
    const logsText = this.getLogsAsString(this.logs.length);
    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    return logsText;
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
    this.info('Logs cleared');
  }

  /**
   * Set console logging
   */
  setConsoleLogging(enabled: boolean): void {
    this.enableConsole = enabled;
  }

  /**
   * Set log level
   */
  setLogLevel(level: keyof typeof LogLevel): void {
    this.logLevel = level;
  }

  /**
   * Get log statistics
   */
  getStatistics() {
    const stats = {
      total: this.logs.length,
      debug: this.logs.filter((l) => l.level === LogLevel.DEBUG).length,
      info: this.logs.filter((l) => l.level === LogLevel.INFO).length,
      warn: this.logs.filter((l) => l.level === LogLevel.WARN).length,
      error: this.logs.filter((l) => l.level === LogLevel.ERROR).length,
    };
    return stats;
  }
}

// Create singleton instance
export const logger = new Logger();

// Export for global access
if (typeof window !== 'undefined') {
  (window as any).__logger = logger;
}

export default logger;
