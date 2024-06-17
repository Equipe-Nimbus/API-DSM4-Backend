import { DataSource, Migration } from "typeorm";
import { config } from "dotenv";
import salvaUsuario from "../test/integration/src/salvarUsuario";
import { Usuario } from "./entities/Usuario";
config();

let DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (process.env.NODE_ENV === "test") {
    DB_NAME = process.env.DB_NAME_TEST;
}
const PgDataSource = new DataSource({

    //DB online elephantSQL
    //database: 'bqlvykqu',
    //url:DB_URL,

    //DB Local
    database: DB_NAME,
    host: "db",
    username: "postgres",
    port: 5432,
    password: DB_PASSWORD,

    type: "postgres",
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"]
});

PgDataSource.initialize()
    .then(async () => {
        console.log("Data Source inicializado!");

        const repositorioUsuario = PgDataSource.getRepository(Usuario);
  
        const usuarioRecuperado = await repositorioUsuario.findOne({where:{emailUsuario: "testeintegracao@teste.com"}});
        
        if(!usuarioRecuperado) {
            await salvaUsuario();
        }

        console.log("USUARIO ANTES DO SALVAMENTO: ", usuarioRecuperado, "COMPARACAO: ", !usuarioRecuperado)

        const usuarioRecuperadoDepois = await repositorioUsuario.findOne({where:{emailUsuario: "testeintegracao@teste.com"}});

        console.log("USUARIO DEPOIS DO SALVAMENTO: ", usuarioRecuperadoDepois, "COMPARACAO: ", !usuarioRecuperadoDepois)

    })
    .catch((e) => {
        console.log("DB_PASSWORD", DB_PASSWORD, "DB_NAME", DB_NAME)
        console.error("Erro na inicialização do Data Source:", e)
    });

export default PgDataSource;