import { Medicao } from "../../entities/Medicao";
import { Parametro } from "../../entities/Parametro";
import { DashboardEspecificoInterface, ParametroDashboardInterface } from "../../interfaces/DashboardEspecifico";

class FormataMedicoesDeHoje{

    async formatar(parametros:Parametro[]){
        let dashboardEspecifico:DashboardEspecificoInterface = {
            parametros:[],
            alertas:{
                alertasNome: [],
                alertasNumero: []
            }
        }
        for(let parametro in parametros){
            let parametroDashboard = this.criarParametroDashboard()
            parametroDashboard.unidadeMedida = (await parametros[parametro].tiposParametro).unidadeTipoParametro
            parametroDashboard.nomeTipoParametro = (await parametros[parametro].tiposParametro).nomeTipoParametro
            let offset = Number((await parametros[parametro].tiposParametro).offsetTipoParametro)
            let fator = (await parametros[parametro].tiposParametro).fatorTipoParametro
            parametroDashboard.valorMaximo = (parametros[parametro].medicoes[0].valorMedida * fator) + offset
            parametroDashboard.valorMinimo = (parametros[parametro].medicoes[0].valorMedida * fator) + offset
            parametros[parametro].medicoes.forEach(medicao =>{
                if(parametroDashboard.valorMaximo < (medicao.valorMedida * fator) + offset)
                    parametroDashboard.valorMaximo = (medicao.valorMedida * fator) + offset
                if(parametroDashboard.valorMinimo > (medicao.valorMedida * fator) + offset)
                    parametroDashboard.valorMinimo = (medicao.valorMedida * fator) + offset
                parametroDashboard.medicoes.push({
                    valor: (medicao.valorMedida * fator) + offset,
                    data: new Date((medicao.unixTime * 1000) - (3 * 60 * 60 * 1000))
                })
            })
            dashboardEspecifico.parametros.push(parametroDashboard)
        };
        return dashboardEspecifico
    }

    criarParametroDashboard():ParametroDashboardInterface{
        let parametro:ParametroDashboardInterface = {
            nomeTipoParametro: "",
            unidadeMedida: "",
            valorMaximo: 0,
            valorMinimo: 0,
<<<<<<< HEAD
            medicoes: []
=======
            medicoes: [],
            alertas: {
                valores: [],
                alertasDia: []
            }
>>>>>>> main
        }
        return parametro;
    }

}

export default new FormataMedicoesDeHoje()