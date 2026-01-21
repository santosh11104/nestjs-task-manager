
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTaskUser1700000000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE task ADD COLUMN "userId" integer'
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE task DROP COLUMN "userId"'
    );
  }
}
