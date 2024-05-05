class GeraUnixTime {
    gerar() {
        return Math.floor(Date.now() / 1000);
    };
};

export default new GeraUnixTime();