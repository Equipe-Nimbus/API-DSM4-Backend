import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1717356950159 implements MigrationInterface {
    name = 'Default1717356950159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicao" ADD "tagTemporal" character varying`);
        await queryRunner.query(`ALTER TABLE "estacao" ALTER COLUMN "idPlacaEstacao" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estacao" ALTER COLUMN "idPlacaEstacao" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medicao" DROP COLUMN "tagTemporal"`);
    }

}
