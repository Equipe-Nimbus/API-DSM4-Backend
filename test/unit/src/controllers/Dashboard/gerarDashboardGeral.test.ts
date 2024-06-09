import { Request } from "express"
import MockResponse from "../MockResponse"
import DashboardController from "../../../../src/controllers/DashboardController"

let erro = false

jest.mock("../../../../src/data-source.ts", () => {
    return jest.fn();
})

jest.mock("../../../../src/services/Dashboard/GeraDashBoardgeral.ts", () => {
    return{
        gerar:jest.fn(()=>{
            if(erro)
                throw new Error("algo deu errado")
            return {status:"DEU CERTO"}
        })
    }
})

const req = {} as Request

describe("Retorno da função objetivo de geração de dashboard geral", ()=>{

    test("Geração falha", async()=>{
        erro = true
        let mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await DashboardController.gerarDashboardGeral(req, MockResponse.resSemLocals);
        expect(mockRes.mock.calls[0][0]).toBe("algo deu errado")
    })

    test("Geração com sucesso", async()=>{
        erro = false
        let mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear()
        await DashboardController.gerarDashboardGeral(req, MockResponse.resSemLocals);
        expect(mockRes.mock.calls[0][0].status).toBe("DEU CERTO")
    })
})