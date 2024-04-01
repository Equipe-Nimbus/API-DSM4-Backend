import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712001934989 implements MigrationInterface {
    name = 'Default1712001934989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("idUsuario" SERIAL NOT NULL, "nomeUsuario" character varying NOT NULL, "emailUsuario" character varying NOT NULL, "senhaUsuario" character varying NOT NULL, "tipoUsuario" character varying NOT NULL, "dataNascimentoUsuario" TIMESTAMP NOT NULL, "cpfUsuario" character varying NOT NULL, "cidadeUsuario" character varying NOT NULL, "bairroUsuario" character varying NOT NULL, "ruaAvenidaUsuario" character varying NOT NULL, "numeroCasaUsuario" character varying NOT NULL, "cepUsuario" character varying NOT NULL, CONSTRAINT "PK_d3a13a30136d3eed99359b4b1c3" PRIMARY KEY ("idUsuario"))`);
        await queryRunner.query(`CREATE TABLE "tipo_parametro" ("idTipoParametro" SERIAL NOT NULL, "nomeTipoParametro" character varying(50) NOT NULL, "unidadeTipoParametro" character varying(10) NOT NULL, "fatorTipoParametro" numeric NOT NULL DEFAULT '1', "offsetTipoParametro" numeric NOT NULL DEFAULT '1', "ganhoTipoParametro" numeric NOT NULL DEFAULT '0', "statusTipoParametro" boolean NOT NULL DEFAULT true, "idAlerta" integer NOT NULL, CONSTRAINT "UQ_3aaef6bd5f441ddfdad5343631f" UNIQUE ("unidadeTipoParametro"), CONSTRAINT "PK_07a319369cb4655a65b187b0b87" PRIMARY KEY ("idTipoParametro"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipo_parametro"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
