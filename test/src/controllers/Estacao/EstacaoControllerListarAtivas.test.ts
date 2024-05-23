import { Request } from "express";
import EstacaoController from "../../../../src/controllers/EstacaoController";
import MockResponse from "../MockResponse";
import { Estacao } from "../../../../src/entities/Estacao";
import InterfaceFiltroSelecao from "../../../../src/services/InterfaceFiltroSelecao";
import { Repository } from "typeorm";

let listaEstacaoArmazenadas: Estacao[] = [];
const listaEstacaoRecuperadas: Estacao[] = [];
let reqQueryNome: string;
let reqQueryCidade: string;

jest.mock("../../../../src/data-source.ts", () => {
    return {
        getRepository: jest.fn(),
    };
});

jest.mock("../../../../src/services/Estacao/TrataValoresFiltroEstacao.ts", () => {
    const mockTratarReqQuery = (req: Request): InterfaceFiltroSelecao => {
        const filtro = {
            valores: {
                nome: req.query.nome,
                cidadeEstacao: req.query.cidade,
                statusEstacao: true
            }
        } as unknown as InterfaceFiltroSelecao;

        return filtro;
    };

    const mockTratarSelect = jest.fn(mockTratarReqQuery);

    return {
        tratarSelect: mockTratarSelect,
    };
});

jest.mock("../../../../src/services/Estacao/SelecaoFiltroEstacao.ts", () => {
    const mockBuscaEstacaoComFiltro = (repositorio: Repository<Estacao>, filtro: InterfaceFiltroSelecao): Estacao[] => {
        for (const estacao of listaEstacaoArmazenadas) {
            if(estacao.nomeEstacao.includes(reqQueryNome) && estacao.cidadeEstacao.includes(reqQueryCidade) && estacao.statusEstacao == true)
                listaEstacaoRecuperadas.push(estacao);
        }
        console.log(listaEstacaoRecuperadas);
        return listaEstacaoRecuperadas;
    }

    const mockSelecaoFiltroEstacao = jest.fn(mockBuscaEstacaoComFiltro);

    return {
        aplicarFiltro: mockSelecaoFiltroEstacao,
    };
});


describe ("Teste da classe EstacaoController método listarEstacoesAtivas", () => {

    beforeAll(() => {
        listaEstacaoArmazenadas = [            
                {
                    idEstacao: "85130000-6bf3-47d9-b6f3-dfbcc62080fe",
                    idPlacaEstacao: "abc-123",
                    nomeEstacao: "Norte5",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande1",
                    estadoEstacao: "Estado Grande",
                    cepEstacao: "12325-678",
                    latitudeEstacao: 5.00000000,
                    longitudeEstacao: -21.63330000,
                    unixtimeBateriaEstacao: 1714231183,
                    statusEstacao: true,
                    bateriaEstacao: 0,
                    tipoParametros: [],
                    parametros: []
                },
                {
                    idEstacao: "0887b5b3-a3ec-4f79-8cb7-6ad6a8a1c935",
                    idPlacaEstacao: "abc-123",
                    nomeEstacao: "Norte",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande2",
                    estadoEstacao: "Estado Grande",
                    cepEstacao: "12325-678",
                    latitudeEstacao: 1.00000000,
                    longitudeEstacao: -21.63330000,
                    unixtimeBateriaEstacao: 1714230775,
                    statusEstacao: true,
                    bateriaEstacao: 0,
                    tipoParametros: [],
                    parametros: []
                },
                {
                    idEstacao: "293c0d74-ef6e-480e-b8bd-9393650c623d",
                    nomeEstacao: "Norte6",
                    idPlacaEstacao: "abc-123",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande3",
                    estadoEstacao: "Estado Grande",
                    cepEstacao: "12325-678",
                    latitudeEstacao: 6.00000000,
                    longitudeEstacao: -21.63330000,
                    unixtimeBateriaEstacao: 1714231248,
                    statusEstacao: true,
                    bateriaEstacao: 0,
                    tipoParametros: [],
                    parametros: []
                },
                {
                    idEstacao: "a4603e64-9dd5-45a5-bd08-6e6d63f5e1e3",
                    idPlacaEstacao: "abc-123",
                    nomeEstacao: "Norte2",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande4",
                    estadoEstacao: "Estado Grande",
                    cepEstacao: "12325-678",
                    latitudeEstacao: 2.00000000,
                    longitudeEstacao: -21.63330000,
                    unixtimeBateriaEstacao: 1714230960,
                    statusEstacao: true,
                    bateriaEstacao: 0,
                    tipoParametros: [],
                    parametros: []
                },
                {
                    idEstacao: "d75db9ce-88b9-42e9-9f01-3dd0d893392b",
                    idPlacaEstacao: "abc-123",
                    nomeEstacao: "Norte4",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande5",
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
                    idPlacaEstacao: "abc-123",
                    nomeEstacao: "Norte3",
                    ruaAvenidaEstacao: "Rua das Flores",
                    numeroEnderecoEstacao: "123",
                    bairroEstacao: "Centro",
                    cidadeEstacao: "Cidade Grande6",
                    estadoEstacao: "Estado Grande",
                    cepEstacao: "12325-678",
                    latitudeEstacao: 3.00000000,
                    longitudeEstacao: -21.63330000,
                    unixtimeBateriaEstacao: 1714231012,
                    statusEstacao: true,
                    bateriaEstacao: 0,
                    tipoParametros: [],
                    parametros: []
                }
              
        ];
    });

    test ("Teste listagem Pública de Estacão com sucesso", async () => {
        const req = {
            query: {
                nome: "Norte",
                cidade: "Grande6"
            }
        } as unknown as Request;

        reqQueryNome = "Norte";
        reqQueryCidade = "Grande6";

        const listaRetornoEstacao: Estacao[] = [
            {
                "idEstacao": "6415a2d7-a832-4cff-9ef1-5762aa3cdb06",
                "idPlacaEstacao": "abc-123",
                "nomeEstacao": "Norte3",
                "ruaAvenidaEstacao": "Rua das Flores",
                "numeroEnderecoEstacao": "123",
                "bairroEstacao": "Centro",
                "cidadeEstacao": "Cidade Grande6",
                "estadoEstacao": "Estado Grande",
                "cepEstacao": "12325-678",
                "latitudeEstacao": 3.00000000,
                "longitudeEstacao": -21.63330000,
                "unixtimeBateriaEstacao": 1714231012,
                "statusEstacao": true,
                "bateriaEstacao": 0,
                "tipoParametros": [],
                "parametros": []
            }
        ];
        
        await EstacaoController.listarEstacoesAtivas(req, MockResponse.resSemLocals);
        const mockRespostaStatus = MockResponse.resSemLocals.status(200).send as jest.Mock;
        expect(mockRespostaStatus.mock.calls[0][0]).toStrictEqual(listaRetornoEstacao);
        mockRespostaStatus.mockClear();
    });
});

