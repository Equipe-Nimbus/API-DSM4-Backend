import { Request } from "express"

class MockTipoParametroControllerCadastro{

    reqTipoParametroTudoDiferente = {
        body:{
            nomeTipoParametro: "0",
            fatorTipoParametro: 0,
            unidadeTipoParametro: "0"
        }
    } as Request
    reqTipoParametroComUnidadeJaExistente = {
        body:{
            nomeTipoParametro: "0",
            fatorTipoParametro: 0,
            unidadeTipoParametro: "1"
        }
    } as Request
    reqTipoParametroUnidadeNula = {
        body:{
            nomeTipoParametro: null,
            fatorTipoParametro: 0,
            unidadeTipoParametro: null
        }
    } as Request
    reqTipoParametroJaExistente = {
        body:{
            nomeTipoParametro: "1",
            unidadeTipoParametro: "1",
            fatorTipoParametro: 1,
            offsetTipoParametro: 1,
            ganhoTipoParametro: 1,
            idTipoParametro:1
        }
    } as Request

}

export default new MockTipoParametroControllerCadastro()