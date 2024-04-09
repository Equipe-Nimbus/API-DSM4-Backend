import { Alerta } from "../../entities/Alerta";
import { Parametro } from "../../entities/Parametro";

class InsereAtributosAlertas{

    inserir(parametro:Parametro, condicaoAlerta:string, valorMedicaoAlerta:number, nomeAlerta:string){
        let alerta = new Alerta()
        alerta.parametro = parametro
        alerta.condicaoAlerta = condicaoAlerta
        alerta.nomeAlerta = nomeAlerta
        alerta.valorMedicaoAlerta = valorMedicaoAlerta
        return alerta
    }

}

export default new InsereAtributosAlertas()