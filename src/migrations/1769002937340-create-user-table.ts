import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1769002937340 implements MigrationInterface {
    name = 'CreateUserTable1769002937340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "fk_refresh_user"`);
        await queryRunner.query(`DROP INDEX "public"."idx_refresh_user_id"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "token_hash"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "expires_at"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "tokenHash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "expiresAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`CREATE INDEX "IDX_610102b60fea1455310ccd299d" ON "refresh_tokens" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_610102b60fea1455310ccd299d"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "expiresAt"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "tokenHash"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "expires_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "token_hash" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`CREATE INDEX "idx_refresh_user_id" ON "refresh_tokens" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "fk_refresh_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
