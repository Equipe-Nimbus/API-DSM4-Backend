import EstacaoController from "../../../../src/controllers/EstacaoController";
import { Estacao } from "../../../../src/entities/Estacao";
import MockResponse from "../MockResponse";
import MockEstacaoControllerlistagemGeral from "./MockEstacaoControllerlistagemGeral";

let skip:number;
let take:number;
let listaEstacaoCadastrada: Estacao[] = [];

/* jest.mock("../../../../src/data-source.ts", () => {
    const mockRepositorioEstacao = {
        count: (listaEstacaoRecuperadas: Estacao[]) => {
            let quantidadeEstacaoRecuperada = 0;
            for(const estacaoRecuperada of listaEstacaoRecuperadas) {
                quantidadeEstacaoRecuperada++;
            }
            return quantidadeEstacaoRecuperada;
        },
    };
}); */

jest.mock("../../../../src/data-source", ()=>{

    const mockRepository = {
        createQueryBuilder:jest.fn().mockReturnValue({
            select:jest.fn().mockReturnValue({
                where:jest.fn().mockReturnValue({
                    orderBy:jest.fn().mockReturnValue({
                        skip:jest.fn().mockReturnValue({
                            take:jest.fn().mockReturnValue({
                                getMany:jest.fn(() => {
                                    let listaEstacaoRecuperada: Estacao[] = [];
                                    let contador = 1;
                                    if(take==0)
                                        throw new Error();
                                    listaEstacaoCadastrada.forEach(estacao => {
                                        if (estacao.statusEstacao == true) {
                                            if (contador > skip && listaEstacaoRecuperada.length < take && estacao.statusEstacao == true) {
                                                listaEstacaoRecuperada.push(estacao);
                                                contador ++;
                                            };
                                            contador ++;
                                        };                                            
                                    });
                                    return listaEstacaoRecuperada;
                                })
                            })
                        })
                    })
                })
            })
        }),
        count:jest.fn().mockReturnValue(25)
    }

    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
});

describe("Listagem paginada de estações", () => {

    beforeAll(() => {
        for(let id = 1; id <= 40; id++) {
            let estacao = new Estacao();
            estacao.idEstacao = id;
            if ((id % 2) == 0 )
                estacao.statusEstacao = true;
            else {
                estacao.statusEstacao = false;
            }
            listaEstacaoCadastrada.push(estacao);
        };
    });

    test("teste página 1 com tamanho 10", async () => {
        skip = 0;
        take = 10;
        await EstacaoController.listarPaginada(MockEstacaoControllerlistagemGeral.reqPagina1Limit10, MockResponse.resSemLocals);
        const mockResponse = MockResponse.resSemLocals.status(200).send as jest.Mock;
        console.log(mockResponse.mock.calls[0][0]);
        expect(mockResponse.mock.calls[0][0].estacoes[9].idEstacao).toBe(20);
        expect(mockResponse.mock.calls[0][0].estacoes.length).toBe(10);
        mockResponse.mockClear();
    });

    test("teste página 0", async () => {
        skip = 10;
        take = 0;
        const mockResponseStatus = (MockResponse.resSemLocals.status as jest.Mock).mockClear();
        await EstacaoController.listarPaginada(MockEstacaoControllerlistagemGeral.reqPagina0Limit10, MockResponse.resSemLocals);
        const mockResponse = MockResponse.resSemLocals.status(400).send as jest.Mock;
        expect(mockResponse.mock.calls[0][0]).toBe("Não é permitido requisitar a página 0!");
        expect(mockResponseStatus.mock.calls[0][0]).toBe(400);
        mockResponseStatus.mockClear();
        mockResponse.mockClear();       
    });

    test("teste página 2 tamanho 10", async () => {
        skip = 10;
        take = 10;
        await EstacaoController.listarPaginada(MockEstacaoControllerlistagemGeral.reqPagina2Limit10, MockResponse.resSemLocals);
        const mockResponse = MockResponse.resSemLocals.status(200).send as jest.Mock;
        console.log(mockResponse.mock.calls[0][0]);
        expect(mockResponse.mock.calls[0][0].estacoes[9].idEstacao).toBe(40);
        expect(mockResponse.mock.calls[0][0].estacoes.length).toBe(10);
        mockResponse.mockClear();
    });
});