import UsuarioController from "../../../../src/controllers/UsuarioController";
import { Usuario } from "../../../../src/entities/Usuario";
import MocksCadastro from "./MocksUsuarioControllerCadastro";
import MockResponse from "./MockResponse";


let listaUsuarios:Usuario[]=[]

jest.mock("../../../../src/data-source", ()=>{

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


describe("Testes do UsuarioController CADASTRO", ()=>{


    beforeEach(() => {
        listaUsuarios = []
    });

    test("Cadastrando dois usuários iguais", async ()=>{
        try{
            await UsuarioController.cadastrar(MocksCadastro.req1, MockResponse.resSemLocals)
            await UsuarioController.cadastrar(MocksCadastro.req1, MockResponse.resSemLocals)
            expect("não permitir cadastro de dois usuarios iguais")
        } catch(error){
            const mockStatus = MockResponse.resSemLocals.status(400).send as jest.Mock
            expect(mockStatus.mock.calls[0][0]).toBe("email ou cpf já cadastrado")
            mockStatus.mockClear();
            
        }
    })

    test("Cadastrando dois usuários diferentes", async ()=>{
        try{
            await UsuarioController.cadastrar(MocksCadastro.req1, MockResponse.resSemLocals)
            await UsuarioController.cadastrar(MocksCadastro.reqDiferenteAo1, MockResponse.resSemLocals)
        } catch(error){
            expect("Usuarios diferentes deveriam ser cadastrados sem erro").toBe("Houve erro")
        }
    })

    test("Cadastrando usuários com cpfs identicos", async ()=>{
        try{
            await UsuarioController.cadastrar(MocksCadastro.req1, MockResponse.resSemLocals)
            await UsuarioController.cadastrar(MocksCadastro.reqComCPFIgualAo1, MockResponse.resSemLocals)
            expect("não permitir cadastro de usuarios com cpfs iguais").toBe("Foi permitido")
        } catch(error){
            const mockStatus = MockResponse.resSemLocals.status(400).send as jest.Mock
            expect(mockStatus.mock.calls[0][0]).toBe("email ou cpf já cadastrado")
            mockStatus.mockClear();
        }
    })

    test("Cadastrando usuários com emails identicos", async ()=>{
        try{
            await UsuarioController.cadastrar(MocksCadastro.req1, MockResponse.resSemLocals)
            await UsuarioController.cadastrar(MocksCadastro.reqComEmailIgualAo1, MockResponse.resSemLocals)
            expect("não permitir cadastro de usuarios com emails iguais")
        } catch(error){
            const mockStatus = MockResponse.resSemLocals.status(400).send as jest.Mock
            expect(mockStatus.mock.calls[0][0]).toBe("email ou cpf já cadastrado")
            mockStatus.mockClear();
        }
    })

    test("Cadastrando usuário com valor nulo", async ()=>{
        try{
            await UsuarioController.cadastrar(MocksCadastro.reqComvalorNulo, MockResponse.resSemLocals)
            expect("Não pode ser permitido o cadastro de usuário com campos nulos").toBe("Foi permitido")
        } catch(error){
            const mockStatus = MockResponse.resSemLocals.status(400).send as jest.Mock
            expect(mockStatus.mock.calls[0][0]).toBe("nenhum valor pode ser nulo")
            mockStatus.mockClear();
        }
    })

    
})