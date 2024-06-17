import AlertaController from "../../../../../src/controllers/AlertaController";
import { Alerta } from "../../../../../src/entities/Alerta";
import MockResponse from "../MockResponse";
import { Request } from "express";

const listaParametrosCadastrados = [
    {
        idParametro:1,
        idEstacao:1,
        idTipoParametro:2
    },
    {
        idParametro:2,
        idEstacao:1,
        idTipoParametro:1
    }
]

let mockConfereIgual = false

jest.mock("../../../../../src/services/Alerta/ConfereExistenciaAlertaIdentico", ()=>{
    return {
        confere:jest.fn(()=>mockConfereIgual)
    }
})
    

jest.mock("../../../../../src/data-source", ()=>{

    const mockRepository = {
        findOne: (parametros:{where:{estacoes:{idEstacao:number}, tiposParametro:{idTipoParametro:number}}})=>{
            let parametroEncontrado = undefined
            listaParametrosCadastrados.forEach(parametro => {
                if(parametro.idEstacao == parametros.where.estacoes.idEstacao && parametro.idTipoParametro == parametros.where.tiposParametro.idTipoParametro){
                    parametroEncontrado = parametro
                }
            });
            return parametroEncontrado
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

const req = {
    body:{
        idEstacao:0,
        idTipoParametro:0,
        nomeAlerta:"Chuva Alerta Jacareí",
        condicaoAlerta:">",
        valorMedicaoAlerta: 50
    }
}

describe("Testes de cadastro de alerta", ()=>{

    test("Cadastro de alerta falho, por ids de Estação e TipoParametro incorretos", async ()=>{
        req.body.idEstacao = 0
        req.body.idTipoParametro = 0
        const requisicao = req as Request
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await AlertaController.cadastrar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Não foi encontrada a relação entre essa estação e o tipoParametro")
    })

    test("Cadastro de alerta com sucesso", async ()=>{
        req.body.idEstacao = 1
        req.body.idTipoParametro = 1
        const requisicao = req as Request
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear()
        await AlertaController.cadastrar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Alerta cadastrado com sucesso")
    })

    test("Cadastro com valores nulos", async ()=>{
        req.body.nomeAlerta = null
        const requisicao = req as Request
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await AlertaController.cadastrar(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Nenhum valor pode ser nulo")
    })
})