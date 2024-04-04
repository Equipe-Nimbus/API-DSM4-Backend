import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712010878251 implements MigrationInterface {
    name = 'Default1712010878251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipo_parametro" ("idTipoParametro" SERIAL NOT NULL, "nomeTipoParametro" character varying(50) NOT NULL, "unidadeTipoParametro" character varying(10) NOT NULL, "fatorTipoParametro" numeric NOT NULL DEFAULT '1', "offsetTipoParametro" numeric NOT NULL DEFAULT '1', "ganhoTipoParametro" numeric NOT NULL DEFAULT '0', "statusTipoParametro" boolean NOT NULL DEFAULT true, "idAlerta" integer NOT NULL, CONSTRAINT "UQ_3aaef6bd5f441ddfdad5343631f" UNIQUE ("unidadeTipoParametro"), CONSTRAINT "PK_07a319369cb4655a65b187b0b87" PRIMARY KEY ("idTipoParametro"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipo_parametro"`);
    }

}
