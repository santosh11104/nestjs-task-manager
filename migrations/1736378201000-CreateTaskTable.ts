import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1736378201000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "task" (
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR NOT NULL,
                "description" VARCHAR,
                "completed" BOOLEAN NOT NULL DEFAULT false
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task";`);
    }
}
