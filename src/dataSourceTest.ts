import { DataSource } from "typeorm";
import { config } from "dotenv";
config();

const DB_URL = process.env.DB_URL;

const PgDataSourceTest = new DataSource({
    
    //DB Local
    database: "nimbusDBTest",
    host: "localhost",
    username: "postgres",
    port: 5432,
    password: "1123",

    type: "postgres", // se for SQLite, então use sqlite
    synchronize: false,
    logging: false, // true indica que as consultas e erros serão exibidas no terminal
    entities: ["src/entities/*.ts"], // entidades que serão convertidas em tabelas
    migrations: ["src/migrations/*.ts"] // local onde estarão os arquivos de migração
});

PgDataSourceTest.initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((e) => {
        console.error("Erro na inicialização do Data Source:", e)
    });


export default PgDataSourceTest;