import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
  const task = await this.taskRepository.findOne({
    where: { id },
  });

  if (!task) {
    throw new NotFoundException(`Task with id ${id} not found`);
  }

  return task;
}


  create(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
