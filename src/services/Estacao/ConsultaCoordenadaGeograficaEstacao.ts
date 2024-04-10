import PgDataSource from "../../data-source";
import { Estacao } from "../../entities/Estacao";

class ConsultaCoordenadaGeograficaEstacao {
    async consulta(corpoRequisicao): Promise<Number> {
        const repositorioEstacao = PgDataSource.getRepository(Estacao);
        const latitudeEstacao = corpoRequisicao.latitudeEstacao;
        const longitudeEstacao = corpoRequisicao.longitudeEstacao;
        const estacaoRecuperada = await repositorioEstacao
            .createQueryBuilder("estacao")
            .select(["estacao.idEstacao"])
            .where("estacao.latitudeEstacao = :latitude AND estacao.longitudeEstacao = :longitude", {latitude:  `${latitudeEstacao}`, longitude: `${longitudeEstacao}`})
            .getOne();
        if(estacaoRecuperada == undefined)
            return null;
        return estacaoRecuperada.idEstacao;
    }
};

export default new ConsultaCoordenadaGeograficaEstacao();