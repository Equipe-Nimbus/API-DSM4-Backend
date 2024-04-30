import { Request } from "express";
import EstacaoController from "../../../../src/controllers/EstacaoController";
import MockResponse from "../MockResponse";
import MockEstacaoControllerListarAtiva from "./MockEstacaoControllerListarAtiva";
import { Estacao } from "../../../../src/entities/Estacao";

let listaEstacao: Estacao[] = [];

jest.mock("../../../../src/data-source.ts", () => {
    const mockRepositorioEstacao = {
        find: () => listaEstacao.filter(estacao => estacao.statusEstacao === true)
    };

    const mockGetRepository = jest.fn(() => mockRepositorioEstacao);
    return {
        getRepository: mockGetRepository,
    };
});


describe ("Teste da classe EstacaoController método listarEstacoesAtivas", () => {

    beforeAll(() => {
        listaEstacao = [
            
                {
                    idEstacao: "85130000-6bf3-47d9-b6f3-dfbcc62080fe",
                    nomeEstacao: "Norte5",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande",
                    estadoEstacao: "Estado Grande",
                    cepEstacao: "12325-678",
                    latitudeEstacao: 5.00000000,
                    longitudeEstacao: -21.63330000,
                    unixtimeBateriaEstacao: 1714231183,
                    statusEstacao: false,
                    bateriaEstacao: 0,
                    tipoParametros: [],
                    parametros: []
                },
                {
                    idEstacao: "0887b5b3-a3ec-4f79-8cb7-6ad6a8a1c935",
                    nomeEstacao: "Norte",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande",
                    estadoEstacao: "Estado Grande",
                    cepEstacao: "12325-678",
                    latitudeEstacao: 1.00000000,
                    longitudeEstacao: -21.63330000,
                    unixtimeBateriaEstacao: 1714230775,
                    statusEstacao: false,
                    bateriaEstacao: 0,
                    tipoParametros: [],
                    parametros: []
                },
                {
                    idEstacao: "293c0d74-ef6e-480e-b8bd-9393650c623d",
                    nomeEstacao: "Norte6",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande",
                    estadoEstacao: "Estado Grande",
                    cepEstacao: "12325-678",
                    latitudeEstacao: 6.00000000,
                    longitudeEstacao: -21.63330000,
                    unixtimeBateriaEstacao: 1714231248,
                    statusEstacao: false,
                    bateriaEstacao: 0,
                    tipoParametros: [],
                    parametros: []
                },
                {
                    idEstacao: "a4603e64-9dd5-45a5-bd08-6e6d63f5e1e3",
                    nomeEstacao: "Norte2",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande",
                    estadoEstacao: "Estado Grande",
                    cepEstacao: "12325-678",
                    latitudeEstacao: 2.00000000,
                    longitudeEstacao: -21.63330000,
                    unixtimeBateriaEstacao: 1714230960,
                    statusEstacao: false,
                    bateriaEstacao: 0,
                    tipoParametros: [],
                    parametros: []
                },
                {
                    idEstacao: "d75db9ce-88b9-42e9-9f01-3dd0d893392b",
                    nomeEstacao: "Norte4",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande",
                    estadoEstacao: "Estado Grande",
                    cepEstacao: "12325-678",
                    latitudeEstacao: 4.00000000,
                    longitudeEstacao: -21.63330000,
                    unixtimeBateriaEstacao: 1714231069,
                    statusEstacao: false,
                    bateriaEstacao: 0,
                    tipoParametros: [],
                    parametros: []
                },
                {
                    idEstacao: "6415a2d7-a832-4cff-9ef1-5762aa3cdb06",
                    nomeEstacao: "Norte3",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande",
                    estadoEstacao: "Estado Grande",
                    cepEstacao: "12325-678",
                    latitudeEstacao: 3.00000000,
                    longitudeEstacao: -21.63330000,
                    unixtimeBateriaEstacao: 1714231012,
                    statusEstacao: false,
                    bateriaEstacao: 0,
                    tipoParametros: [],
                    parametros: []
                }
              
        ];
    });

    test ("Deve estar certo ao buscar estações ativas", async () => {
        const req = {} as unknown as Request;
        const mockRespostaStatus = MockResponse.resSemLocals.status as jest.Mock;
        mockRespostaStatus.mockClear();
        
        listaEstacao = [];
        
        await EstacaoController.listarEstacoesAtivas(req, MockResponse.resSemLocals);

        expect(mockRespostaStatus.mock.calls[0][0]).toBe(200); 
    });
});

