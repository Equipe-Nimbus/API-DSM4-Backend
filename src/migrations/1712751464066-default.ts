import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712751464066 implements MigrationInterface {
    name = 'Default1712751464066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ALTER COLUMN "fatorTipoParametro" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ALTER COLUMN "offsetTipoParametro" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ALTER COLUMN "offsetTipoParametro" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ALTER COLUMN "fatorTipoParametro" SET DEFAULT '0'`);
    }

}
