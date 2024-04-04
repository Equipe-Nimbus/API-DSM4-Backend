import { Request } from "express";
import { FindManyOptions, Repository } from "typeorm";
import InterfaceFiltroSelecao from "./InterfaceFiltroSelecao";

export default abstract class TrataValoresFiltro<Entity> {
    
    abstract tratarContagem(req:Request):FindManyOptions<Entity>
    abstract tratarSelect(req:Request):InterfaceFiltroSelecao
}

