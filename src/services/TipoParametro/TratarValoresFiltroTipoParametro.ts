import { FindManyOptions, Like } from "typeorm";
import { TipoParametro } from "../../entities/TipoParametro";
import TrataValoresFiltro from "../TrataValoresFiltro";
import { Request } from "express";
import InterfaceFiltroSelecao from "../InterfaceFiltroSelecao";
import TrataStrings from "../TrataStrings";

class TrataValoresFiltroTipoParametro extends TrataValoresFiltro<TipoParametro>{
    
    
    tratarContagem(req: Request): FindManyOptions<TipoParametro> {
        let nomeTipoParametro = req.query.nome ?
            req.query.nome as string: "%%"
        let unidadeTipoParametro = req.query.unidade ?
            req.query.unidade as string : "%%"

        if(nomeTipoParametro != "%%")
            nomeTipoParametro = "%" + TrataStrings.tratarParaUpperSemAcento(nomeTipoParametro) + "%"
        if(unidadeTipoParametro != "%%")
            unidadeTipoParametro = "%" + TrataStrings.tratarParaUpperSemAcento(unidadeTipoParametro) + "%"

        const filtro:FindManyOptions<TipoParametro> = {
            where:{
                nomeTipoParametro: Like(`${nomeTipoParametro}`),
                unidadeTipoParametro: Like(`${unidadeTipoParametro}`),
                statusTipoParametro: true
            }
        }
        return filtro;
        
    }

    tratarSelect(req: Request): InterfaceFiltroSelecao {
        let nomeTipoParametro = req.query.nome ?
            req.query.nome as string: "%%"
        let unidadeTipoParametro = req.query.unidade ?
            req.query.unidade as string : "%%"

        if(nomeTipoParametro != "%%")
            nomeTipoParametro = "%" + TrataStrings.tratarParaUpperSemAcento(nomeTipoParametro) + "%"
        if(unidadeTipoParametro != "%%")
            unidadeTipoParametro = "%" + TrataStrings.tratarParaUpperSemAcento(unidadeTipoParametro) + "%"
        
        
        const filtro = {
            query:`tipo_parametro.nomeTipoParametro LIKE :nome AND tipo_parametro.unidadeTipoParametro LIKE :unidade`,
            valores:{
                nome:nomeTipoParametro,
                unidade:unidadeTipoParametro,
            }
        }
        return filtro;
        
    }

}

export default new TrataValoresFiltroTipoParametro()