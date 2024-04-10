import { Request } from "express";
import MockResponse from "../MockResponse";
import EstacaoController from "../../../../src/controllers/EstacaoController";

let listaEstacao = [
    {
        idEstacao:1,
        statusEstacao:true
    },
    {
        idEstacao:2,
        statusEstacao:true
    },
    {
        idEstacao:3,
        statusEstacao:true
    }
]

interface InterfaceMockEstacao{
    idEstacao:number,
    statusEstacao:boolean
}

jest.mock("../../../../src/data-source", ()=>{
    
    const mockRepositorioEstacao = {
        findOne: (idObjeto: { where: { idEstacao: number }}) => {
            let estacaoRecuperada: InterfaceMockEstacao;
            for(const estacao of listaEstacao) {
                if (estacao.idEstacao === idObjeto.where.idEstacao) {
                    estacaoRecuperada = estacao; 
                };
            };
            if (estacaoRecuperada)
                return estacaoRecuperada;
            return undefined;
        },
        save:jest.fn()
    };

    const mockGetRepository = jest.fn(() => mockRepositorioEstacao);
    return {
        getRepository: mockGetRepository,
    };

})

let req = {
    params:{
        idEstacao:0
    }
}

describe("Testes de deleção de Esteção", ()=>{

    test("Delecao de uma estação de idInexistente", async()=>{
        req.params.idEstacao = 0
        const requisicao = req as unknown as Request
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await EstacaoController.deletar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("idEstação não encontrado no banco de dados")
    })

    test("Delecao de uma estação com sucesso", async()=>{
        req.params.idEstacao = 1
        const requisicao = req as unknown as Request
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear()
        await EstacaoController.deletar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Estacao deletada com sucesso")
    })

})