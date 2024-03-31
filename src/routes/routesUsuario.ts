import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

const routesUsuario = Router();

routesUsuario.post("/cadastrar", UsuarioController.cadastroUsuario);


export default routesUsuario;