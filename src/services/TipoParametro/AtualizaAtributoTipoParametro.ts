import { TipoParametro } from "../../entities/TipoParametro";
import { Request } from "express";

class AtulizaAtributoTipoParametro{
    
    atualizar(tipoParametro:TipoParametro, req:Request){
        const alteracoes = req.body;
        if(alteracoes.nomeTipoParametro == null || alteracoes.nomeTipoParametro == "")
            return tipoParametro
        tipoParametro.nomeTipoParametro = alteracoes.nomeTipoParametro
        return tipoParametro
    }
}

export default new AtulizaAtributoTipoParametro()