import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1716502267248 implements MigrationInterface {
    name = 'Default1716502267248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estacao" ADD "idPlacaEstacao" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "estacao" ADD CONSTRAINT "UQ_d18c56a9633160fb8e03c003f04" UNIQUE ("idPlacaEstacao")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estacao" DROP CONSTRAINT "UQ_d18c56a9633160fb8e03c003f04"`);
        await queryRunner.query(`ALTER TABLE "estacao" DROP COLUMN "idPlacaEstacao"`);
    }

}
