import winston from 'winston';
import {ILogger, LogType} from '../ILogger';

export class WinstonLoggerService implements ILogger {
  logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [//a transport is where log is saved
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(info => {
            return `[${info.timestamp}]  ${info.level}: ${info.message}`;
          }),
        ),
      }),
    ],
  });
  log(type: number, message: string): void {
    switch (type) {
      case LogType.INFO:
        this.logger.info(message);
        break;
      case LogType.WARN:
        this.logger.warn(message);
        break;
      case LogType.ERROR:
        this.logger.error(message);
        break;
      case LogType.DEBUG:
        this.logger.debug(message);
        break;
    }
  }
}
