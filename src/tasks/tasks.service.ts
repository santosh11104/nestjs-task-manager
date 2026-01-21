import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

/**
 * Tasks service handles business logic for task management
 * Provides database operations and validation for task entities
 */
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  /**
   * Retrieve all tasks from the database
   * @returns Promise<Task[]> Array of all tasks
   */
  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  /**
   * Find a single task by ID with error handling
   * @param id Task ID to search for
   * @returns Promise<Task> Found task
   * @throws NotFoundException if task doesn't exist
   */
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  /**
   * Create a new task in the database
   * @param task Partial task data to create
   * @returns Promise<Task> Newly created task with generated ID
   */
  create(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  /**
   * Remove a task from the database by ID
   * @param id Task ID to delete
   * @returns Promise<void> Confirmation of deletion
   */
  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  /**
   * Update an existing task with new data
   * @param id Task ID to update
   * @param data Partial task data to update
   * @returns Promise<Task> Updated task
   * @throws NotFoundException if task doesn't exist
   */
  async update(id: number, data: Partial<Task>): Promise<Task> {
    const task = await this.findOne(id); // Reuses existing 404 logic

    // Merge new data with existing task
    Object.assign(task, data);

    return this.taskRepository.save(task);
  }
}
