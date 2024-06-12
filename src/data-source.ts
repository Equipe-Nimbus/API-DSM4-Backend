import { DataSource } from "typeorm";
import { config } from "dotenv";
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
    // database: 'bqlvykqu',
    // url:DB_URL,

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
    .then(() => {
        
        console.log("Data Source inicializado!")
    })
    .catch((e) => {
        console.log("DB_PASSWORD", DB_PASSWORD, "DB_NAME", DB_NAME)
        console.error("Erro na inicialização do Data Source:", e)
    });

export default PgDataSource;