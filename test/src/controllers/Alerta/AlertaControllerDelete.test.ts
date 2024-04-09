import { Request } from "express";
import { Alerta } from "../../../../src/entities/Alerta";
import MockResponse from "../MockResponse";
import AlertaController from "../../../../src/controllers/AlertaController";

let listaAlertasCadastrados = []

jest.mock("../../../../src/data-source", ()=>{

    const mockRepository = {
        findOne: (parametros:{where:{idAlerta:number}})=>{
            let alertaEncontrado = undefined
            listaAlertasCadastrados.forEach(alerta => {
                if(alerta.idAlerta == parametros.where.idAlerta){
                    alertaEncontrado = alerta
                }
            });
            return alertaEncontrado
        },
        save: (alerta:Alerta)=>{
            return;
        }
    }

    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})



let req = {
    params:{
        idAlerta:1
    }
}

describe("Testes de deleção de alertas", ()=>{

    beforeEach(()=>{
        listaAlertasCadastrados = []
        for(let id = 1; id < 3; id++){
            const alerta = {idAlerta:id, statusAlerta:true}
            listaAlertasCadastrados.push(alerta)
        }
    })

    test("Deleção de id não existente", async()=>{
        req.params.idAlerta = 0
        const requisicao = req as unknown as Request
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await AlertaController.deletar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Id do alerta não encontrado")
    })

    test("Deleção de id existente", async()=>{
        req.params.idAlerta = 1
        const requisicao = req as unknown as Request
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear()
        await AlertaController.deletar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Alerta cadastrado com sucesso")
    })

})