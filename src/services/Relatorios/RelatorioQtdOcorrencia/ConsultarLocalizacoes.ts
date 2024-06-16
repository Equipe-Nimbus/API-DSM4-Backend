import MongoDB from "../../../BackMongDB";

class ConsultarLocalizacoes {
    async consultar() {
        await MongoDB.connect();
        const colecao = MongoDB.db("BackNimbusNaoRelacional").collection("LocalizacoesCadastradas");
        const localizacoes = await colecao.find().toArray();
        await MongoDB.close();

        return localizacoes;
    }
}

export default new ConsultarLocalizacoes();