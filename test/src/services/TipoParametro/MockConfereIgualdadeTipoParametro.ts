import { TipoParametro } from "../../../../src/entities/TipoParametro";

class MockCondereIgualdadeTipoParametro{

    tipoParametroTodos1 = {
        nomeTipoParametro: "1",
        unidadeTipoParametro: "1",
        fatorTipoParametro: 1,
        offsetTipoParametro: 1,
        ganhoTipoParametro: 1,
        idTipoParametro:1
    } as TipoParametro
    
    tipoParametroDiferente = {
        nomeTipoParametro: "1",
        unidadeTipoParametro: "1",
        fatorTipoParametro: 1,
        offsetTipoParametro: 2,
        ganhoTipoParametro: 1,
        idTipoParametro:30
    } as TipoParametro
}

export default new MockCondereIgualdadeTipoParametro()

