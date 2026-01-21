/*
Here's what each part does:

@Injectable() decorator
Marks this class as a provider that can be managed by NestJS's dependency injection system

Allows this service to be injected into controllers or other services

NestJS creates a single instance (singleton by default) and shares it across the app

export class AppService
A TypeScript class that contains business logic

export makes it available to import in other files

By convention, services handle business logic, not HTTP concerns

getHello(): string
A simple method that returns a string

: string is the TypeScript return type annotation

This is typically called by a controller to handle a request
*/
import { Injectable } from '@nestjs/common';

/**
 * Root application service
 * Provides basic application functionality and welcome messages
 */
@Injectable()
export class AppService {
  /**
   * Returns a welcome message for the application
   * @returns Simple greeting string
   */
  getHello(): string {
    return 'Hello World!';
  }
}
