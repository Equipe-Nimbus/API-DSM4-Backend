import EstacaoController from "../../../../src/controllers/EstacaoController";
import { Estacao } from "../../../../src/entities/Estacao"
import { Parametro } from "../../../../src/entities/Parametro";
import { TipoParametro } from "../../../../src/entities/TipoParametro";
import MockResponse from "../MockResponse";
import MockEstacaoControllerCadastro from "./MockEstacaoControllerCadastro";

let listaEstacao: Estacao[] = [];
let listaParametro: Parametro[] = [];

jest.mock("../../../../src/data-source.ts", () => {

    const mockRepositorioEstacao = {
        save: (estacao: Estacao) => {
            listaEstacao.forEach(estacaoCadastrada => {
                if (estacao.nomeEstacao == estacaoCadastrada.nomeEstacao) {
                    const error = {code: "23505"};
                    throw error;
                }; 
            });
            const listaAtributosEstacao = ["nomeEstacao", "ruaAvenidaEstacao", "numeroEnderecoEstacao", "bairroEstacao", "cidadeEstacao", "estadoEstacao", "cepEstacao", "latitudeEstacao", "longitudeEstacao"];
            listaAtributosEstacao.forEach(atributoEstacao => {
                if (estacao[atributoEstacao] == "" || estacao[atributoEstacao] == null) {
                    const error = {code:"23502"}
                    throw error
                };
            });
            listaEstacao.push(estacao);
        }
    };

    const mockGetRepository = jest.fn(() => mockRepositorioEstacao);
    return {
        getRepository: mockGetRepository,
    };
});

jest.mock("../../../../src/services/Estacao/ConsultaCoordenadaGeograficaEstacao.ts", () => {
    const mockCoordenadaGeograficaEstacao =
        (estacao: Estacao) => {
            listaEstacao.forEach(estacaoCadastrada => {
                const coordenadaGeograficaEstacaoCadastrada: Object = {
                    "latitudeEstacao": estacaoCadastrada.latitudeEstacao,
                    "longitudeEstacao": estacaoCadastrada.longitudeEstacao
                };
                const coordenadaGeograficaEstacao: Object = {
                    "latitudeEstacao": estacao.latitudeEstacao,
                    "longitudeEstacao": estacao.longitudeEstacao
                };
                if (coordenadaGeograficaEstacao == coordenadaGeograficaEstacaoCadastrada) {
                    return true;
                };
            });
            return false;
        };
    const mockConsultaCoordenadaGeografica = jest.fn(mockCoordenadaGeograficaEstacao);
    return {
        consulta: mockConsultaCoordenadaGeografica,
    }
});

jest.mock("../../../../src/services/Estacao/CriaObjetoParametro.ts", () => {
    const mockListaObjetoParametro = (listaTipoParametro: TipoParametro[]) => {
        for(const tipoParametro of listaTipoParametro) {
            if (Object.keys(tipoParametro).length == 0)
                return [];
            const objetoTipoParametro: TipoParametro = {
                "idTipoParametro": tipoParametro.idTipoParametro,
                "nomeTipoParametro": "Nome do Tipo",
                "unidadeTipoParametro": "Unidade",
                "fatorTipoParametro": 1,
                "offsetTipoParametro": 1,
                "statusTipoParametro": true,
                "parametros": null,
                "estacoes": null           
            };
            const objetoParametro: Parametro = {
                "idParametro": 1,
                "tiposParametro": Promise.resolve(objetoTipoParametro),
                "estacoes": null,
                "medicoes": null,
                alertas: []
            };
            listaParametro.push(objetoParametro);
        }
        return listaParametro;
    }; 
    const mockCriaObjetoParametro = jest.fn(mockListaObjetoParametro);
    return {
        criarRelacionameto: mockCriaObjetoParametro,
    };
});

describe("Teste da classe EstacaoController método cadastrar", () => {

    beforeEach(() => {
        listaEstacao = [];        
    });

    test("Cadastrar estação com sucesso", async () => {
        await EstacaoController.cadastrar(MockEstacaoControllerCadastro.reqEstacaoInicial, MockResponse.resSemLocals);
        const mockStatus = MockResponse.resSemLocals.status(200).send as jest.Mock;
        expect(mockStatus.mock.calls[0][0]).toBe("Estação cadastrada com sucesso!");
        mockStatus.mockClear();
    });

    test("Cadastrar estação nome duplicado", async () => {
        try {
            await EstacaoController.cadastrar(MockEstacaoControllerCadastro.reqEstacaoInicial, MockResponse.resSemLocals);
            await EstacaoController.cadastrar(MockEstacaoControllerCadastro.reqEstacaoNomeRepetido, MockResponse.resSemLocals);
        } catch (error) {
            const mockStatus = MockResponse.resSemLocals.status(400).send as jest.Mock;
            expect(mockStatus.mock.calls[0][0]).toBe("Nome de estação já cadastrado!");
            mockStatus.mockClear();
        };       
    });

    test("Cadastrar estação com a mesma coordenada geografica", async () => {
        try {
            await EstacaoController.cadastrar(MockEstacaoControllerCadastro.reqEstacaoInicial, MockResponse.resSemLocals);
            await EstacaoController.cadastrar(MockEstacaoControllerCadastro.reqEstacaoCoordenadaGeografica, MockResponse.resSemLocals);
        } catch (error) {
            const mockStatus = MockResponse.resSemLocals.status(400).send as jest.Mock;
            expect(mockStatus.mock.calls[0][0]).toBe("Já existe uma estação com essa coordenada geográfica!");
            mockStatus.mockClear();
        }
    });

    test("Cadastrar estação com propriedade nula", async () => {
        try{
            await EstacaoController.cadastrar(MockEstacaoControllerCadastro.reqEstacaoPropriedadeNula, MockResponse.resSemLocals);
        } catch (error) {
            const mockStatus = MockResponse.resSemLocals.status(400).send as jest.Mock;
            expect(mockStatus.mock.calls[0][0]).toBe("Não é possível cadastrar uma estação com campos nulos!");
            mockStatus.mockClear();
        };
    });

    test("Cadastrar estação sem tipoParametro", async () => {
        try{
            await EstacaoController.cadastrar(MockEstacaoControllerCadastro.reqEstacaoSemTipoParametro, MockResponse.resSemLocals);
        } catch (error) {
            const mockStatus = MockResponse.resSemLocals.status(400).send as jest.Mock;
            expect(mockStatus.mock.calls[0][0]).toBe("É necessário pelo menos um tipo parâmetro!");
            mockStatus.mockClear();
        };
    });
})