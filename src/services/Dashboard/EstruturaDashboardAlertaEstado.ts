import OcorrenciaAlertaMongo from "../../interfaces/OcorrenciaAlerta";

class EstruturaDashboardAlertaEstado{

    estruturar(ocorrenciaAlertas:OcorrenciaAlertaMongo[]){
        let dashboard = {
            valorPorEstado: [],
            estados: [] 
        }
        const estadosDoBrasil = this.contarAlertas(ocorrenciaAlertas)
        for (let index = 0; index <= 4; index++) {
            if(index<4){
                dashboard.valorPorEstado.push(estadosDoBrasil[index].numeroOcorrencia)
                dashboard.estados.push(estadosDoBrasil[index].abreviacao)
            }
            else{
                dashboard.estados.push("Outros")
                let valor = 0
                for (let indexOutros = 4; indexOutros < ocorrenciaAlertas.length; indexOutros++) {
                    valor += estadosDoBrasil[indexOutros].numeroOcorrencia
                }
                dashboard.valorPorEstado.push(valor)
            }
        }
        return dashboard
    }

    contarAlertas(ocorrenciaAlertas:OcorrenciaAlertaMongo[]){
        let estadosDoBrasil: { abreviacao: string, numeroOcorrencia: number }[] = [
            { abreviacao: "AC", numeroOcorrencia: 0 }, // Acre
            { abreviacao: "AL", numeroOcorrencia: 0 }, // Alagoas
            { abreviacao: "AP", numeroOcorrencia: 0 }, // Amapá
            { abreviacao: "AM", numeroOcorrencia: 0 }, // Amazonas
            { abreviacao: "BA", numeroOcorrencia: 0 }, // Bahia
            { abreviacao: "CE", numeroOcorrencia: 0 }, // Ceará
            { abreviacao: "DF", numeroOcorrencia: 0 }, // Distrito Federal
            { abreviacao: "ES", numeroOcorrencia: 0 }, // Espírito Santo
            { abreviacao: "GO", numeroOcorrencia: 0 }, // Goiás
            { abreviacao: "MA", numeroOcorrencia: 0 }, // Maranhão
            { abreviacao: "MT", numeroOcorrencia: 0 }, // Mato Grosso
            { abreviacao: "MS", numeroOcorrencia: 0 }, // Mato Grosso do Sul
            { abreviacao: "MG", numeroOcorrencia: 0 }, // Minas Gerais
            { abreviacao: "PA", numeroOcorrencia: 0 }, // Pará
            { abreviacao: "PB", numeroOcorrencia: 0 }, // Paraíba
            { abreviacao: "PR", numeroOcorrencia: 0 }, // Paraná
            { abreviacao: "PE", numeroOcorrencia: 0 }, // Pernambuco
            { abreviacao: "PI", numeroOcorrencia: 0 }, // Piauí
            { abreviacao: "RJ", numeroOcorrencia: 0 }, // Rio de Janeiro
            { abreviacao: "RN", numeroOcorrencia: 0 }, // Rio Grande do Norte
            { abreviacao: "RS", numeroOcorrencia: 0 }, // Rio Grande do Sul
            { abreviacao: "RO", numeroOcorrencia: 0 }, // Rondônia
            { abreviacao: "RR", numeroOcorrencia: 0 }, // Roraima
            { abreviacao: "SC", numeroOcorrencia: 0 }, // Santa Catarina
            { abreviacao: "SP", numeroOcorrencia: 0 }, // São Paulo
            { abreviacao: "SE", numeroOcorrencia: 0 }, // Sergipe
            { abreviacao: "TO", numeroOcorrencia: 0 }  // Tocantins
        ];

        estadosDoBrasil.forEach(estado => {
            ocorrenciaAlertas.forEach(ocorrencia =>{
                if(estado.abreviacao === ocorrencia.estadoEstacao)
                    estado.numeroOcorrencia += 1
            })
        });

        estadosDoBrasil.sort((a, b) => b.numeroOcorrencia - a.numeroOcorrencia);

        return estadosDoBrasil
    }


    
    
}

export default new EstruturaDashboardAlertaEstado()