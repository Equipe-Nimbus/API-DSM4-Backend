import { query, Request } from "express";


class MocksEstacaoControllerListagemTotal {
    
    reqPagina1Limit10 = {
        query: {
            pagina: "1",
            paginaLimite: "10"
        }
    } as unknown as Request
    reqPagina0Limit10 = {
        query: {
            pagina: "0",
            paginaLimite: "10"
        }
    } as unknown as Request

    reqPagina2Limit10 = {
        query: {
            pagina: "2",
            paginaLimite: "10"
        }
    } as unknown as Request

}

export default new MocksEstacaoControllerListagemTotal();