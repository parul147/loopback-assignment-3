export interface ILogger {
  log(type: number, message: string): void;
}

export enum LogType {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  OFF,
}
