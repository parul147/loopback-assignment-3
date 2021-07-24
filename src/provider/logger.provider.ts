import {Provider} from '@loopback/context';
import {inject} from '@loopback/core';
import {Request} from '@loopback/rest';
import {ILogger} from '../ILogger';
import {LoggerBindings} from '../key';
import {WinstonLoggerService} from '../service/logger.service';

export class LogProvider implements Provider<ILogger> {
  constructor(@inject(LoggerBindings.LOGGER) public logger: WinstonLoggerService) { }

  value() {
    return this.logger;
  }

  action(err: Error, statusCode: number, req: Request) {
    if (statusCode < 500) {
      return;
    }

    this.logger.logger.error(
      `HTTP ${statusCode} on ${req.method} ${req.url}: ${err.stack ?? err}`,
    );
  }
}
