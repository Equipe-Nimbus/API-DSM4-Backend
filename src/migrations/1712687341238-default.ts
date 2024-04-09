import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712687341238 implements MigrationInterface {
    name = 'Default1712687341238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alerta" DROP CONSTRAINT "FK_d66e48b743b59d8acb313f2e5bf"`);
        await queryRunner.query(`ALTER TABLE "alerta" RENAME COLUMN "tipoParametroIdTipoParametro" TO "parametroIdParametro"`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" DROP COLUMN "ganhoTipoParametro"`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ALTER COLUMN "offsetTipoParametro" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "alerta" ADD CONSTRAINT "FK_2c3ca2bbb858268f60f5e72308d" FOREIGN KEY ("parametroIdParametro") REFERENCES "parametro"("idParametro") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "ocorrencia_alerta"`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alerta" DROP CONSTRAINT "FK_2c3ca2bbb858268f60f5e72308d"`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ALTER COLUMN "offsetTipoParametro" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "tipo_parametro" ADD "ganhoTipoParametro" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "alerta" RENAME COLUMN "parametroIdParametro" TO "tipoParametroIdTipoParametro"`);
        await queryRunner.query(`ALTER TABLE "alerta" ADD CONSTRAINT "FK_d66e48b743b59d8acb313f2e5bf" FOREIGN KEY ("tipoParametroIdTipoParametro") REFERENCES "tipo_parametro"("idTipoParametro") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
