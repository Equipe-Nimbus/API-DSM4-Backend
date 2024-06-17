import { Estacao } from "../../entities/Estacao";
import ConsultaAlertasDiaEstacao from "./ConsultaAlertasDiaEstacao";
import ConsultaMedicoesDeHoje from "./ConsultaMedicoesDeHoje";
import EstruturaAlertasDiaEstacao from "./EstruturaAlertasDiaEstacao";
import FormataMedicoesDeHoje from "./FormataMedicoesDeHoje";

class GeraDashboardEspecifico{

    async gerar(idEstacao:string){
        const listaMedicoesParametroDoDia = await ConsultaMedicoesDeHoje.consultar(idEstacao)
        let dashboardEspecifico = await FormataMedicoesDeHoje.formatar(listaMedicoesParametroDoDia)
        let ocorrenciaAlertas = await ConsultaAlertasDiaEstacao.consultar(idEstacao)
        dashboardEspecifico.alertas = EstruturaAlertasDiaEstacao.estruturar(ocorrenciaAlertas)
        return dashboardEspecifico
    }

}

export default new GeraDashboardEspecifico()