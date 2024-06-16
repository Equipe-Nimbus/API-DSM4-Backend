import MongoDB from "../../../BackMongDB";
import { Estacao } from "../../../entities/Estacao";

class AtualizaLocalizacoesCadastradas {
    async adicionarNovaLocalizacao(estacao: Estacao): Promise<void> {
        await MongoDB.connect();
        const colecaoEstados = MongoDB.db("BackNimbusNaoRelacional").collection("LocalizacoesCadastradas");
        
        const documentoEstado = await this.buscarLocalizacaoPorEstado(estacao.estadoEstacao, colecaoEstados);
        if (!documentoEstado) {
            const novaLocalizacao = {
                estado: estacao.estadoEstacao,
                cidades: [
                    {
                        cidade: estacao.cidadeEstacao,
                        quantidade: 1
                    }
                ]
            }

            const colecaoEstados = MongoDB.db("BackNimbusNaoRelacional").collection("LocalizacoesCadastradas");
            await colecaoEstados.insertOne(novaLocalizacao);
        }

        else {
            const cidadeExistente = documentoEstado.cidades.find(documento => documento.cidade === estacao.cidadeEstacao);
            if (cidadeExistente) {
                cidadeExistente.quantidade++;
            }

            else {
                documentoEstado.cidades.push({
                    cidade: estacao.cidadeEstacao,
                    quantidade: 1
                });
            }
            const colecaoEstados = MongoDB.db("BackNimbusNaoRelacional").collection("LocalizacoesCadastradas");
            await colecaoEstados.updateOne({ estado: estacao.estadoEstacao }, { $set: { cidades: documentoEstado.cidades } });
        }

        await MongoDB.close();
    }

    async atualizarLocalizacao(estacaoAntiga: Estacao, estacaoNova: Estacao,): Promise<void> {
        const alterouEstado = estacaoNova.estadoEstacao !== estacaoAntiga.estadoEstacao
        const alterouCidade = estacaoNova.cidadeEstacao !== estacaoAntiga.cidadeEstacao
        if (!alterouEstado && !alterouCidade) {
            return;
        }

        await MongoDB.connect();
        const colecaoEstados = MongoDB.db("BackNimbusNaoRelacional").collection("LocalizacoesCadastradas");

        const documentoEstadoAntigo = await this.buscarLocalizacaoPorEstado(estacaoAntiga.estadoEstacao, colecaoEstados);
        if(!alterouEstado && alterouCidade) {
            const cidadeAntiga = documentoEstadoAntigo.cidades.find(documento => documento.cidade === estacaoAntiga.cidadeEstacao);
            cidadeAntiga.quantidade--;

            const cidadeNova = documentoEstadoAntigo?.cidades?.find(documento => documento.cidade === estacaoNova.cidadeEstacao);
            if (cidadeNova) {
                cidadeNova.quantidade++;
            }

            else {
                documentoEstadoAntigo.cidades.push({
                    cidade: estacaoNova.cidadeEstacao,
                    quantidade: 1
                });
            }

            await colecaoEstados.updateOne({ estado: estacaoAntiga.estadoEstacao }, { $set: { cidades: documentoEstadoAntigo.cidades } });
        }

        if (alterouEstado) {
            const cidadeAntiga = documentoEstadoAntigo.cidades.find(documento => documento.cidade === estacaoAntiga.cidadeEstacao);
            cidadeAntiga.quantidade--;

            const documentoEstadoNovo = await this.buscarLocalizacaoPorEstado(estacaoNova.estadoEstacao, colecaoEstados);
            if (!documentoEstadoNovo) {
                const novaLocalizacao = {
                    estado: estacaoNova.estadoEstacao,
                    cidades: [
                        {
                            cidade: estacaoNova.cidadeEstacao,
                            quantidade: 1
                        }
                    ]
                }

                await colecaoEstados.insertOne(novaLocalizacao);
            }

            else {
                const cidadeNova = documentoEstadoNovo?.cidades?.find(documento => documento.cidade === estacaoNova.cidadeEstacao);
                if (cidadeNova) {
                    cidadeNova.quantidade++;
                }

                else {
                    documentoEstadoNovo.cidades.push({
                        cidade: estacaoNova.cidadeEstacao,
                        quantidade: 1
                    });
                }

                await colecaoEstados.updateOne({ estado: estacaoNova.estadoEstacao }, { $set: { cidades: documentoEstadoNovo.cidades } });
            }

            await colecaoEstados.updateOne({ estado: estacaoAntiga.estadoEstacao }, { $set: { cidades: documentoEstadoAntigo.cidades } });
        }

        await this.limparCidadesVazias(colecaoEstados);
        await this.limparEstadosVazios(colecaoEstados);
        await MongoDB.close();
    }

    async removerLocalizacao(estacao: Estacao): Promise<void> {
        await MongoDB.connect();
        const colecaoEstados = MongoDB.db("BackNimbusNaoRelacional").collection("LocalizacoesCadastradas");

        const documentoEstado = await this.buscarLocalizacaoPorEstado(estacao.estadoEstacao, colecaoEstados);
        const cidade = documentoEstado?.cidades?.find(documento => documento.cidade === estacao.cidadeEstacao);
        if (cidade) {
            cidade.quantidade--;
        }

        await colecaoEstados.updateOne({ estado: estacao.estadoEstacao }, { $set: { cidades: documentoEstado.cidades } });
        await this.limparCidadesVazias(colecaoEstados);
        await this.limparEstadosVazios(colecaoEstados);
        await MongoDB.close();
    }

    async buscarLocalizacaoPorEstado(estado: string, colecaoEstados: any) {
        const documentoEstado = await colecaoEstados.findOne({ estado: estado});
        return documentoEstado;
    }

    async limparCidadesVazias(colecaoEstados: any): Promise<void> {
        await colecaoEstados.updateMany({}, { $pull: { cidades: { quantidade: 0} }})
    }

    async limparEstadosVazios(colecaoEstados: any): Promise<void> {
        await colecaoEstados.deleteMany({ "cidades": { $size: 0 }});
    }
}

export default new AtualizaLocalizacoesCadastradas();
