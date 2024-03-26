import express, {Request, Response} from "express";
import cors from "cors";
import { config } from 'dotenv';

config();
const app = express();


const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200 // Algumas versões do navegador Chrome não aceitam '*' no Access-Control-Allow-Origin
};

app.use(cors(corsOptions));


app.get('/', (req, res) => {
  res.json({ mensagem: 'Dados da API' });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});