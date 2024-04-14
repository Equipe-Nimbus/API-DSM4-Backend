import TipoParametroController from "../../../../src/controllers/TipoParametroController";
import { TipoParametro } from "../../../../src/entities/TipoParametro";
import MockResponse from "../MockResponse";
import { Request } from "express";

let tipoParametrosCadastrados:TipoParametro[] = []

jest.mock("../../../../src/services/Parametro/DelecaoCascataParametro", ()=>{
    return{
        deletar:jest.fn()
    }
})

jest.mock("../../../../src/data-source", ()=>{
    const mockRepository = {
        findOne: (parametros:{where:{idTipoParametro:number}})=>{
            let tipoParametroExistente = undefined
            tipoParametrosCadastrados.forEach(tipoParametro => {
                if(tipoParametro.idTipoParametro == parametros.where.idTipoParametro)
                    tipoParametroExistente = tipoParametro
            });
            return tipoParametroExistente
        },
        save:(tipoParametro:TipoParametro)=>{
            tipoParametrosCadastrados.forEach(tipoParametroCadastrado => {
                if(tipoParametro.idTipoParametro == tipoParametroCadastrado.idTipoParametro)
                    tipoParametroCadastrado.statusTipoParametro = tipoParametro.statusTipoParametro
            });
        }
    };
    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})

let reqTipoParametroExistente = {
    params: {
        id:"1"
    }
} as unknown as Request

let reqTipoParametroNaoExistente = {
    params: {
        id:"0"
    }
} as unknown as Request

describe("Teste deleção tipo Parametro", ()=>{

    beforeAll(()=>{
        for(let id = 1; id <= 25; id++){
            let tipoParametro = new TipoParametro()
            tipoParametro.idTipoParametro = id
            tipoParametro.statusTipoParametro = true
            tipoParametrosCadastrados.push(tipoParametro)
        }
    })

    test("Deletar tipo Parametro existente", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear()
        await TipoParametroController.deletar(reqTipoParametroExistente, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Tipo Parametro deletado com sucesso")
    })
    test("Deletar tipo Parametro não existente", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await TipoParametroController.deletar(reqTipoParametroNaoExistente, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Tipo Parametro não pode ser deletado pois não existe")
    })

})