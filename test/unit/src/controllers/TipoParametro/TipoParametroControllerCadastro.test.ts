import { TipoParametro } from "../../../../../src/entities/TipoParametro";
import MockResponse from "../MockResponse";
import TipoParametroController from "../../../../../src/controllers/TipoParametroController";
import MockCadastro from "./MockTipoParametroControllerCadastro";


let tipoParametrosCadastrados:TipoParametro[] = []

jest.mock("../../../../../src/data-source", ()=>{
    const mockRepository = {
        findOne: (parametros:{where:{
            nomeTipoParametro: string,
            unidadeTipoParametro: string,
            fatorTipoParametro: number,
            offsetTipoParametro: number,
            ganhoTipoParametro: number,
            }})=>{
            let resultado = undefined
            let objetoCadastrando = parametros.where
            let contadorIgualdade = 0
            tipoParametrosCadastrados.forEach(objetoCadastrado => {
                for(const chave in objetoCadastrado){
                    if(objetoCadastrado[chave] == objetoCadastrando[chave])
                        contadorIgualdade++
                        if(contadorIgualdade == 4)
                            resultado = parametros.where
                }
                contadorIgualdade = 0
            });
            return resultado
            },
        save: (tipoParametroCadastrando:TipoParametro)=>{
            let error = {code:""}
            tipoParametrosCadastrados.forEach(tipoParametroCadastrado => {
                if(tipoParametroCadastrado.unidadeTipoParametro == tipoParametroCadastrando.unidadeTipoParametro){
                    error = {code:"23505"}
                    throw error
                }
            });
            if(tipoParametroCadastrando.nomeTipoParametro == null || tipoParametroCadastrando.unidadeTipoParametro == null){
                error = {code:"23502"}
                throw error
            }
            return;
        }
    };
    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})




describe("Teste de cadastro de Tipo Parametro", ()=>{

    beforeAll(()=>{
        for(let id = 1; id <= 25; id++){
            let tipoParametro = new TipoParametro()
            tipoParametro.fatorTipoParametro = id
            tipoParametro.idTipoParametro = id
            tipoParametro.nomeTipoParametro = id.toString()
            tipoParametro.offsetTipoParametro = id
            tipoParametro.unidadeTipoParametro = id.toString()
            tipoParametrosCadastrados.push(tipoParametro)
        }
    })

    test("Cadastrando TipoParametro totalmente preenchido e diferente de todos já cadastrado", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear()
        await TipoParametroController.cadastrar(MockCadastro.reqTipoParametroTudoDiferente, MockResponse.resSemLocals);
        expect(mockRes.mock.calls[0][0]).toBe("Tipo parametro cadastrado com sucesso")
    })

    test("Cadastrando TipoParametro com unidade e nome nulos", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await TipoParametroController.cadastrar(MockCadastro.reqTipoParametroUnidadeNula, MockResponse.resSemLocals);
        expect(mockRes.mock.calls[0][0]).toBe("nomeTipoParametro e unidadeTipoParametro não podem ser nulo")
    })

    test("Cadastrando TipoParametro já existente", async()=>{
        const mockRes = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear()
        await TipoParametroController.cadastrar(MockCadastro.reqTipoParametroJaExistente, MockResponse.resSemLocals);
        expect(mockRes.mock.calls[0][0]).toBe("TipoParametro identico já cadastrada")
    })
    
})