import { Repository } from "typeorm/repository/Repository";
import { Alerta } from "../../entities/Alerta";

class ConfereExistenciaAlertaIndentico {
    
    async confere(repositorio:Repository<Alerta>, alerta:Alerta){
        const resultado = await repositorio.findOne({where:{
            nomeAlerta:alerta.nomeAlerta,
            condicaoAlerta:alerta.condicaoAlerta,
            parametro:alerta.parametro,
            statusAlerta:true,
            valorMedicaoAlerta: alerta.valorMedicaoAlerta
        }})
        if(resultado == undefined)
            return false
        return true
    }

}

export default new ConfereExistenciaAlertaIndentico()