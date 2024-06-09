import { query, Request } from "express";


class MocksUsuarioControllerListagemTotal {
    
    req1Limit10 = {
        query: {
            pagina: "1",
            paginaLimite: "10"
        }
    } as unknown as Request
    reqNullLimit10 = {
        query: {
            pagina: "0",
            paginaLimite: "11"
        }
    } as unknown as Request

    req2Limit10 = {
        query: {
            pagina: "2",
            paginaLimite: "10"
        }
    } as unknown as Request

}

export default new MocksUsuarioControllerListagemTotal();