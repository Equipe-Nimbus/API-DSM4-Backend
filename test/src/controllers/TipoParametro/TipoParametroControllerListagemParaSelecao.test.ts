import TipoParametroController from "../../../../src/controllers/TipoParametroController";
import MockResponse from "../MockResponse";
import { Request } from "express";


jest.mock("../../../../src/data-source", ()=>{

    const mockRepository = {
        createQueryBuilder:jest.fn().mockReturnValue({
            leftJoin:jest.fn().mockReturnValue({
                leftJoin:jest.fn().mockReturnValue({
                    select:jest.fn().mockReturnValue({
                        where:jest.fn().mockReturnValue({
                            getMany:jest.fn(()=>{
                                return "FOI"
                            })
                        })     
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



describe("Teste de listagem para selecao", ()=>{

    test("Testando resposta de sucesso", async()=>{
        const mockRes = (MockResponse.resSemLocals.status as jest.Mock).mockClear()
        const req = { params: { idEstacao: 1 } } as unknown as Request
        await TipoParametroController.listarParaSelecaoComIdEstacao(req, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe(200)
    })
})