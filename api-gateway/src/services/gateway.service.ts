import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios, { Method } from 'axios';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);

  async forwardRequest(
    serviceUrl: string,
    endpoint: string,
    method: string,
    data?: any,
    headers: Record<string, any> = {},
    queryParams?: Record<string, any>,
  ) {
    const url = `${serviceUrl}/${endpoint}`;
    
    try {
      this.logger.log(`Forwarding request: ${method} ${url}`);

      const response = await axios({
        method: method as Method,
        url,
        data: data || undefined,   
        headers: {
          ...headers,
          'Content-Type': headers['content-type'] || 'application/json',
        },
        params: queryParams,
      });

      return response.data;
    } catch (error: any) {
      this.logger.error(
        `Request to ${url} failed: ${error.response?.status} - ${error.response?.data?.message || error.message}`,
      );
      throw new HttpException(
        {
          message: error.response?.data?.message || 'Request failed',
          statusCode: error.response?.status || HttpStatus.BAD_GATEWAY,
          error: error.response?.data?.error || 'Bad Gateway',
        },
        error.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
