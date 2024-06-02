import { app } from "../../../../../src";
import PgDataSourceTest from "../../../../../src/dataSourceTest";
import { Usuario } from "../../../../../src/entities/Usuario";
import request from "supertest";
import salvarUsuario from "../../salvarUsuario";


describe("Teste de integração do cadastro de usuário", () => {


    beforeAll(async () => {
        await PgDataSourceTest.initialize();
        await PgDataSourceTest.runMigrations();
        
        await salvarUsuario();

        const responseWithToken = await request(app).post("/usuario/login").send({
            email: "testeintegracao@teste.com",
            senha: "senha123"
        });
        console.log(responseWithToken.body.token);
    });

    afterAll(async () => {
        await PgDataSourceTest.dropDatabase();
        await PgDataSourceTest.destroy();
    });

    test("Teste cadastra usuario com sucesso", async() => {
        const repositorioUsuario = await PgDataSourceTest.getRepository(Usuario);

        const objectLogin = {
            email: "testeintegracao@teste.com",
            senha: "senha123"
        }

        /* const responseWithToken = await request(app).post("/usuario/login").send({objectLogin})
        const token = responseWithToken.body.token;

        const novoUsuario = {
            nomeUsuario: "João da Silva",
            emailUsuario: "testecadastro@teste.com",
            senhaUsuario: "senha123",
            perfilUsuario: "admin",
            dataNascimentoUsuario: "1990-01-01",
            cpfUsuario: "245.456.789-00",
            cidadeUsuario: "São Paulo",
            bairroUsuario: "Centro",
            ruaAvenidaUsuario: "Avenida Paulista",
            estadoUsuario: "SP",
            numeroCasaUsuario: "1234",
            cepUsuario: "01000-000"
        }; */

        /* const response = await request(app).post("/usuario/cadastrar")
            .set("Authorization", `Bearer ${token}`)
            .send({novoUsuario});

        expect(response.status).toBe(200); */
        
    })
});