import { Request, Response } from "express";

export default abstract class AbstratoController{

    abstract cadastrar(req:Request, res:Response):void
    abstract listarEspecifico(req:Request, res:Response):void
    abstract listarPaginada(req:Request, res:Response):void
    abstract atualizar(req:Request, res:Response):void
    abstract deletar(req:Request, res:Response):void
}