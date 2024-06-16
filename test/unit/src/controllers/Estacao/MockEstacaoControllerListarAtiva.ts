import { Estacao } from "../../../../../src/entities/Estacao";

class MocksEstacaoControllerListarAtiva {

    estacoesAtivas = [
        {
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
        },
        {
            idEstacao: "2",
            nomeEstacao: "Estação Sul",
            ruaAvenidaEstacao: "Rua das Árvores",
            numeroEnderecoEstacao: "456",
            bairroEstacao: "Periferia",
            cidadeEstacao: "Cidade Pequena",
            estadoEstacao: "Estado Pequeno",
            cepEstacao: "54321-987",
            latitudeEstacao: "-10",
            longitudeEstacao: "40.1234",
            parametros: [
                {
                    tiposParametro: {
                        idTipoParametro: 2,
                        nomeTipoParametro: "Umidade",
                        unidadeTipoParametro: "%",
                        fatorTipoParametro: "1",
                    },
                    statusParametro: true
                }
            ]
        }
    ] as unknown as Estacao[];

};

export default new MocksEstacaoControllerListarAtiva();
