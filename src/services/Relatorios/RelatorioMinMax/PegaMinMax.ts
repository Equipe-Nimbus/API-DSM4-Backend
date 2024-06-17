import PgDataSource from "../../../data-source";
import { Medicao } from "../../../entities/Medicao";
import { TipoParametro } from "../../../entities/TipoParametro";

class PegaMinMax {

    async pegar(dataInicio: number, dataFim: number, idEstacao: string) {
        const repositorioMedicao = PgDataSource.getRepository(TipoParametro)
        let listaMedicoes = await repositorioMedicao
            .createQueryBuilder("tipoParametro")
            .leftJoin("tipoParametro.parametros", "parametro")
            .leftJoinAndSelect("parametro.medicoes", "medicao")
            .where(`medicao.unixTime >= :unixTimeInicio AND medicao.unixTime <= :unixTimeFim AND parametro.estacoesIdEstacao = :idEstacao`, { unixTimeInicio: dataInicio, unixTimeFim: dataFim, idEstacao: idEstacao })
            .select([
                "tipoParametro",
                "medicao.tagTemporal",
                "MAX(medicao.valorMedida) AS maxValor",
                "MIN(medicao.valorMedida) AS minValor"
            ])
            .groupBy("tipoParametro.idTipoParametro, medicao.tagTemporal")
            .getRawMany();

        return listaMedicoes
    }

}

export default new PegaMinMax()