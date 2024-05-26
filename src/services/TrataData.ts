class TrataData{

    tratar(data:string){
        const dataDesmembrada = data.split("-").map(Number);
        const dataNova = new Date(dataDesmembrada[0], dataDesmembrada[1]-1, dataDesmembrada[2]).getTime()
        return dataNova/1000
    }

    tratarDataFinal(data:string) {
        const [ano, mes, dia] = data.split("-").map(Number);
        const dataNova = new Date(ano, mes - 1, dia, 23, 59, 59).getTime();
        return dataNova/1000;
    };

}

export default new TrataData()