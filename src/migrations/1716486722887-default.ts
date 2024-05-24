import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1716486722887 implements MigrationInterface {
    name = 'Default1716486722887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicao" ADD "tagTemporal" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicao" DROP COLUMN "tagTemporal"`);
    }

}
