import { Usuario } from "../../../../src/entities/Usuario";
import UsuarioController from "../../../../src/controllers/UsuarioController";
import { Request } from "express";
import MockResponse from "./MockResponse";


let listaUsuarios:Usuario[]=[]

jest.mock("../../../../src/data-source", ()=>{

    const mockRepository = {
        findOne: (idObjeto: { where: { idUsuario: number } }) => {
            let usuarioEncontrado:Usuario
            listaUsuarios.forEach(usuario => {
                if(usuario.idUsuario === idObjeto.where.idUsuario)
                    usuarioEncontrado = usuario
            });
            if(usuarioEncontrado)
                return usuarioEncontrado
            else
                return undefined
        }
    };
    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})

let req = {
    params: {
        id: null
    }
} as unknown as Request



describe("Testes listagem específica de Usuário", ()=>{

    beforeAll(()=>{
        const usuario1 = new Usuario();
        usuario1.idUsuario = 1;
        const usuario2 = new Usuario();
        usuario2.idUsuario = 2;

        listaUsuarios.push(usuario1);
        listaUsuarios.push(usuario2);
    })

    beforeEach(()=>{
        req.params.id = null
    })

    test("Listagem especifica de um usuário existente", async()=>{
        req.params.id = "2"
        await UsuarioController.listarEspecifico(req, MockResponse.resSemLocals);
        const mockRes = MockResponse.resSemLocals.status(200).send as jest.Mock;
        if(mockRes.mock.calls[0][0] == undefined)
            fail("Usuário deveria ser encontrado, mas não foi")
        else
            expect(mockRes.mock.calls[0][0]).toBe(listaUsuarios[1]);
        mockRes.mockClear();
        
    })

    test("Listagem especifica de um usuário não existente", async()=>{
        req.params.id = "0"
        const mockResStatus = MockResponse.resSemLocals.status as jest.Mock;
        mockResStatus.mockClear()
        await UsuarioController.listarEspecifico(req, MockResponse.resSemLocals);
        const mockResSend = MockResponse.resSemLocals.status(400).send as jest.Mock;
        if(mockResSend.mock.calls[0][0] == "Usuário não encontrado"){
            expect(mockResStatus.mock.calls[0][0]).toBe(400)
        }
        else
            fail("Usuário não deveria ser encontrado, mas foi")
        mockResSend.mockClear();
        mockResStatus.mockClear();
    })

})