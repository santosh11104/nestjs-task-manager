import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

/**
 * Root application module that configures and imports all feature modules
 * Handles database connection, configuration management, rate limiting, and module orchestration
 */
@Module({
  imports: [
    // Global configuration module for environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available throughout the app
      envFilePath: [
        '.env.local',  // Local development overrides
        '.env',        // Default environment file
      ],
    }),

    // Database connection configuration using TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,  // Automatically load entity files
        synchronize: false,      // Disabled for production safety - use migrations instead
        retryAttempts: 10,       // Database connection retry attempts
        retryDelay: 3000,        // Delay between retry attempts (ms)
      }),
    }),
    
    // Rate limiting configuration to prevent abuse
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,    // Time window in seconds
          limit: 100, // Maximum requests per time window
        },
      ],
    }),

    // Feature modules
    TasksModule,    // Task management functionality
    HealthModule,   // Health check endpoints
    MetricsModule,  // Application metrics and monitoring
    AuthModule,     // Authentication and authorization
    UsersModule,    // User management
  ],
})
export class AppModule { }
