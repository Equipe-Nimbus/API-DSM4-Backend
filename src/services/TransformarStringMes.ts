class TransformarStringMes {
    transformar(mes: string) {
        const meses: { [key: string]: number } = {
            "Janeiro": 1,
            "Fevereiro": 2,
            "Março": 3,
            "Abril": 4,
            "Maio": 5,
            "Junho": 6,
            "Julho": 7,
            "Agosto": 8,
            "Setembro": 9,
            "Outubro": 10,
            "Novembro": 11,
            "Dezembro": 12
        };
        const numeroMes = meses[mes];

        if (numeroMes !== undefined) {
            return numeroMes.toString().padStart(2, '0');
        } else {
            return undefined;
        }
    
        return meses[mes];
    };
};

export default new TransformarStringMes();