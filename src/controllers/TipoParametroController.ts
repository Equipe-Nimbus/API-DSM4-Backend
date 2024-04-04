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
            else
                throw error
        }
    }

    async deletar(req: Request, res: Response) {
        const repositorioTipoParametro = PgDataSource.getRepository(TipoParametro);
        const id = parseInt(req.params.id);
        let tipoParametro = await repositorioTipoParametro.findOne({where:{idTipoParametro:id}});
        if(tipoParametro == undefined){
            res.status(400).send("Tipo Parametro não pode ser deletado pois não existe")
            return;
        }
        tipoParametro.statusTipoParametro = false;
        await repositorioTipoParametro.save(tipoParametro);
        res.status(200).send("Tipo Parametro deletado com sucesso")
    }

}
export default new TipoParametroController()