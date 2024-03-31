import { Request } from "express";
import { Usuario } from "../../../../src/entities/Usuario";
import UsuarioController from "../../../../src/controllers/UsuarioController";
import MockResponse from "./MockResponse";

let req = {
    params: {
        id: null
    }
} as unknown as Request

let usuariosCadastrados:Usuario[]=[]

jest.mock("../../../../src/data-source", ()=>{

    const mockRepository = {
        delete: (id)=>{
            if(id > usuariosCadastrados.length)
                throw new Error()
            usuariosCadastrados.forEach(usuario => {
                if(usuario.idUsuario == id)
                    usuariosCadastrados = usuariosCadastrados.filter(item => item !== usuario);
            });

        }
    };
    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})

describe("Testes Deleção de usuário", ()=>{

    beforeAll(()=>{
        for(let id = 1; id <= 25; id++){
            let usuario = new Usuario();
            usuario.idUsuario = id;
            usuariosCadastrados.push(usuario);
        }
    })

    beforeEach(()=>{
        req.params.id = null;
    })

    test("Usuario existente deletado", async ()=>{
        req.params.id = "1";
        await UsuarioController.deletar(req, MockResponse.resSemLocals);
        const mockSend = MockResponse.resSemLocals.status(200).send as jest.Mock;
        expect(mockSend.mock.calls[0][0]).toBe("Usuário deletado com sucesso")
        expect(usuariosCadastrados.length).toBe(24)
        mockSend.mockClear()
    })

    test("Tentativa de deletar usuário não existente", async ()=>{
        req.params.id = "100";
        await UsuarioController.deletar(req, MockResponse.resSemLocals);
        const mockSend = MockResponse.resSemLocals.status(400).send as jest.Mock;
        expect(mockSend.mock.calls[0][0]).toBe("Usuário não encontrado")
        expect(usuariosCadastrados.length).toBe(24)
        mockSend.mockClear()
    })

})