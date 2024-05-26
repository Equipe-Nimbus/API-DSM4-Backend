import { Request } from "express";
import { Estacao } from "../../../../src/entities/Estacao";

class MockEstacaoControllerAtualizar {
    estacaoInicial = {
        idEstacao: "abcd-1234",
        idPlacaEstacao: "abcd-1234",
        nomeEstacao: "Estação Central",
        ruaAvenidaEstacao: "Rua das Flores",
        numeroEnderecoEstacao: "123",
        bairroEstacao: "Centro",
        cidadeEstacao: "Cidade Grande",
        estadoEstacao: "Estado Grande",
        cepEstacao: "12345-678",
        latitudeEstacao: "-23.5505",
        longitudeEstacao: "-46.6333",
        tipoParametros: [
            {
            idTipoParametro: 1
            }
        ]
    } as unknown as Estacao;

    reqEstacaoAtualizar = {
        body: {
            idEstacao: "abcd-1234",
            idPlacaEstacao: "abcd-1234",
            nomeEstacao: "Estação Norte",
            ruaAvenidaEstacao: "Norte",
            numeroEnderecoEstacao: "123",
            bairroEstacao: "Norte",
            cidadeEstacao: "Cidade Norte",
            estadoEstacao: "Estado Norte",
            cepEstacao: "12913670",
            latitudeEstacao: 1,
            longitudeEstacao: 1,
            tipoParametros: [
                {
                    idTipoParametro: 1
                }
            ]
        }
    } as unknown as Request;

};

export default new MockEstacaoControllerAtualizar();