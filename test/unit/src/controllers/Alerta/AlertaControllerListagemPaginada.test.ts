import { query, Request } from "express";
import AlertaController from "../../../../../src/controllers/AlertaController";
import { Alerta } from "../../../../../src/entities/Alerta";
import { Parametro } from "../../../../../src/entities/Parametro";
import MockResponse from "../MockResponse";
import MocksListagem from "../UsuarioController/MocksUsuarioControllerListagemTotal";

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

let skip:number
let take:number

jest.mock("../../../../../src/data-source", ()=>{
    const mockRepository = {
        findOne: (parametros:{where:{
            nomeAlerta:string,
            condicaoAlerta:string,
            parametro:Parametro,
            statusAlerta:true,
            valorMedicaoAlerta: number
        }})=>{
            let alertaEncontrado = undefined
            listaAlertaCadastrados.forEach(alerta => {
                if(
                    alerta.nomeAlerta == parametros.where.nomeAlerta &&
                    alerta.condicaoAlerta == parametros.where.condicaoAlerta &&
                    alerta.parametro == parametros.where.parametro &&
                    alerta.statusAlerta == parametros.where.statusAlerta &&
                    alerta.valorMedicaoAlerta == parametros.where.valorMedicaoAlerta
                ){
                    alertaEncontrado = alerta
                }
            });
            return alertaEncontrado
        },
        createQueryBuilder:jest.fn().mockReturnValue({
            leftJoinAndSelect:jest.fn().mockReturnValue({
                leftJoinAndSelect:jest.fn().mockReturnValue({
                    leftJoinAndSelect:jest.fn().mockReturnValue({
                        where:jest.fn().mockReturnValue({
                            andWhere:jest.fn().mockReturnValue({
                                orderBy:jest.fn().mockReturnValue({
                                    skip:jest.fn().mockReturnValue({
                                        take:jest.fn().mockReturnValue({
                                            getMany:jest.fn(() => {
                                                let listaAlertasListados: InterfaceAlertasMockado[] = [];
                                                let contador = 1
                                                if(take==0)
                                                    throw new Error();
                                                listaAlertaCadastrados.forEach(alerta => {
                                                    if (contador > skip && listaAlertasListados.length < take)
                                                        listaAlertasListados.push(alerta)
                                                    contador++
                                                });
                                                return listaAlertasListados
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }),
        count:jest.fn().mockReturnValue(2)
    }
    const mockGetRepository = jest.fn(() => mockRepository);
        return {
            getRepository: mockGetRepository,
        };
    }
)

let req = {
    query:{
        pagina:"1",
        tamanhoPagina:10
    }
}

describe("Testes de listagem paginada de alertas", ()=>{

    test("teste de listagem de alerta bem sucedido", async()=>{
        skip = 1
        take=1
        const requisicao = req as unknown as Request
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear()
        await AlertaController.listarPaginada(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0].alertas.length).toBe(1)
        expect(mockRes.mock.calls[0][0].alertas[0]).toBe(listaAlertaCadastrados[1])
    })

    test("teste de listagem de alerta pagina 0", async()=>{
        skip = 1
        take=0
        req.query.pagina = "0"
        const requisicao = req as unknown as Request
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await AlertaController.listarPaginada(requisicao, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Não é permitido requisitar a página 0")
    })

})