import { Estacao } from "../../entities/Estacao";
import ConsultaMedicoesDeHoje from "./ConsultaMedicoesDeHoje";
import FormataMedicoesDeHoje from "./FormataMedicoesDeHoje";

class GeraDashboardEspecifico{

    async gerar(idEstacao:string){
        const listaMedicoesParametroDoDia = await ConsultaMedicoesDeHoje.consultar(idEstacao)
        let dashboardEspecifico = await FormataMedicoesDeHoje.formatar(listaMedicoesParametroDoDia)
        return dashboardEspecifico
    }

}

export default new GeraDashboardEspecifico()