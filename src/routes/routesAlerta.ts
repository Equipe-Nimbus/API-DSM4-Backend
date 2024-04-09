import { Router } from "express";
import AlertaController from "../controllers/AlertaController";

const routesAlerta = Router();

routesAlerta.post("/cadastrar", AlertaController.cadastrar);
routesAlerta.delete("/deletar/:idAlerta", AlertaController.deletar);


export default routesAlerta;