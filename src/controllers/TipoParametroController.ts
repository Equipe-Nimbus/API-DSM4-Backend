import PgDataSource from "../data-source";
import { TipoParametro } from "../entities/TipoParametro";
import InsereAtributoTipoParametro from "../services/TipoParametro/InsereAtributoTipoParametro";
import ConfereIgualdadeTipoParametro from "../services/TipoParametro/ConfereIgualdadeTipoParametro";
import { Request, Response } from "express";

class TipoParametroController {
    
    

    async cadastrar(req: Request, res: Response){
        const repositorioTipoParametro = PgDataSource.getRepository(TipoParametro)
        let novoTipoParametro = new TipoParametro()
        novoTipoParametro = InsereAtributoTipoParametro.inserir(novoTipoParametro, req)
        const resultado = await ConfereIgualdadeTipoParametro.conferir(novoTipoParametro)
        if(resultado == false && novoTipoParametro.unidadeTipoParametro && novoTipoParametro.nomeTipoParametro){
            res.status(400).send("TipoParametro identico já cadastrada")
            return;
        }
        try{
            await repositorioTipoParametro.save(novoTipoParametro);
            res.status(200).send("Tipo parametro cadastrado com sucesso")
        } catch(error){
            if(error.code == "23502")
                res.status(400).send("nomeTipoParametro e unidadeTipoParametro não podem ser nulo");
            else if(error.code == "23505")
                res.status(400).send("unidadeTipoParametro já cadastrada");
            else
                throw error
        }
    }

}
export default new TipoParametroController()