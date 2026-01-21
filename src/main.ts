// Import reflect-metadata for TypeScript decorators support
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

/**
 * Bootstrap function to initialize and configure the NestJS application
 * Sets up security middleware, validation, versioning, and starts the server
 */
async function bootstrap() {
  // Create NestJS application instance
  const app = await NestFactory.create(AppModule);
  //Applies validation to all incoming requests across the entire application
  // ValidationPipe automatically validates request data 
  // against DTO class-validator decorators
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  // Apply security middleware (helmet) to set various HTTP headers
  app.use(helmet());

  // Enable API versioning using URI-based versioning (e.g., /v1/endpoint)
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Configure global validation pipe for request data validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true,        // Automatically transform payloads to DTO instances
    }),
  );

  // Start the application server on specified port or default to 3000
  await app.listen(process.env.PORT ?? 3000);

  // Log server startup confirmation
  console.log(`App running on port ${process.env.PORT ?? 3000}`);
}

// Initialize the application
bootstrap();
