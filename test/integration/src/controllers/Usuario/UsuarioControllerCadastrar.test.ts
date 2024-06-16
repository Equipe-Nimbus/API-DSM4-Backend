import { app } from "../../../../../src";
import { Usuario } from "../../../../../src/entities/Usuario";
import request from "supertest";
import salvarUsuario from "../../salvarUsuario";
import PgDataSource from "../../../../../src/data-source";



describe("Teste de integração do cadastro de usuário", () => {
    
    let token = new String();

    beforeAll(async () => {
        await PgDataSource.initialize();
        
        await salvarUsuario();

        const responseWithToken = await request(app).post("/usuario/login").send({
            "email": "testeintegracao@teste.com",
            "senha": "senha123"
        });
        
        token = responseWithToken.body.token;
    });

    afterAll(async() => {
        await PgDataSource.createQueryBuilder().delete().from(Usuario).execute();
        await PgDataSource.destroy();

    });

    test("Teste cadastra usuario com sucesso", async() => {
        const repositorioUsuario = await PgDataSource.getRepository(Usuario);

        const novoUsuario = {
            nomeUsuario: "teste",
            emailUsuario: "teste@teste.com",
            senhaUsuario: "senha123",
            perfilUsuario: "admin",
            dataNascimentoUsuario: "1990-01-01",
            cpfUsuario: "123.456.789-12",
            cidadeUsuario: "São Paulo",
            bairroUsuario: "Centro",
            ruaAvenidaUsuario: "Avenida Paulista",
            estadoUsuario: "SP",
            numeroCasaUsuario: "1234",
            cepUsuario: "01000-000"
        };

        const response = await request(app).post("/usuario/cadastrar")
            .set("Authorization", `Bearer ${token}`)
            .send(novoUsuario);

        const usuarioRecuperado = await repositorioUsuario.findOne({where:{emailUsuario: "teste@teste.com"}});

        expect(usuarioRecuperado).toBeDefined();
        expect(response.status).toBe(200);
        
    })
});