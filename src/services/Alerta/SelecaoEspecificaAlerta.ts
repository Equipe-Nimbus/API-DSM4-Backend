import PgDataSource from "../../data-source";
import { Alerta } from "../../entities/Alerta";

class SelecaoEspecificaAlerta{


    async selecionar(idAlerta:number){
        const repositorio = PgDataSource.getRepository(Alerta)
        const alerta = await repositorio
        .createQueryBuilder("alerta")
        .leftJoinAndSelect("alerta.parametro", "parametro")
        .leftJoinAndSelect("parametro.estacoes", "estacoes")
        .leftJoinAndSelect("parametro.tiposParametro", "tiposParametro")
        .where(`alerta.idAlerta = :idAlerta`, {idAlerta:idAlerta})
        .andWhere(`alerta.statusAlerta = :status`, {status:true})
        .getMany();

        return alerta[0]
    }

}

export default new SelecaoEspecificaAlerta()