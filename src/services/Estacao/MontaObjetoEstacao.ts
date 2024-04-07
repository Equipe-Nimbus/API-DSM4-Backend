import { Estacao } from "../../entities/Estacao";

class MontaObjetoEstacao {

    criaEstacao (estacao: Estacao) {
        const objetoEstacaoMontado = {
            idEstacao: estacao.idEstacao,
            nomeEstacao: estacao.nomeEstacao,
            ruaAvenidaEstacao: estacao.ruaAvenidaEstacao,
            numeroEnderecoEstacao: estacao.numeroEnderecoEstacao,
            bairroEstacao: estacao.bairroEstacao,
            cidadeEstacao: estacao.cidadeEstacao,
            estadoEstacao: estacao.estadoEstacao,
            cepEstacao: estacao.cepEstacao,
            latitudeEstacao: estacao.latitudeEstacao,
            longitudeEstacao: estacao.latitudeEstacao,
            tipoParametros: estacao.tipoParametros
        };
        return objetoEstacaoMontado;        
    };
};

export default new MontaObjetoEstacao();