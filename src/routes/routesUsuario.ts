import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

const routesUsuario = Router();

routesUsuario.post("/cadastrar", UsuarioController.cadastrar);
routesUsuario.get("/listarEspecifico/:id", UsuarioController.listarEspecifico)
routesUsuario.get("/listarGeral/paginada", UsuarioController.listarPaginada)
routesUsuario.delete("/deletar/:id", UsuarioController.deletar)


export default routesUsuario;