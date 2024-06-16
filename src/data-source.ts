import { DataSource, Migration } from "typeorm";
import { config } from "dotenv";
import salvaUsuario from "../test/integration/src/salvarUsuario";
import { Usuario } from "./entities/Usuario";
config();

const DB_URL = process.env.DB_URL;
const DB_PASSWORD = process.env.DB_PASSWORD; 
const DB_HOST = process.env.DB_HOST; 
let DB_NAME = process.env.DB_NAME;

if (process.env.NODE_ENV === "test") {
    DB_NAME = process.env.DB_NAME_TEST;
}
const PgDataSource = new DataSource({
    //DB online elephantSQL
    /* database: 'bqlvykqu',
    url:DB_URL, */

    //DB Local
    database: DB_NAME,
    host: DB_HOST,
    username: "postgres",
    port: 5432,
    password: DB_PASSWORD,

    type: "postgres", // se for SQLite, então use sqlite
    synchronize: true,
    logging: false, // true indica que as consultas e erros serão exibidas no terminal
    entities: ["src/entities/*.ts"], // entidades que serão convertidas em tabelas
    migrations: ["src/migrations/*.ts"] // local onde estarão os arquivos de migração
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