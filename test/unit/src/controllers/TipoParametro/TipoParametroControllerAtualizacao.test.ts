import { Request } from "express";
import MockResponse from "../MockResponse";
import TipoParametroController from "../../../../src/controllers/TipoParametroController";


jest.mock("../../../../src/data-source",()=>{
    const mockRepository = {
        save: (TipoParametroAtualizado: string) => {
            return;
        },
        findOne: (parametros:{where:{idTipoParametro:number}})=>{
            if(parametros.where.idTipoParametro == 1) //IdCorreto
                return "TipoParametro Existente"
            if(parametros.where.idTipoParametro == 3)
                return "Alteracoes do tipoParametros identicas a um já existente"
            return undefined
        }
    };
    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})

jest.mock("../../../../src/services/TipoParametro/ConfereIgualdadeTipoParametro", ()=>{
    return{
        conferir:jest.fn((tipoParametro:any)=>{
            if(tipoParametro.retorno == "Alteracoes do tipoParametros identicas a um já existente")
                return false
            else
                return true
        })
    };
})

jest.mock("../../../../src/services/TipoParametro/AtualizaAtributoTipoParametro", ()=>{
    return{
        atualizar:jest.fn((tipoParametro:string, req:Request)=>{
            if(tipoParametro == "Alteracoes do tipoParametros identicas a um já existente")
                return {nomeTipoParametro:"TESTE", unidadeTipoParametro:"Teste", retorno:tipoParametro}
            else
                return tipoParametro
        })
    };
})

let req = {
    body:{
        idTipoParametro:"1",
        nomeTipoParametro:"TESTE",
        unidadeTipoParametro:"TESTE"
    }
}

describe("Teste do controller tipoParametro usando a função atualizar()",()=>{

    test("Testando resposta quando a atualização deu certo", async()=>{
        req.body.idTipoParametro = "1" 
        const requisicao = req as Request
        let mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear()
        await TipoParametroController.atualizar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Tipo parametro atualizado com sucesso")
    })

    test("Testando resposta quando o id do tipoParametro é inexistente", async()=>{
        req.body.idTipoParametro = "2" 
        const requisicao = req as Request
        let mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await TipoParametroController.atualizar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Id do Tipo Parametro não encontrado")
    })

    test("Testando resposta quando atualizo um tipoParametro deixando-o igual a um já existente", async()=>{
        req.body.idTipoParametro = "3" 
        const requisicao = req as Request
        let mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await TipoParametroController.atualizar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("TipoParametro identico já existe no banco de dados")
    })

})