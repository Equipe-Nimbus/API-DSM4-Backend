import PgDataSource from "../../data-source";
import { Estacao } from "../../entities/Estacao";

class ConsultaCoordenadaGeograficaEstacao {
    async consulta(corpoRequisicao): Promise<Boolean> {
        const repositorioEstacao = PgDataSource.getRepository("estacao");
        const latitudeEstacao = corpoRequisicao.latitudeEstacao;
        const longitudeEstacao = corpoRequisicao.longitudeEstacao;
        const estacao = await repositorioEstacao
            .createQueryBuilder("estacao")
            .select(["estacao.idEstacao"])
            .where("estacao.latitudeEstacao = :latitude AND estacao.longitudeEstacao = :longitude", {latitude:  `${latitudeEstacao}`, longitude: `${longitudeEstacao}`})
            .getOne();
        if (estacao) {
            return true;
        }
        return false;
    }
};

export default new ConsultaCoordenadaGeograficaEstacao();