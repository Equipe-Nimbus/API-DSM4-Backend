import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1713893770533 implements MigrationInterface {
    name = 'Default1713893770533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parametro" DROP CONSTRAINT "FK_21b8ab74bacc32843f540a4a2c4"`);
        await queryRunner.query(`ALTER TABLE "estacao" DROP CONSTRAINT "PK_8cdefb357d46ad4796ccfc318b8"`);
        await queryRunner.query(`ALTER TABLE "estacao" DROP COLUMN "idEstacao"`);
        await queryRunner.query(`ALTER TABLE "estacao" ADD "idEstacao" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "estacao" ADD CONSTRAINT "PK_8cdefb357d46ad4796ccfc318b8" PRIMARY KEY ("idEstacao")`);
        await queryRunner.query(`ALTER TABLE "parametro" DROP COLUMN "estacoesIdEstacao"`);
        await queryRunner.query(`ALTER TABLE "parametro" ADD "estacoesIdEstacao" uuid`);
        await queryRunner.query(`ALTER TABLE "parametro" ADD CONSTRAINT "FK_21b8ab74bacc32843f540a4a2c4" FOREIGN KEY ("estacoesIdEstacao") REFERENCES "estacao"("idEstacao") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parametro" DROP CONSTRAINT "FK_21b8ab74bacc32843f540a4a2c4"`);
        await queryRunner.query(`ALTER TABLE "parametro" DROP COLUMN "estacoesIdEstacao"`);
        await queryRunner.query(`ALTER TABLE "parametro" ADD "estacoesIdEstacao" integer`);
        await queryRunner.query(`ALTER TABLE "estacao" DROP CONSTRAINT "PK_8cdefb357d46ad4796ccfc318b8"`);
        await queryRunner.query(`ALTER TABLE "estacao" DROP COLUMN "idEstacao"`);
        await queryRunner.query(`ALTER TABLE "estacao" ADD "idEstacao" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "estacao" ADD CONSTRAINT "PK_8cdefb357d46ad4796ccfc318b8" PRIMARY KEY ("idEstacao")`);
        await queryRunner.query(`ALTER TABLE "parametro" ADD CONSTRAINT "FK_21b8ab74bacc32843f540a4a2c4" FOREIGN KEY ("estacoesIdEstacao") REFERENCES "estacao"("idEstacao") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
