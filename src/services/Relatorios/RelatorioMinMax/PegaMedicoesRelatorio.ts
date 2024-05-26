import PgDataSource from "../../../data-source";
import { Medicao } from "../../../entities/Medicao";

class PegaMedicoesRelatorio{

    async pegar(dataInicio:number, dataFim:number){
        const repositorioMedicao = PgDataSource.getRepository(Medicao)
        let listaMedicoes = await repositorioMedicao
            .createQueryBuilder("medicao")
            .leftJoinAndSelect("medicao.parametro", "parametro")
            .leftJoinAndSelect("parametro.tiposParametro", "tiposParametro")
            .where(`medicao.unixTime >= :unixTimeInicio AND medicao.unixTime <= :unixTimeFim`, { unixTimeInicio:dataInicio, unixTimeFim:dataFim})
            .select(["medicao", "parametro", "tiposParametro"])
            .orderBy("medicao.unixTime")
            .getRawMany();
            
        return listaMedicoes
    }

}

export default new PegaMedicoesRelatorio()