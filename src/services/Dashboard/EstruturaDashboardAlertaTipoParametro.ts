import OcorrenciaAlertaMongo from "../../interfaces/OcorrenciaAlerta";
import OcorrenciaAlertaDashboard from "../../interfaces/OcorrenciaAlertaDashboard";

class EstruturaDashboardAlertaTipoParametro{

    estruturar(ocorrenciaAlertas:OcorrenciaAlertaMongo[]):{valorTipoParametro: number[]; tiposParametros: string[];}{
        let dashboard = {valorTipoParametro: [], tiposParametros: []}
        let ocorrenciaParametro:any = {}
        ocorrenciaAlertas.forEach(ocorrencia =>{
            if(ocorrenciaParametro[ocorrencia.nomeTipoParametro])
                ocorrenciaParametro[ocorrencia.nomeTipoParametro] += 1
            else{
                ocorrenciaParametro[ocorrencia.nomeTipoParametro] = 1 
            }
        })
        let ocorrenciaParametroLista = []
        for (const atributo in ocorrenciaParametro) {
            let ocorrencia:any = {}
            ocorrencia[atributo] = ocorrenciaParametro[atributo]
            ocorrenciaParametroLista.push(ocorrencia)
        }
        ocorrenciaParametroLista.sort((a,b)=>a-b)
        let contador = 1
        let numeroOcorrencia = 0
        ocorrenciaParametroLista.forEach(ocorrencia =>{
            if(contador >= 5){
                if(contador == 5)
                    dashboard.tiposParametros.push("Outros")
                for (const atributo in ocorrencia) {
                    numeroOcorrencia += ocorrencia[atributo]
                }
            }
            else{
                for (const atributo in ocorrencia) {
                    dashboard.tiposParametros.push(atributo)
                    dashboard.valorTipoParametro.push(ocorrencia[atributo])
                }
            }
            contador += 1
        })
        if(dashboard.tiposParametros.length === 5)
            dashboard.valorTipoParametro.push(numeroOcorrencia)
        return dashboard
    }


}

export default new EstruturaDashboardAlertaTipoParametro()

