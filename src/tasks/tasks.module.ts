import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { AuthModule } from 'src/auth/auth.module';

//@Module() decorator
// the TasksModule is dependent on tyoeormmodule to handle database operations for Task entity
// and it registers Task 
@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
