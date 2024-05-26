import MongoDB from "../../../BackMongDB";

class FiltraData {
  async filtra(estacoesNomes: string[], dataInicio: string, dataFim: string) {
    await MongoDB.connect();
    const colecaoEstacoes = MongoDB.db("BackNimbusNaoRelacional").collection("OcorrenciaAlertas");
  
    if (estacoesNomes.length === 0) {
      throw new Error('Não há estações para filtrar os dados.');
    }
  
    const dataInicioDate = new Date(`${dataInicio}T00:00:00Z`);
    const dataInicioUnix = dataInicioDate.getTime() / 1000;
  
    const dataFimDate = new Date(`${dataFim}T23:59:59.999Z`);
    const dataFimUnix = dataFimDate.getTime() / 1000;
  
    const alertas = await colecaoEstacoes.find({
      nomeEstacao: { $in: estacoesNomes },
      unixtime: { $gte: dataInicioUnix, $lte: dataFimUnix }
    }).toArray();
  
    await MongoDB.close();
  
    if (alertas.length === 0) {
      throw new Error('Não há medições disponíveis para o período especificado.');
    }
  
    return alertas.map(alerta => ({
      nomeAlerta: alerta.nomeAlerta,
      medicao: alerta.medicao,
      nomeEstacao: alerta.nomeEstacao,
      data: `${alerta.ano}-${alerta.mes}-${alerta.dia}`,
      nomeTipoParametro: alerta.nomeTipoParametro,
      cidadeAlerta: alerta.cidadeEstacao,
      estadoAlerta: alerta.estadoEstacao,
      unidadeMedicao: alerta.unidadeMedicao
    }));
  }}

export default new FiltraData();
