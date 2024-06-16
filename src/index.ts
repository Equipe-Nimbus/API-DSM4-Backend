import express, {Request, Response} from "express";
import cors from "cors";
import { config } from 'dotenv';
import routesUsuario from "./routes/routesUsuario";
import routesEstacao from "./routes/routesEstacao";
import routesTipoParametro from "./routes/routesTipoParametro";
import routesAlerta from "./routes/routesAlerta";
import routesDashboard from "./routes/routesDashboard";
import routesRelatorios from "./routes/routesRelatorios";
import routesOcorrenciaAlerta from "./routes/routesOcorrenciaAlerta";
import PgDataSource from "./data-source";
import { Usuario } from "./entities/Usuario";
import salvaUsuario from "../test/integration/src/salvarUsuario";


config();
const app = express();
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200 
};

async function CriaUsuarioTesteIntegracao() {
  
}

(async () => {
  if(process.env.NODE_ENV === "test"){
    const repositorioUsuario = PgDataSource.getRepository(Usuario);
  
    const usuarioRecuperado = await repositorioUsuario.findOne({where:{emailUsuario: "testeintegracao@teste.com"}});
  
    if(!usuarioRecuperado) {
        await salvaUsuario();
    }
  }
})();


app.use(cors(corsOptions));

app.use("/usuario", routesUsuario);
app.use("/estacao", routesEstacao)
app.use("/tipoParametro", routesTipoParametro);
app.use("/alerta", routesAlerta);
app.use("/dashboard", routesDashboard);
app.use("/relatorio", routesRelatorios);
app.use("/ocorrenciaAlerta", routesOcorrenciaAlerta);



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };