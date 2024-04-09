import { TipoParametro } from "../../../../src/entities/TipoParametro"
import ConfereIgualdade from "../../../../src/services/TipoParametro/ConfereIgualdadeTipoParametro";
import MockConfereIgualdade from "./MockConfereIgualdadeTipoParametro";

let tipoParametrosCadastrados:TipoParametro[] = []

jest.mock("../../../../src/data-source", ()=>{
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
        }
    };
    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})

describe("Teste da Conferencia de Igualdade de linhas tipo parâmetro", ()=>{

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

    test("Conferindo um objeto cadastrado", async()=>{
        let resultado = await ConfereIgualdade.conferir(MockConfereIgualdade.tipoParametroTodos1)
        expect(resultado).toBe(false)
    })
    
    test("Conferindo um objeto não cadastrado", async()=>{
        let resultado = await ConfereIgualdade.conferir(MockConfereIgualdade.tipoParametroDiferente)
        expect(resultado).toBe(true)
    })
    
})