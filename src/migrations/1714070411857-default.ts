import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1714070411857 implements MigrationInterface {
    name = 'Default1714070411857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estacao" ADD "bateriaEstacao" integer NOT NULL DEFAULT '100'`);
        await queryRunner.query(`ALTER TABLE "estacao" ADD "unixtimeBateriaEstacao" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "estacao" ADD CONSTRAINT "UQ_44b46961bfb41cf5506961a0865" UNIQUE ("unixtimeBateriaEstacao")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estacao" DROP CONSTRAINT "UQ_44b46961bfb41cf5506961a0865"`);
        await queryRunner.query(`ALTER TABLE "estacao" DROP COLUMN "unixtimeBateriaEstacao"`);
        await queryRunner.query(`ALTER TABLE "estacao" DROP COLUMN "bateriaEstacao"`);
    }

}
