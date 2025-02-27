import { Controller, All, Req, Res, NotFoundException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { GatewayService } from '../services/gateway.service';
import { routes } from '../routes/routes.config';

@Controller('api')
export class GatewayController {
  private readonly logger = new Logger(GatewayController.name);

  constructor(private readonly gatewayService: GatewayService) {}

  @All('*') 
  async handleRequest(@Req() req: Request, @Res() res: Response) {
    this.logger.log(`Incoming request: ${req.method} ${req.originalUrl}`);

    const [, , service, ...rest] = req.path.split('/');
    const endpoint = rest.join('/');
    const method = req.method.toUpperCase();
    const route = routes.find((r) => r.path === service);

    if (!route) {
      throw new NotFoundException(`Invalid API service: ${service}`);
    }

    if (!route.endpoints.includes(endpoint)) {
      throw new NotFoundException(`Invalid API endpoint: ${service}/${endpoint}`);
    }

    try {
      const response = await this.gatewayService.forwardRequest(
        route.service,
        endpoint,
        method,
        req.body,  
        req.headers,
        req.query  
      );

      return res.status(200).json(response);
    } catch (error) {
      this.logger.error(`Error processing request to ${service}/${endpoint}: ${error.message}`);
      return res.status(error.getStatus?.() || 502).json({
        message: error.message || 'Gateway Error',
      });
    }
  }
}
