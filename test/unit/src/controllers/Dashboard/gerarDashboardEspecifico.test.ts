import DashboardController from "../../../../../src/controllers/DashboardController"
import MockResponse from "../MockResponse"
import { Request } from "express"


jest.mock("../../../../../src/data-source.ts", () => {
    return jest.fn();
})


jest.mock("../../../../../src/services/Dashboard/GeraDashboardEspecifico.ts", () => {
    return{
        gerar:jest.fn((id:string)=>{
            if(id=="certo")
                return {parametros:["foi"]}
            if(id=="erro uuid")
                throw Error('invalid input syntax for type uuid: "1"')
            if(id=="erro id inexistente")
                throw Error("idEstacao não existente ou estação sem medições")
        })
    }
})


let req ={
    params: {
        idEstacao: "certo"
    }
} as unknown as Request

describe("Gerar Dashboard Especifico", ()=>{
    test("id estação existe", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear()
        await DashboardController.geratDashboardEstacao(req, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0].parametros[0]).toBe("foi")
    })

    test("id estação que não é uuid", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        req.params.idEstacao = "erro uuid"
        await DashboardController.geratDashboardEstacao(req, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe('invalid input syntax for type uuid: "1"')
    })

    test("id estação que não existem", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        req.params.idEstacao = "erro id inexistente"
        await DashboardController.geratDashboardEstacao(req, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("idEstacao não existente ou estação sem medições")
    })
})