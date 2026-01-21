import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Patch } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

/**
 * Tasks controller handles all HTTP requests related to task management
 * Provides CRUD operations for tasks with proper validation and error handling
 */
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  /**
   * Retrieve all tasks from the database
   * @returns Promise<Task[]> Array of all tasks
   */
  @Get()
  getAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  /**
   * Retrieve a specific task by ID
   * @param id Task ID as string parameter
   * @returns Promise<Task> Single task or throws NotFoundException
   */
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(Number(id));
  }

  /**
   * Create a new task
   * @param dto CreateTaskDto with task details (validated)
   * @returns Promise<Task> Newly created task
   */
  @Post()
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(dto);
  }

  /**
   * Delete a task by ID
   * @param id Task ID as string parameter
   * @returns Promise<void> Confirmation of deletion
   */
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(Number(id));
  }

  /**
   * Update an existing task with partial data
   * @param id Task ID as number parameter
   * @param dto UpdateTaskDto with fields to update (validated)
   * @returns Promise<Task> Updated task
   */
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, dto);
  }
}
