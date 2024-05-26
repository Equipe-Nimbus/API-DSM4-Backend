import MongoDB from "../../BackMongDB";

class FiltraLocalizacao {
  async filtra(cidade: string, estado: string) {
    await MongoDB.connect();
    const colecaoEstacoes = MongoDB.db("BackNimbusNaoRelacional").collection("OcorrenciaAlertas");

    if (cidade) {
      const estacoes = await colecaoEstacoes.find({ cidadeEstacao: cidade }).toArray();
      await MongoDB.close();

      const estacoesUnicas = Array.from(new Set(estacoes.map(estacao => estacao.nomeEstacao)));

      return {
        nome: cidade,
        estacoes: estacoesUnicas
      };
    }

    if (estado) {
      const estacoes = await colecaoEstacoes.find({ estadoEstacao: estado }).toArray();
      await MongoDB.close();

      const cidades = estacoes.reduce((acc, estacao) => {
        const cidadeIndex = acc.findIndex(cidadeObj => cidadeObj.nome === estacao.cidadeEstacao);

        if (cidadeIndex >= 0) {
          if (!acc[cidadeIndex].estacoes.includes(estacao.nomeEstacao)) {
            acc[cidadeIndex].estacoes.push(estacao.nomeEstacao);
          }
        } else {
          acc.push({
            nome: estacao.cidadeEstacao,
            estacoes: [estacao.nomeEstacao]
          });
        }

        return acc;
      }, []);

      return {
        estado: estado,
        cidades: cidades
      };
    }

    await MongoDB.close();
    throw new Error('Não há estações no lugar mencionado');
  }
}

export default new FiltraLocalizacao();
