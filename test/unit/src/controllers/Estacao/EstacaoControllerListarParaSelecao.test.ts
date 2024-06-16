import EstacaoController from "../../../../../src/controllers/EstacaoController";
import MockResponse from "../MockResponse";
import { Request } from "express";

jest.mock("../../../../../src/data-source", ()=>{

    const mockRepository = {
        createQueryBuilder:jest.fn().mockReturnValue({
            select:jest.fn().mockReturnValue({
                where:jest.fn().mockReturnValue({
                    getMany:jest.fn(()=>{
                        return "FOI"
                    })
                })     
            })                       
        }),
    }
    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})

const req = {} as Request

describe("Teste Listagem para selecao", ()=>{

    test("Listar para seleção bem sucedida", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear()
        await EstacaoController.listarParaSelecao(req, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("FOI")
    })

})