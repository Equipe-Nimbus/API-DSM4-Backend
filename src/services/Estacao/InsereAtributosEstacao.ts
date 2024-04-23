import { Estacao } from "../../entities/Estacao";

class InsereAtributosEstacao {
    inserir(novaEstacao: Estacao, corpoRequisicao): Estacao {
        novaEstacao.nomeEstacao = corpoRequisicao.nomeEstacao;
        novaEstacao.codigoIdentificacao = corpoRequisicao.codigoIdentificacao;
        novaEstacao.ruaAvenidaEstacao = corpoRequisicao.ruaAvenidaEstacao;
        novaEstacao.numeroEnderecoEstacao = corpoRequisicao.numeroEnderecoEstacao;
        novaEstacao.bairroEstacao = corpoRequisicao.bairroEstacao;
        novaEstacao.cidadeEstacao = corpoRequisicao.cidadeEstacao;
        novaEstacao.estadoEstacao = corpoRequisicao.estadoEstacao;
        novaEstacao.cepEstacao = corpoRequisicao.cepEstacao;
        novaEstacao.latitudeEstacao = corpoRequisicao.latitudeEstacao;
        novaEstacao.longitudeEstacao = corpoRequisicao.longitudeEstacao;
        return novaEstacao;
    };
}

export default new InsereAtributosEstacao();