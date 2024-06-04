import OcorrenciaAlertaMongo from "../../interfaces/OcorrenciaAlerta";

class EstruturaDashboardAlertaTipoParametro{

    estruturar(ocorrenciaAlertas:OcorrenciaAlertaMongo[]){
        let dashboard = {
            valorPorTipoParametro: [],
            tipoParametros: []
        }
        let parametrosOcorrencia:any = {}
        ocorrenciaAlertas.forEach(ocorrencia =>{
            parametrosOcorrencia[ocorrencia.nomeTipoParametro].tipoParametro = ocorrencia.nomeTipoParametro
            if(parametrosOcorrencia[ocorrencia.nomeTipoParametro].numeroOcorrencia == undefined)
                parametrosOcorrencia[ocorrencia.nomeTipoParametro].numeroOcorrencia = ocorrencia.nomeTipoParametro
            else{
                parametrosOcorrencia[ocorrencia.nomeTipoParametro].numeroOcorrencia += ocorrencia.nomeTipoParametro
            }
        })
        
    }

}