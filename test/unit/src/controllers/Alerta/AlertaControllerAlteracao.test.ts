import { Repository } from "typeorm";
import { Alerta } from "../../../../../src/entities/Alerta";
import { Parametro } from "../../../../../src/entities/Parametro";
import { Request } from "express";
import MockResponse from "../MockResponse";
import AlertaController from "../../../../../src/controllers/AlertaController";

let listaAlertaCadastrados:InterfaceAlertasMockado[] = [
    {
        idAlerta:1,
        nomeAlerta:"Chuva",
        condicaoAlerta:"<",
        parametro: new Parametro(),
        statusAlerta:true,
        valorMedicaoAlerta: 50
    },
    {
        idAlerta:2,
        nomeAlerta:"Pluviometro",
        condicaoAlerta:"<",
        parametro: new Parametro(),
        statusAlerta:true,
        valorMedicaoAlerta: 50
    }
]

interface InterfaceAlertasMockado{
    idAlerta:number,
    nomeAlerta:string,
    condicaoAlerta:string,
    parametro:Parametro,
    statusAlerta:boolean,
    valorMedicaoAlerta:number
}

jest.mock("../../../../../src/services/Alerta/ConfereExistenciaAlertaIdentico", ()=>{
    return {
        confere:jest.fn((repositorio:Repository<Alerta>, alerta:Alerta)=>{
            let resultado = false
            listaAlertaCadastrados.forEach(alertaCadastrado => {
                if(alerta.idAlerta==alertaCadastrado.idAlerta && alerta.nomeAlerta==alertaCadastrado.nomeAlerta && alerta.condicaoAlerta==alertaCadastrado.condicaoAlerta && alerta.valorMedicaoAlerta==alertaCadastrado.valorMedicaoAlerta)
                    resultado = true
            });
            return resultado
        })
    }
})


jest.mock("../../../../../src/data-source", ()=>{

    const mockRepository = {
        findOne: (parametros:{where:{idAlerta:number}})=>{
            let alertaEncontrado = undefined
            listaAlertaCadastrados.forEach(alerta => {
                if(alerta.idAlerta == parametros.where.idAlerta){
                    alertaEncontrado = {...alerta}
                }
            });
            return alertaEncontrado
        },
        save: (alerta:Alerta)=>{
            for (const key in alerta) {
                if(alerta[key]==null){
                    const error = {code:"23502"}
                    throw error
                }
            }
        }
    }

    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})

let req = {
    body:{
        idAlerta:1,
        nomeAlerta:"Chuva",
        condicaoAlerta:"<",
        valorMedicaoAlerta: 50
    }
}

describe("Testes de atualização de alerta", ()=>{

    test("Atualizando para um objeto já existente", async()=>{
        req.body.idAlerta = 1
        const requisicao = req as unknown as Request
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await AlertaController.atualizar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Alerta identico já existe no banco de dados")
    })

    test("Atualizando para um objeto cujo o idAlerta não está cadastrado", async()=>{
        req.body.idAlerta = 0
        const requisicao = req as unknown as Request
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await AlertaController.atualizar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("idAlerta não encontrado no banco de dados")
    })

    test("Atualizando para um objeto com sucesso", async()=>{
        req.body.idAlerta = 1
        req.body.nomeAlerta = "ALALALALALOM"
        const requisicao = req as unknown as Request
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear()
        await AlertaController.atualizar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Alerta atualizado com sucesso")
    })
})