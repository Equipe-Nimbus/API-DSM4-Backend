import { TipoParametro } from "../../entities/TipoParametro";
import { Request } from "express";
import TrataStrings from "../TrataStrings";


class InsereAtributosTipoParametro{

    inserir(tipoParametro: TipoParametro, req: Request){
        const novosAtributos = req.body
        for(const chave in novosAtributos){
            if(novosAtributos[chave])
                if(typeof novosAtributos[chave] === "string")
                    tipoParametro[chave] = TrataStrings.tratarParaUpperSemAcento(novosAtributos[chave])
                else{
                    tipoParametro[chave] = novosAtributos[chave]
                }
        }
        return tipoParametro
    }

}

export default new InsereAtributosTipoParametro()