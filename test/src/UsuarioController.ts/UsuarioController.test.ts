import UsuarioController from "../../../src/controllers/UsuarioController";
import { Usuario } from "../../../src/entities/Usuario";
import MocksCadastro from "./MocksUsuarioControllerCadastro";


let listaUsuarios:Usuario[]=[]

jest.mock("../../../src/data-source", ()=>{

    const mockRepository = {
        save: (usuario: Usuario) => {
            const listaAtributos = ["nomeUsuario", "emailUsuario", "senhaUsuario", "perfilUsuario", "dataNascimentoUsuario", "cpfUsuario", "cidadeUsuario", "bairroUsuario", "ruaAvenidaUsuario", "numeroCasaUsuario", "cepUsuario"]
            listaUsuarios.forEach(usuarioCadastrado => {
                for (const chave in usuarioCadastrado) {
                    if((chave == "emailUsuario" || chave == "cpfUsuario") && usuarioCadastrado[chave] === usuario[chave]){
                        throw new Error("duplicate key value")
                    }
                }
            });
            listaAtributos.forEach(chave => {
                if(usuario[chave] == null || usuario[chave] == "")
                    throw new Error("null value in column")
            });
            listaUsuarios.push(usuario);
        }
    };
    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})


describe("Testes do UsuarioController", ()=>{


    beforeEach(() => {
        listaUsuarios = []
    });

    test("Cadastrando dois usuários iguais", async ()=>{
        try{
            await UsuarioController.cadastroUsuario(MocksCadastro.req1, MocksCadastro.res)
            await UsuarioController.cadastroUsuario(MocksCadastro.req1, MocksCadastro.res)
            expect("não permitir cadastro de dois usuarios iguais")
        } catch(error){
            const mockStatus = MocksCadastro.res.status(400).send as jest.Mock
            expect(mockStatus.mock.calls[0][0]).toBe("email ou cpf já cadastrado")
            mockStatus.mockClear();
            
        }
    })

    test("Cadastrando dois usuários diferentes", async ()=>{
        try{
            await UsuarioController.cadastroUsuario(MocksCadastro.req1, MocksCadastro.res)
            await UsuarioController.cadastroUsuario(MocksCadastro.reqDiferenteAo1, MocksCadastro.res)
        } catch(error){
            expect("Usuarios diferentes deveriam ser cadastrados sem erro").toBe("Houve erro")
        }
    })

    test("Cadastrando usuários com cpfs identicos", async ()=>{
        try{
            await UsuarioController.cadastroUsuario(MocksCadastro.req1, MocksCadastro.res)
            await UsuarioController.cadastroUsuario(MocksCadastro.reqComCPFIgualAo1, MocksCadastro.res)
            expect("não permitir cadastro de usuarios com cpfs iguais").toBe("Foi permitido")
        } catch(error){
            const mockStatus = MocksCadastro.res.status(400).send as jest.Mock
            expect(mockStatus.mock.calls[0][0]).toBe("email ou cpf já cadastrado")
            mockStatus.mockClear();
        }
    })

    test("Cadastrando usuários com emails identicos", async ()=>{
        try{
            await UsuarioController.cadastroUsuario(MocksCadastro.req1, MocksCadastro.res)
            await UsuarioController.cadastroUsuario(MocksCadastro.reqComEmailIgualAo1, MocksCadastro.res)
            expect("não permitir cadastro de usuarios com emails iguais")
        } catch(error){
            const mockStatus = MocksCadastro.res.status(400).send as jest.Mock
            expect(mockStatus.mock.calls[0][0]).toBe("email ou cpf já cadastrado")
            mockStatus.mockClear();
        }
    })

    test("Cadastrando usuário com valor nulo", async ()=>{
        try{
            await UsuarioController.cadastroUsuario(MocksCadastro.reqComvalorNulo, MocksCadastro.res)
            expect("Não pode ser permitido o cadastro de usuário com campos nulos").toBe("Foi permitido")
        } catch(error){
            const mockStatus = MocksCadastro.res.status(400).send as jest.Mock
            expect(mockStatus.mock.calls[0][0]).toBe("nenhum valor pode ser nulo")
            mockStatus.mockClear();
        }
    })

    
})