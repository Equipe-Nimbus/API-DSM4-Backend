import { TipoParametro } from "../../entities/TipoParametro";
import { Request } from "express";

class InsereAtributosTipoParametro{

    inserir(tipoParametro: TipoParametro, req: Request){
        const novosAtributos = req.body
        for(const chave in novosAtributos){
            if(novosAtributos[chave])
                tipoParametro[chave] = novosAtributos[chave]
        }
        return tipoParametro
    }

}

export default new InsereAtributosTipoParametro()