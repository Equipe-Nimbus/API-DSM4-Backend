import { Repository } from "typeorm";
import { Estacao } from "../../entities/Estacao";
import InterfaceFiltroSelecao from "../InterfaceFiltroSelecao";
import SelecaoPaginada from "../SelecaoPaginada";

class SelecaoPaginadaEstacao extends SelecaoPaginada<Estacao> {
    async selecionar(repositorio: Repository<Estacao>, pagina: number, tamanhoPagina: number, filtro: InterfaceFiltroSelecao): Promise<Estacao[]> {
        const listaEstacao = await repositorio
            .createQueryBuilder("estacao")
            .select(["estacao.idEstacao", "estacao.nomeEstacao", "estacao.ruaAvenidaEstacao", "estacao.numeroEnderecoEstacao", "estacao.bairroEstacao", "estacao.cidadeEstacao", "estacao.estadoEstacao", "estacao.cepEstacao", "estacao.latitudeEstacao", "estacao.longitudeEstacao"])
            .where(filtro.query, filtro.valores)
            .orderBy("estacao.nomeEstacao", "ASC")
            .skip((pagina - 1) * tamanhoPagina)
            .take(tamanhoPagina)
            .getMany();
        
        return listaEstacao;    
    }   

}

export default new SelecaoPaginadaEstacao();