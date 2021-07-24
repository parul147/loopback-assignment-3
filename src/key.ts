import {BindingKey} from '@loopback/core';
import {ILogger} from './ILogger';

export namespace LoggerBindings {
  export const LOGGER = BindingKey.create<ILogger>('service.logger');
}
