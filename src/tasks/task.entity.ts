import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Task entity representing a task in the database
 * Maps to the 'task' table with auto-generated primary key
 */
@Entity()
export class Task {
  /**
   * Primary key - auto-generated integer ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Task title - required string field
   */
  @Column()
  title: string;

  /**
   * Task description - required string field
   */
  @Column()
  description: string;

  /**
   * Task completion status - boolean with default value false
   */
  @Column({ default: false })
  completed: boolean;
}
