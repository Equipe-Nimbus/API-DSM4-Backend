import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712001425053 implements MigrationInterface {
    name = 'Default1712001425053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "estacoes" ("idEstacao" SERIAL NOT NULL, "nomeEstacao" character varying NOT NULL, "ruaAvenidaEstacao" character varying NOT NULL, "numeroEnderecoEstacao" character varying NOT NULL, "bairroEstacao" character varying NOT NULL, "cidadeEstacao" character varying NOT NULL, "estadoEstacao" character varying NOT NULL, "cepEstacao" character varying NOT NULL, "latitudeEstacao" numeric(10,8) NOT NULL, "longitudeEstacao" numeric(11,8) NOT NULL, "statusEstacao" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_d52302eb27d4e91ffef976c8822" UNIQUE ("nomeEstacao"), CONSTRAINT "PK_e30e6c6606b70f6066e30ef7fb2" PRIMARY KEY ("idEstacao"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "estacoes"`);
    }

}
