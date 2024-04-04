import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712023002313 implements MigrationInterface {
    name = 'Default1712023002313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ocorrencia_alerta" ("idOcorrenciaAlerta" SERIAL NOT NULL, "alertaIdAlerta" integer, "medicaoIdMedicao" integer, CONSTRAINT "PK_cc38448b55f20e65b19cbd19e95" PRIMARY KEY ("idOcorrenciaAlerta"))`);
        await queryRunner.query(`CREATE TABLE "alerta" ("idAlerta" SERIAL NOT NULL, "nomeAlerta" character varying NOT NULL, "condicaoAlerta" character varying NOT NULL, "statusAlerta" boolean NOT NULL DEFAULT true, "valorMedicaoAlerta" integer NOT NULL, "tipoParametroIdTipoParametro" integer, CONSTRAINT "PK_9f724d3814ec2e0fbef5e86447c" PRIMARY KEY ("idAlerta"))`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" DROP COLUMN "idAlerta"`);
        await queryRunner.query(`ALTER TABLE "ocorrencia_alerta" ADD CONSTRAINT "FK_eecd1853723b357a361c8eaeb30" FOREIGN KEY ("alertaIdAlerta") REFERENCES "alerta"("idAlerta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ocorrencia_alerta" ADD CONSTRAINT "FK_4a5e755644b13ea480b02a76611" FOREIGN KEY ("medicaoIdMedicao") REFERENCES "medicao"("idMedicao") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alerta" ADD CONSTRAINT "FK_d66e48b743b59d8acb313f2e5bf" FOREIGN KEY ("tipoParametroIdTipoParametro") REFERENCES "tipo_parametro"("idTipoParametro") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alerta" DROP CONSTRAINT "FK_d66e48b743b59d8acb313f2e5bf"`);
        await queryRunner.query(`ALTER TABLE "ocorrencia_alerta" DROP CONSTRAINT "FK_4a5e755644b13ea480b02a76611"`);
        await queryRunner.query(`ALTER TABLE "ocorrencia_alerta" DROP CONSTRAINT "FK_eecd1853723b357a361c8eaeb30"`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ADD "idAlerta" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "alerta"`);
        await queryRunner.query(`DROP TABLE "ocorrencia_alerta"`);
    }

}
