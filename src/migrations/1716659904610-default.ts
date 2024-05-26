import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1716659904610 implements MigrationInterface {
    name = 'Default1716659904610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estacao" DROP COLUMN "bateriaEstacao"`);
        await queryRunner.query(`ALTER TABLE "estacao" ADD "bateriaEstacao" numeric(5,2) NOT NULL DEFAULT '100'`);
        await queryRunner.query(`ALTER TABLE "estacao" ALTER COLUMN "unixtimeBateriaEstacao" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "estacao" DROP CONSTRAINT "UQ_44b46961bfb41cf5506961a0865"`);
        await queryRunner.query(`ALTER TABLE "medicao" DROP COLUMN "valorMedida"`);
        await queryRunner.query(`ALTER TABLE "medicao" ADD "valorMedida" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicao" DROP COLUMN "valorMedida"`);
        await queryRunner.query(`ALTER TABLE "medicao" ADD "valorMedida" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "estacao" ADD CONSTRAINT "UQ_44b46961bfb41cf5506961a0865" UNIQUE ("unixtimeBateriaEstacao")`);
        await queryRunner.query(`ALTER TABLE "estacao" ALTER COLUMN "unixtimeBateriaEstacao" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "estacao" DROP COLUMN "bateriaEstacao"`);
        await queryRunner.query(`ALTER TABLE "estacao" ADD "bateriaEstacao" integer NOT NULL DEFAULT '100'`);
    }

}
