import MongoDB from "../../BackMongDB";

class FiltraData {
  async filtra(estacoesNomes: string[], dataInicio: string, dataFim: string) {
    await MongoDB.connect();
    const colecaoEstacoes = MongoDB.db("BackNimbusNaoRelacional").collection("OcorrenciaAlertas");

    const dataInicioUnix = new Date(dataInicio).getTime() / 1000;
    const dataFimUnix = new Date(dataFim).getTime() / 1000;

    const alertas = await colecaoEstacoes.find({
      nomeEstacao: { $in: estacoesNomes },
      unixtime: { $gte: dataInicioUnix, $lte: dataFimUnix }
    }).toArray();

    await MongoDB.close();

    return alertas.map(alerta => ({
      nomeAlerta: alerta.nomeAlerta,
      medicao: alerta.medicao,
      nomeEstacao: alerta.nomeEstacao,
      data: `${alerta.ano}-${alerta.mes}-${alerta.dia}`,
      nomeTipoParametro: alerta.nomeTipoParametro
    }));
  }
}

export default new FiltraData();