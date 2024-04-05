import express, {Request, Response} from "express";
import cors from "cors";
import { config } from 'dotenv';
import routesUsuario from "./routes/routesUsuario";
import routesEstacao from "./routes/routesEstacao";

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



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});