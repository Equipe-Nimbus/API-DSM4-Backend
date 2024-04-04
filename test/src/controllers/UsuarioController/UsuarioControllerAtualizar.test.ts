import { QueryFailedError } from "typeorm"
import UsuarioController from "../../../../src/controllers/UsuarioController"
import { Usuario } from "../../../../src/entities/Usuario"
import MockResponse from "../MockResponse"
import MockAtualizar from "./MockUsuarioControllerAtualizar"
 
let usuario:Usuario
let mockAtualizar:MockAtualizar
let usuariosCadastrados:Usuario[]=[]

jest.mock("../../../../src/data-source",()=>{
    const mockRepository = {
        save: (usuarioAtualizado: Usuario) => {
            usuariosCadastrados.forEach(usuarioCadastrado => {
                if(usuarioCadastrado.emailUsuario != usuarioAtualizado.emailUsuario)
                    usuario = usuarioAtualizado
                else{
                    const error = {
                        code:"23505"
                    }
                    throw error
                }
            });
        },
        findOne: (parametros:{where:{idUsuario:number}})=>{
            if(parametros.where.idUsuario == 0)
                return usuario
            else
                return undefined
        }
    };
    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})

describe("Teste Atualização de Usuário",()=>{

    beforeAll(()=>{
        for(let id = 1; id <= 25; id++){
            let usuarioCadastrado = new Usuario();
            usuarioCadastrado.idUsuario = id;
            usuarioCadastrado.emailUsuario = id.toString();
            usuariosCadastrados.push(usuarioCadastrado);
        }
    })

    beforeEach(()=>{
        mockAtualizar = new MockAtualizar()
        usuario = mockAtualizar.usuario
        mockAtualizar = new MockAtualizar()
    })

    test("Atualizar completamente usuário existente", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear();
        await UsuarioController.atualizar(mockAtualizar.reqAlteracaoCompleta, MockResponse.resSemLocals)
        expect(usuario.perfilUsuario).toBe(mockAtualizar.usuario.perfilUsuario)
        expect(usuario.nomeUsuario == mockAtualizar.usuario.nomeUsuario).toBe(false)
        expect(usuario.cidadeUsuario == mockAtualizar.usuario.cidadeUsuario).toBe(false)
        expect(usuario.idUsuario).toBe(mockAtualizar.usuario.idUsuario)
        expect(mockRes.mock.calls[0][0]).toBe("Usuário atualizado com sucesso")
        mockRes.mockClear()
    })

    test("Atualizar usuário existente com valores iguais", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear();
        await UsuarioController.atualizar(mockAtualizar.reqAlteracaoSemAlteracao, MockResponse.resSemLocals)
        expect(usuario).toEqual(mockAtualizar.usuario)
        expect(mockRes.mock.calls[0][0]).toBe("Usuário atualizado com sucesso")
        mockRes.mockClear()
    })

    test("Atualizar usuário não existente", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear();
        await UsuarioController.atualizar(mockAtualizar.reqAlteracaoUsuarioInexistente, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("Id do usuário não encontrado")
        mockRes.mockClear()
    })

    test("Atualizar email repetido", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear();
        await UsuarioController.atualizar(mockAtualizar.reqEmailRepetido, MockResponse.resSemLocals)
        expect(mockRes.mock.calls[0][0]).toBe("email ou cpf já cadastrado")
        mockRes.mockClear()
    })
})