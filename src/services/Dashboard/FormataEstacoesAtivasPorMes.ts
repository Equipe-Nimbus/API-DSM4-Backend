import EstacaoAtivaMesInterface from "../../interfaces/EstacaoAtivaMesInterface";

class FormataEstacoesAtivasPorMes{

    formatar(listaEstacoesPorMes:EstacaoAtivaMesInterface[]){
        let ativasPorMes={
            quantidades:[] as number[],
            meses:[] as string[]
        }
        listaEstacoesPorMes.forEach(estacoesMes => {
            ativasPorMes.quantidades.push(estacoesMes.ativas)
            ativasPorMes.meses.push(estacoesMes.mes + " " + estacoesMes.ano)
        });
        return ativasPorMes
    }

}

export default new FormataEstacoesAtivasPorMes()