import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1717370543156 implements MigrationInterface {
    name = 'Default1717370543156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicao" DROP COLUMN "tagTemporal"`);
        await queryRunner.query(`ALTER TABLE "medicao" ADD "tagTemporal" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicao" DROP COLUMN "tagTemporal"`);
        await queryRunner.query(`ALTER TABLE "medicao" ADD "tagTemporal" character varying NOT NULL`);
    }

}
