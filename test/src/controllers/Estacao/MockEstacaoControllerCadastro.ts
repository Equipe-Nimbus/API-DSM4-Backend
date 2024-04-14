import { Request } from "express";

class MockEstacaoControllerCadastro {
    reqEstacaoInicial = {
        body: {
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
        }
    } as unknown as Request;

    reqEstacaoNomeRepetido = {
        body: {
            nomeEstacao: "Estação Central",
            ruaAvenidaEstacao: "Avenida dos Bandeirantes",
            numeroEnderecoEstacao: "789",
            bairroEstacao: "Bairro Novo",
            cidadeEstacao: "Cidade Pequena",
            estadoEstacao: "Estado Pequeno",
            cepEstacao: "54321-987",
            latitudeEstacao: "-22.9876",
            longitudeEstacao: "-47.1234",
            tipoParametros: [
                {
                  idTipoParametro: 1                  
                }
              ]
        }          
    } as unknown as Request;

    reqEstacaoCoordenadaGeografica = {
        body: {
            nomeEstacao: "Estação Sul",
            ruaAvenidaEstacao: "Avenida dos Bandeirantes",
            numeroEnderecoEstacao: "789",
            bairroEstacao: "Bairro Novo",
            cidadeEstacao: "Cidade Pequena",
            estadoEstacao: "Estado Pequeno",
            cepEstacao: "54321-987",
            latitudeEstacao: "-23.5505",
            longitudeEstacao: "-46.6333",
            tipoParametros: [
                {
                  idTipoParametro: 1                  
                }
              ]
        }          
    } as unknown as Request;

    reqEstacaoPropriedadeNula = {
        body: {
            nomeEstacao: "Estação Sul",
            ruaAvenidaEstacao: "Avenida dos Bandeirantes",
            numeroEnderecoEstacao: "",
            bairroEstacao: "Bairro Novo",
            cidadeEstacao: "Cidade Pequena",
            estadoEstacao: "Estado Pequeno",
            cepEstacao: "54321-987",
            latitudeEstacao: "-23.5505",
            longitudeEstacao: "-46.6333",
            tipoParametros: [
                {
                  idTipoParametro: 1                  
                }
              ]
        }          
    } as unknown as Request;

    reqEstacaoSemTipoParametro = {
        body: {
            nomeEstacao: "Estação Sul",
            ruaAvenidaEstacao: "Avenida dos Bandeirantes",
            numeroEnderecoEstacao: "",
            bairroEstacao: "Bairro Novo",
            cidadeEstacao: "Cidade Pequena",
            estadoEstacao: "Estado Pequeno",
            cepEstacao: "54321-987",
            latitudeEstacao: "-23.5505",
            longitudeEstacao: "-46.6333",
            tipoParametros: []
        }
    } as unknown as Request;
};

export default new MockEstacaoControllerCadastro();