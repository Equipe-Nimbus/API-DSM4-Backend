import { Request } from "express";
import { Estacao } from "../../../../src/entities/Estacao";
import EstacaoController from "../../../../src/controllers/EstacaoController";
import MockEstacaoControllerListagemEspecifica from "./MockEstacaoControllerListagemEspecifica";
import MockResponse from "../MockResponse";
import { TipoParametro } from "../../../../src/entities/TipoParametro";

let listaEstacao: Estacao[] = [];

jest.mock("../../../../src/data-source.ts", () => {

    const mockRepositorioEstacao = {
        findOne: (idObjeto: { where: { idEstacao: number }}) => {
            let estacaoRecuperada: Estacao;
            for(const estacao of listaEstacao) {
                if (estacao.idEstacao === idObjeto.where.idEstacao) {
                    estacaoRecuperada = estacao; 
                };
            };
            if (estacaoRecuperada)
                return estacaoRecuperada;
            return undefined;
        }
    };

    const mockGetRepository = jest.fn(() => mockRepositorioEstacao);
    return {
        getRepository: mockGetRepository,
    };
});

let req = {
    params: {
        id: null
    }
} as unknown as Request;

describe ("Teste da classe EstacaoController método listarEspecifico", () => {

    beforeAll(() => {
        listaEstacao.push(MockEstacaoControllerListagemEspecifica.estacaoBusca);
    });

    beforeEach(() => {
        req.params.id = null;
    });
    
    test ("Teste listar estação com sucesso", async () => {
        req.params.id = "1";
        await EstacaoController.listarEspecifico(req, MockResponse.resSemLocals);
        const mockResposta = MockResponse.resSemLocals.status(200).send as jest.Mock;
        if(mockResposta.mock.calls[0][0] == "Objeto estação não encontrado")
            fail("Estação não encontrada, mesmo com idEstacao correto");
        else {
            expect(mockResposta.mock.calls[0][0]).toStrictEqual(MockEstacaoControllerListagemEspecifica.estacaoResposta);            
        }
    });

    test ("Teste listar estação com falha", async () => {
        req.params.id = "0";
        const mockRespostaStatus = MockResponse.resSemLocals.status as jest.Mock;
        mockRespostaStatus.mockClear();
        await EstacaoController.listarEspecifico(req, MockResponse.resSemLocals);
        const mockResposta = MockResponse.resSemLocals.status(400).send as jest.Mock;
        if(mockResposta.mock.calls[0][0] != "Objeto estação não encontrado")
            expect(mockRespostaStatus.mock.calls[0][0]).toBe(400);            
        mockResposta.mockClear();
        mockRespostaStatus.mockClear();
    });
});
