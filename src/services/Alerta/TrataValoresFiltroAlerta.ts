import { Request, query } from "express";
import { FindManyOptions, Like } from "typeorm";
import { Alerta } from "../../entities/Alerta";
import InterfaceFiltroSelecao from "../InterfaceFiltroSelecao";
import TrataValoresFiltro from "../TrataValoresFiltro";


class TrataValoresFiltroAlerta extends TrataValoresFiltro<Alerta> {
    
    
    tratarContagem(req: Request): FindManyOptions<Alerta> {
        const nomeAlerta = req.query.nome ?
            "%" + req.query.nome + "%" : "%%"
        
        const filtro:FindManyOptions<Alerta> ={where:{nomeAlerta: Like(`${nomeAlerta}`), statusAlerta:true}}
        return filtro
    
    }
    
    tratarSelect(req: Request): InterfaceFiltroSelecao {
        const nomeAlerta = req.query.nome ?
            "%" + req.query.nome + "%" : "%%"

        const filtro ={
            query:`alerta.nomeAlerta LIKE :nome`,
            valores:{nome:nomeAlerta}
        }

        return filtro
    }
    
}

export default new TrataValoresFiltroAlerta()