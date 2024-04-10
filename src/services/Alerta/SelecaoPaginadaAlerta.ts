import { Repository } from "typeorm";
import { Alerta } from "../../entities/Alerta";
import InterfaceFiltroSelecao from "../InterfaceFiltroSelecao";
import SelecaoPaginada from "../SelecaoPaginada";

class SelecaoPaginadaAlerta extends SelecaoPaginada<Alerta> {
    
    
    async selecionar(repositorio: Repository<Alerta>, pagina: number, tamanhoPagina: number, filtro: InterfaceFiltroSelecao): Promise<Alerta[]> {
        const listaAlerta = await repositorio
        .createQueryBuilder("alerta")
        .leftJoinAndSelect("alerta.parametro", "parametro")
        .leftJoinAndSelect("parametro.estacoes", "estacoes")
        .leftJoinAndSelect("parametro.tiposParametro", "tiposParametro")
        .where(filtro.query, filtro.valores)
        .andWhere(`alerta.statusAlerta = :status`, {status:true})
        .orderBy("alerta.nomeAlerta", "ASC")
        .skip((pagina - 1) * tamanhoPagina)
        .take(tamanhoPagina)
        .getMany();

        return listaAlerta
    }
    
}

export default new SelecaoPaginadaAlerta()