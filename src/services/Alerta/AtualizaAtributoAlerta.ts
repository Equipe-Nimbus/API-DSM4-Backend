import { Request } from "express";
import { Alerta } from "../../entities/Alerta";


class AtualizaAtributoAlerta{

    async atualizar(alerta:Alerta, req:Request){
        if(req.body.condicaoAlerta != "" && req.body.condicaoAlerta != null)
            alerta.condicaoAlerta = req.body.condicaoAlerta
        if(req.body.valorMedicaoAlerta != "" && req.body.valorMedicaoAlerta != null)
            alerta.valorMedicaoAlerta = parseFloat(req.body.valorMedicaoAlerta)
        if(req.body.nomeAlerta != "" && req.body.nomeAlerta != null)
            alerta.nomeAlerta = req.body.nomeAlerta

        return alerta

    }

}

export default new AtualizaAtributoAlerta()