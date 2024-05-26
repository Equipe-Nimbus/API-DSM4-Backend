import FiltraLocalizacao from "./FiltraLocalizacao";
import FiltraData from "./FiltraData";

class GeraRelatorioQuantidadeAlerta {
  async geraRelatorio(cidade: string, estado: string, dataInicio: string, dataFim: string) {
    const localizacao = await FiltraLocalizacao.filtra(cidade, estado);

    let estacoesNomes = [];

    if (cidade) {
      estacoesNomes = localizacao.estacoes;
    } else if (estado) {
      estacoesNomes = localizacao.cidades.flatMap(cidade => cidade.estacoes);
    }

    const medicoes = await FiltraData.filtra(estacoesNomes, dataInicio, dataFim);

    const formatarMedicoes = (medicoes, estacaoNome) => {
      return medicoes
        .filter(medicao => medicao.nomeEstacao === estacaoNome)
        .map(medicao => ({
          nomeAlerta: medicao.nomeAlerta,
          valorMedida: medicao.medicao,
          dataMedida: medicao.data,
          nomeTipoParametro: medicao.nomeTipoParametro,
          unidadeTipoParametro: medicao.unidadeMedicao,
          cidadeAlerta: medicao.cidadeAlerta,
          estadoAlerta: medicao.estadoAlerta
        }));
    };

    if (cidade) {
      const estacoesComMedicoes = estacoesNomes.map(estacaoNome => {
        const medicoesEstacao = medicoes.filter(medicao => medicao.nomeEstacao === estacaoNome);
        return {
          nome: estacaoNome,
          medicoes: formatarMedicoes(medicoesEstacao, estacaoNome)
        };
      });

      return {
        nome: cidade,
        estacoes: estacoesComMedicoes
      };
    }

    if (estado) {
      const cidadesComMedicoes = localizacao.cidades.map(cidadeObj => {
        const estacoesComMedicoes = cidadeObj.estacoes.map(estacaoNome => {
          const medicoesEstacao = medicoes.filter(medicao => medicao.nomeEstacao === estacaoNome);
          return {
            nome: estacaoNome,
            medicoes: formatarMedicoes(medicoesEstacao, estacaoNome)
          };
        });

        return {
          nome: cidadeObj.nome,
          estacoes: estacoesComMedicoes
        };
      });

      return {
        estado: estado,
        cidades: cidadesComMedicoes
      };
    }

    throw new Error('Erro ao processar a solicitação');
  }
}

export default new GeraRelatorioQuantidadeAlerta();
