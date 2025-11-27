import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      // Extract message from exception response
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        const responseMessage = (exceptionResponse as any).message || exception.message;
        
        // Convert array of messages to single string
        if (Array.isArray(responseMessage)) {
          message = responseMessage.join(', ');
        } else {
          message = responseMessage;
        }
      }
    }

    response.status(status).json({
      success: false,
      error: {
        code: status,
        message: message,
      },
      timestamp: new Date().toISOString(),
      traceId: uuidv4(),
    });
  }
}
