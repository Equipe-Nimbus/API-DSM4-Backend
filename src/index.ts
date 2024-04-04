import express, {Request, Response} from "express";
import cors from "cors";
import { config } from 'dotenv';
import routesUsuario from "./routes/routesUsuario";
import routesTipoParametro from "./routes/routesTipoParametro";

config();
const app = express();
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use("/usuario", routesUsuario);
app.use("/tipoParametro", routesTipoParametro);



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});