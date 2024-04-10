import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712696276724 implements MigrationInterface {
    name = 'Default1712696276724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parametro" ADD "statusParametro" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parametro" DROP COLUMN "statusParametro"`);
    }

}
