import { Estacao } from "../../../../src/entities/Estacao";
import { TipoParametro } from "../../../../src/entities/TipoParametro";

class MocksEstacaoControllerListagemEspecifica {

    estacaoBusca = {
        idEstacao: "1",
        nomeEstacao: "Estação Norte",
        ruaAvenidaEstacao: "Rua das Flores",
        numeroEnderecoEstacao: "123",
        bairroEstacao: "Centro",
        cidadeEstacao: "Cidade Grande",
        estadoEstacao: "Estado Grande",
        cepEstacao: "12345-678",
        latitudeEstacao: "1",
        longitudeEstacao: "-46.6333",
        parametros: [
            {
                tiposParametro: {
                    idTipoParametro: 1,
                    nomeTipoParametro: "Temperatura",
                    unidadeTipoParametro: "ºC",
                    fatorTipoParametro: "1",
                    
                },
                statusParametro: true
            }
        ]
    } as unknown as Estacao;

    estacaoResposta = {
        idEstacao: "1",
        idPlacaEstacao: undefined,
        nomeEstacao: "Estação Norte",
        ruaAvenidaEstacao: "Rua das Flores",
        numeroEnderecoEstacao: "123",
        bairroEstacao: "Centro",
        cidadeEstacao: "Cidade Grande",
        estadoEstacao: "Estado Grande",
        cepEstacao: "12345-678",
        latitudeEstacao: "1",
        longitudeEstacao: "-46.6333",
        tipoParametros: [
            {
                idTipoParametro: 1,
                nomeTipoParametro: "Temperatura",
                unidadeTipoParametro: "ºC",
                fatorTipoParametro: "1"
            }
        ]
    } as unknown as Estacao;
};

export default new MocksEstacaoControllerListagemEspecifica();