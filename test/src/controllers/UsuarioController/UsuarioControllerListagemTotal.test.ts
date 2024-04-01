import MocksRequests from "./MocksUsuarioControllerListagemTotal"
import UsuarioController from "../../../../src/controllers/UsuarioController"
import MockResponse from "./MockResponse"
import { Usuario } from "../../../../src/entities/Usuario";
import { createQueryBuilder } from "typeorm";

let usuariosCadastrados:Usuario[] = [];
let skip:number
let take:number
jest.mock("../../../../src/data-source", ()=>{

    const mockRepository = {
        createQueryBuilder:jest.fn().mockReturnValue({
            select:jest.fn().mockReturnValue({
                orderBy:jest.fn().mockReturnValue({
                    skip:jest.fn().mockReturnValue({
                        take:jest.fn().mockReturnValue({
                            getMany:jest.fn(() => {
                                let listaUsuariosListados: Usuario[] = [];
                                let contador = 1
                                if(take==0)
                                    throw new Error();
                                usuariosCadastrados.forEach(usuario => {
                                    if (contador > skip && listaUsuariosListados.length < take)
                                        listaUsuariosListados.push(usuario)
                                    contador++
                                });
                                return listaUsuariosListados
                            })
                        })
                    })
                })
            })
        }),
        count:jest.fn().mockReturnValue(25)
    }

    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})


describe("Teste de listagem páginada de usuários", ()=>{

    beforeAll(()=>{
        for(let id = 1; id <= 25; id++){
            let usuario = new Usuario();
            usuario.idUsuario = id;
            usuariosCadastrados.push(usuario);
        }
    })

    test("Chamando a página 1 com tamanho 10", async()=>{
        skip = 0
        take = 10
        await UsuarioController.listarPaginada(MocksRequests.req1Limit10, MockResponse.resSemLocals)
        const mockRes = MockResponse.resSemLocals.status(200).send as jest.Mock;
        expect(mockRes.mock.calls[0][0].usuarios[4].idUsuario).toBe(5)
        expect(mockRes.mock.calls[0][0].usuarios.length).toBe(10)
        mockRes.mockClear()
    })

    test("Chamando a página 2 com tamanho 10", async()=>{
        skip = 10
        take = 10
        await UsuarioController.listarPaginada(MocksRequests.req2Limit10, MockResponse.resSemLocals)
        const mockRes = MockResponse.resSemLocals.status(200).send as jest.Mock;
        expect(mockRes.mock.calls[0][0].usuarios[4].idUsuario).toBe(15)
        expect(mockRes.mock.calls[0][0].usuarios.length).toBe(10)
        mockRes.mockClear();
    })
})
    test("Chamando a página 0 com tamanho 10", async()=>{
        skip = 10
        take = 0
        const mockResStatus = (MockResponse.resSemLocals.status as jest.Mock).mockClear()
        await UsuarioController.listarPaginada(MocksRequests.reqNullLimit10, MockResponse.resSemLocals)
        const mockRes = MockResponse.resSemLocals.status(400).send as jest.Mock;
        expect(mockRes.mock.calls[0][0]).toBe("Não é permitido requisitar a página 0")
        expect(mockResStatus.mock.calls[0][0]).toBe(400)
        mockRes.mockClear();
        mockResStatus.mockClear();
    })