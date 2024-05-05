import PgDataSource from "../../data-source"
import { Estacao } from "../../entities/Estacao"
import EstacaoAtivaMesInterface from "../../interfaces/EstacaoAtivaMesInterface"

class CriarMesNovo{
    async criarMesNovo(mesAtual:string, anoAtual:string){
        const repositorioEstacao = PgDataSource.getRepository(Estacao)
        let estacaoMesAtualNovo:EstacaoAtivaMesInterface ={
            _id: undefined,
            ativas: 0,
            mes: mesAtual,
            ano: anoAtual
        }
        estacaoMesAtualNovo.ativas = await repositorioEstacao.count({where:{statusEstacao:true}})
        return estacaoMesAtualNovo
    }
}
export default new CriarMesNovo()