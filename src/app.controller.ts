import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Root application controller
 * Handles basic application endpoints and health checks
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Basic health check endpoint
   * @returns Welcome message from the application
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
