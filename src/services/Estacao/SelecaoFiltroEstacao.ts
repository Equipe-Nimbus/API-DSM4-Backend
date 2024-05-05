import { Repository } from "typeorm";
import SelecaoFiltrada from "../SelecaoFiltrada";
import { Estacao } from "../../entities/Estacao";
import InterfaceFiltroSelecao from "../InterfaceFiltroSelecao";


class SelecaoFiltroEstacao extends SelecaoFiltrada<Estacao>{
    async aplicarFiltro(repositorio: Repository<Estacao>, filtro: InterfaceFiltroSelecao): Promise<Estacao[]> {
        const listaEstacao = await repositorio
            .createQueryBuilder("estacao")
            .select(["estacao.idEstacao", "estacao.nomeEstacao", "estacao.ruaAvenidaEstacao", "estacao.numeroEnderecoEstacao", "estacao.cepEstacao", "estacao.bairroEstacao", "estacao.cidadeEstacao", "estacao.estadoEstacao", "estacao.latitudeEstacao", "estacao.longitudeEstacao"])
            .where(filtro.query, filtro.valores)
            .orderBy("estacao.nomeEstacao", "ASC")
            .getMany();
        
        return listaEstacao;
    }

};

export default new SelecaoFiltroEstacao();