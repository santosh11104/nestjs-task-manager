import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * Data Transfer Object for creating new tasks
 * Defines validation rules and required fields for task creation
 */
export class CreateTaskDto {
  /**
   * Task title - required, non-empty string
   */
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * Task description - required, non-empty string
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  /**
   * Task completion status - optional boolean field
   * Defaults to false if not provided
   */
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
