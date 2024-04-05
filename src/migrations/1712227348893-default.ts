import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712227348893 implements MigrationInterface {
    name = 'Default1712227348893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_parametro" DROP CONSTRAINT "UQ_3aaef6bd5f441ddfdad5343631f"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ADD CONSTRAINT "UQ_3aaef6bd5f441ddfdad5343631f" UNIQUE ("unidadeTipoParametro")`);
    }

}
