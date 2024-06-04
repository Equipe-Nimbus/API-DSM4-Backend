import OcorrenciaAlertaMongo from "../../interfaces/OcorrenciaAlerta";

class EstruturaAlertasDiaEstacao{

    estruturar(ocorrenciaAlertas:OcorrenciaAlertaMongo[]){
        let dashboard = {
            alertasNome:[],
            alertasNumero:[]
        }
        let ocorrenciaTipoParametro:any = {}
        ocorrenciaAlertas.forEach(ocorrencia =>{
            if(ocorrenciaTipoParametro[ocorrencia.nomeTipoParametro]){
                ocorrenciaTipoParametro[ocorrencia.nomeTipoParametro] += 1
            }
            else{
                ocorrenciaTipoParametro[ocorrencia.nomeTipoParametro] = 1
            }
        })
        let listaOcorrencias:{nomeTipoParametro:string, numeroOcorrencias:number}[] = []
        for (const atributo in ocorrenciaTipoParametro) {
            listaOcorrencias.push({
                nomeTipoParametro: atributo,
                numeroOcorrencias: ocorrenciaTipoParametro[atributo]
            })
        }
        listaOcorrencias.sort((a,b)=>a.numeroOcorrencias-b.numeroOcorrencias)
        listaOcorrencias.forEach(ocorrencia =>{
            dashboard.alertasNome.push(ocorrencia.nomeTipoParametro)
            dashboard.alertasNumero.push(ocorrencia.numeroOcorrencias)
        })
        return dashboard
    }

}

export default new EstruturaAlertasDiaEstacao()