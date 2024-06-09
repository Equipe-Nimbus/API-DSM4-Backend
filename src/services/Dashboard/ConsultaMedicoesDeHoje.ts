import PgDataSource from "../../data-source";
import { Estacao } from "../../entities/Estacao";
import { Medicao } from "../../entities/Medicao";
import { Parametro } from "../../entities/Parametro";
import GeraUnixTime from "../Estacao/GeraUnixTime";
import GeraPrimeiroUnixDia from "./GeraPrimeiroUnixDia";

class ConsultaMedicoesDeHoje{

    async consultar(idEstacao:string):Promise<Parametro[]>{
        const repositorioMedicao = PgDataSource.getRepository(Parametro);
        const unixtime = GeraPrimeiroUnixDia.gerar()
        try{
            let listaMedicoesParametroDoDia = await repositorioMedicao
            .createQueryBuilder("parametro")
            .leftJoinAndSelect("parametro.medicoes", "medicao")
            .leftJoinAndSelect("parametro.tiposParametro", "tipo_parametro")
            .where(`parametro.estacoesIdEstacao = :idEstacao AND medicao.unixTime >= :unixTime AND medicao.parametroIdParametro = parametro.idParametro AND parametro.tiposParametroIdTipoParametro = tipo_parametro.idTipoParametro`, {idEstacao:idEstacao, unixTime:unixtime})
            .andWhere(`parametro.statusParametro = :status`, {status:true})
            .select(["medicao", "parametro", "tipo_parametro.nomeTipoParametro", "tipo_parametro.unidadeTipoParametro", "tipo_parametro.offsetTipoParametro", "tipo_parametro.fatorTipoParametro"])
            .getMany();
            return listaMedicoesParametroDoDia
        } catch(erro){
            throw new Error("idEstacao inválido")
        }
        
        
    }

}

export default new ConsultaMedicoesDeHoje()