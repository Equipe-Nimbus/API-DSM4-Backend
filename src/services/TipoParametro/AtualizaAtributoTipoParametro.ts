import { TipoParametro } from "../../entities/TipoParametro";
import { Request } from "express";
import TrataStrings from "../TrataStrings";

class AtulizaAtributoTipoParametro{
    
    atualizar(tipoParametro:TipoParametro, req:Request){
        const alteracoes = req.body;
        if(alteracoes.nomeTipoParametro == null || alteracoes.nomeTipoParametro == "")
            return tipoParametro
        tipoParametro.nomeTipoParametro = TrataStrings.tratarParaUpperSemAcento(alteracoes.nomeTipoParametro)
        return tipoParametro
    }
}

export default new AtulizaAtributoTipoParametro()