import { DataSource, Migration } from "typeorm";
import { config } from "dotenv";
import salvaUsuario from "../test/integration/src/salvarUsuario";
import { Usuario } from "./entities/Usuario";
config();

if (process.env.NODE_ENV === "test") {
    DB_NAME = process.env.DB_NAME_TEST;
}
const PgDataSourceMigration = new DataSource({
    //DB online elephantSQL

    //DB Local
    database: "nimbusDB",
    host: "db",
    username: "postgres",
    port: 5432,
    password: "postgres",


    type: "postgres", // se for SQLite, então use sqlite
    synchronize: true,
    logging: false, // true indica que as consultas e erros serão exibidas no terminal
    entities: ["src/entities/*.ts"], // entidades que serão convertidas em tabelas
    migrations: ["src/migrations/*.ts"] // local onde estarão os arquivos de migração
});

PgDataSourceMigration.initialize()
    .then(async () => {
        console.log("Data Source inicializado!");

    })
    .catch((e) => {
        console.log("DB_PASSWORD", DB_PASSWORD, "DB_NAME", DB_NAME)
        console.error("Erro na inicialização do Data Source:", e)
    });

export default PgDataSourceMigration;