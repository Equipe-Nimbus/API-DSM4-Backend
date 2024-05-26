import express, {Request, Response} from "express";
import cors from "cors";
import { config } from 'dotenv';
import routesUsuario from "./routes/routesUsuario";
import routesEstacao from "./routes/routesEstacao";
import routesTipoParametro from "./routes/routesTipoParametro";
import routesAlerta from "./routes/routesAlerta";
import routesDashboard from "./routes/routesDashboard";
<<<<<<< HEAD
import routesRelatorios from "./routes/routesRelatorios";
import routesOcorrenciaAlerta from "./routes/routesOcorrenciaAlerta";
=======
>>>>>>> main


config();
const app = express();
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200 
};

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