import { TipoParametro } from "../../entities/TipoParametro";

class MontaObjetoTipoParametro {

    criaTipoParametro (tipoParametro: TipoParametro) {
        const objetoTipoParametroMontado = {
            idTipoParametro: tipoParametro.idTipoParametro,
            nomeTipoParametro: tipoParametro.nomeTipoParametro,
            unidadeTipoParametro: tipoParametro.unidadeTipoParametro,
            fatorTipoParametro: tipoParametro.fatorTipoParametro
        }
        return objetoTipoParametroMontado;
    };
};

export default new MontaObjetoTipoParametro();