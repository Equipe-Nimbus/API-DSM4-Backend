import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712691982910 implements MigrationInterface {
    name = 'Default1712691982910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alerta" DROP CONSTRAINT "FK_d66e48b743b59d8acb313f2e5bf"`);
        await queryRunner.query(`ALTER TABLE "alerta" RENAME COLUMN "tipoParametroIdTipoParametro" TO "parametroIdParametro"`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" DROP COLUMN "ganhoTipoParametro"`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ALTER COLUMN "fatorTipoParametro" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "alerta" ADD CONSTRAINT "FK_2c3ca2bbb858268f60f5e72308d" FOREIGN KEY ("parametroIdParametro") REFERENCES "parametro"("idParametro") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "ocorrencia_alerta"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alerta" DROP CONSTRAINT "FK_2c3ca2bbb858268f60f5e72308d"`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ALTER COLUMN "fatorTipoParametro" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ADD "ganhoTipoParametro" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "alerta" RENAME COLUMN "parametroIdParametro" TO "tipoParametroIdTipoParametro"`);
        await queryRunner.query(`ALTER TABLE "alerta" ADD CONSTRAINT "FK_d66e48b743b59d8acb313f2e5bf" FOREIGN KEY ("tipoParametroIdTipoParametro") REFERENCES "tipo_parametro"("idTipoParametro") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "ocorrencia_alerta" ("idOcorrenciaAlerta" SERIAL NOT NULL, "alertaIdAlerta" integer, "medicaoIdMedicao" integer, CONSTRAINT "PK_cc38448b55f20e65b19cbd19e95" PRIMARY KEY ("idOcorrenciaAlerta"))`);
        await queryRunner.query(`ALTER TABLE "ocorrencia_alerta" ADD CONSTRAINT "FK_eecd1853723b357a361c8eaeb30" FOREIGN KEY ("alertaIdAlerta") REFERENCES "alerta"("idAlerta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ocorrencia_alerta" ADD CONSTRAINT "FK_4a5e755644b13ea480b02a76611" FOREIGN KEY ("medicaoIdMedicao") REFERENCES "medicao"("idMedicao") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
