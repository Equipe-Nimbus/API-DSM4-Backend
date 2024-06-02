import EstacaoController from "../../../../../src/controllers/EstacaoController";
import { Estacao } from "../../../../../src/entities/Estacao";
import { Parametro } from "../../../../../src/entities/Parametro";
import { TipoParametro } from "../../../../../src/entities/TipoParametro";
import MockResponse from "../MockResponse";
import MockEstacaoControllerAtualizar from "./MockEstacaoControllerAtualizar";

let listaEstacoesArmazenadas: Estacao[] = [];
let estacaoAlteracao = new Estacao();
let reapostaConsultaCoordenadaGeografica = new Boolean();
let respostaConsultaMesmoNomeUnidadeTipoParametro = new Boolean();
let idEstacaoFindOne = new String();
const listaParametro: Parametro[] = [];

jest.mock("../../../../../src/data-source.ts", () => {
    const mockRepositorioEstacao = {
        findOne: () => {
            for (const estacaoRecuperada of listaEstacoesArmazenadas) {
                if (estacaoRecuperada.idEstacao == idEstacaoFindOne)
                    return estacaoRecuperada;
            }
        },
        createQueryBuilder: jest.fn().mockReturnValue({
            update: jest.fn().mockReturnValue({
                set: jest.fn().mockReturnValue({
                    where: jest.fn().mockReturnValue({
                        execute: jest.fn().mockImplementation(() => {
                            for (const estacaoRecuperada of listaEstacoesArmazenadas) {
                                if (estacaoRecuperada.idEstacao == estacaoAlteracao.idEstacao) {
                                    const possicaoEstacaoRecuperada: number = listaEstacoesArmazenadas.indexOf(estacaoRecuperada);
                                    console.log(possicaoEstacaoRecuperada);
                                    listaEstacoesArmazenadas[possicaoEstacaoRecuperada] = estacaoAlteracao;
                                    console.log(listaEstacoesArmazenadas[possicaoEstacaoRecuperada]);
                                };  
                            };
                        })
                    })
                })
            }),
            relation: jest.fn().mockReturnValue({
                of: jest.fn().mockReturnValue({
                    add: jest.fn()
                })
            }),
        }),

    };

    const mockGetRepository = jest.fn(() => mockRepositorioEstacao);
    return {
        getRepository: mockGetRepository,
    }
});

jest.mock("../../../../../src/services/Estacao/ConsultaCoordenadaGeograficaEstacao.ts", () => {
    const mockCoordenadaGeograficaEstacao =
        (estacaoParaConsultaGeografica: Estacao) => {
            if (reapostaConsultaCoordenadaGeografica)
                return estacaoParaConsultaGeografica.idEstacao;
            return null;            
        };

    const mockConsultaCoordenadaGeografica = jest.fn(mockCoordenadaGeograficaEstacao);
    return {
        consulta: mockConsultaCoordenadaGeografica,
    }
});

jest.mock("../../../../../src/services/Estacao/ManipulaObjetoParametro.ts", () => {
    const mockListaObjetoParametro = (listaTipoParametro: TipoParametro[]) => {
        return listaParametro;
    };
    const mockCriaObjetoParametro = jest.fn(mockListaObjetoParametro);
    return {
        consultaTipoParametroEmParametro: mockCriaObjetoParametro,
    };
});

jest.mock("../../../../../src/services/Estacao/ConsultaMesmoNomeUnidadeTipoParametro", () => {
    const mockConultaNomeUnidadeTipoParametro = (listaIdTipoParametro) => {
        if(respostaConsultaMesmoNomeUnidadeTipoParametro === true)
            return true;
        return false;
    };

    const mockConsultaMesmoNomeUnidadeTipoParametro = jest.fn(mockConultaNomeUnidadeTipoParametro);
    return {
        consulta: mockConsultaMesmoNomeUnidadeTipoParametro,
    }
});


describe("Teste da classe estacaoController método atualizar", () => {

    beforeEach(() => {
        listaEstacoesArmazenadas = [];
        listaEstacoesArmazenadas.push(MockEstacaoControllerAtualizar.estacaoInicial);
        idEstacaoFindOne = null;
        reapostaConsultaCoordenadaGeografica = null;
        respostaConsultaMesmoNomeUnidadeTipoParametro = null;
    });

    test("Teste atualizar estação com sucesso", async () => {
        idEstacaoFindOne = "abcd-1234"
        reapostaConsultaCoordenadaGeografica = false;
        respostaConsultaMesmoNomeUnidadeTipoParametro = false;
        await EstacaoController.atualizar(MockEstacaoControllerAtualizar.reqEstacaoAtualizar, MockResponse.resSemLocals);
        const mockStatus = MockResponse.resSemLocals.status(200).send as jest.Mock;
        expect(mockStatus.mock.calls[0][0]).toBe("Estação atualizada com sucesso");
        mockStatus.mockClear();
    });
});