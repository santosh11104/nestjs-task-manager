import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1736378202000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE user_role_enum AS ENUM ('user', 'admin');

            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "email" VARCHAR NOT NULL UNIQUE,
                "password" VARCHAR NOT NULL,
                "role" user_role_enum NOT NULL DEFAULT 'user'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user";
            DROP TYPE user_role_enum;
        `);
    }
}
