/* eslint-disable @typescript-eslint/no-unused-vars */
import {inject} from '@loopback/core';
import {FindRoute, InvokeMethod, ParseParams, Reject, RequestContext, Send, SequenceActions, SequenceHandler} from '@loopback/rest';
import {AuthenticateFn, AuthenticationBindings} from 'loopback4-authentication';
import {ILogger, LogType} from './ILogger';
import {LoggerBindings} from './key';
import {User} from './models';

const dotenv = require('dotenv').config();

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,  //injected as promise, helps in finding contoller method, specification and arguments.
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams, //parameter parsing function
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod, //param_invoke , invokes the method specified by the route
    @inject(SequenceActions.SEND) public send: Send, //merges response with invoked result
    @inject(SequenceActions.REJECT) public reject: Reject,// action to call if invoke returns a rejected promise
    @inject(LoggerBindings.LOGGER) public logger: ILogger,
    @inject(AuthenticationBindings.USER_AUTH_ACTION)
    protected authenticateRequestClient: AuthenticateFn<User>
  ) {
  }
  async handle(context: RequestContext) {
    try {
      this.logger.log(LogType.INFO, `Request started ats ${Date.now()}`);

      // if (context.request.headers.referer !== ALLOWED_ORIGIN) {
      //   throw new Error('Not Authorize Initiator');
      // }
      this.logger.log(LogType.INFO, `referer ${context.request.headers.referer} userAgent ${context.request.headers['user-agent']} remote-address ${context.request.connection.remoteAddress}`);
      // findRoute() produces an element
      const route = this.findRoute(context.request);
      // parseParams() uses the route element and produces the params element
      const args = await this.parseParams(context.request, route);
      await this.authenticateRequestClient(context.request);
      // invoke() uses both the route and params elements to produce the result (OperationRetVal) element
      const result = await this.invoke(route, args);
      // send() uses the result element
      this.send(context.response, result);
    } catch (error) {
      this.logger.log(LogType.ERROR, `${error}`);
      this.reject(context, error);
    } finally {
      this.logger.log(LogType.INFO, `request is completed with response at ${Date.now()}`);
    }
  }
}
