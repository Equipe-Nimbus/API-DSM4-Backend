import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1711846959265 implements MigrationInterface {
    name = 'Default1711846959265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("idUsuario" SERIAL NOT NULL, "nomeUsuario" character varying NOT NULL, "emailUsuario" character varying NOT NULL, "senhaUsuario" character varying NOT NULL, "perfilUsuario" character varying NOT NULL, "dataNascimentoUsuario" TIMESTAMP NOT NULL, "cpfUsuario" character varying NOT NULL, "cidadeUsuario" character varying NOT NULL, "bairroUsuario" character varying NOT NULL, "ruaAvenidaUsuario" character varying NOT NULL, "numeroCasaUsuario" character varying NOT NULL, "cepUsuario" character varying NOT NULL, CONSTRAINT "UQ_a86d620431ac562f6f51ffdbf63" UNIQUE ("emailUsuario"), CONSTRAINT "UQ_1700f3e83039d5bc1e6b21b1df0" UNIQUE ("cpfUsuario"), CONSTRAINT "PK_d3a13a30136d3eed99359b4b1c3" PRIMARY KEY ("idUsuario"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
