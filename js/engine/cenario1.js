var Simulador = Simulador || {};

Simulador.Cenario1 = {

    calcular: function(dados) {
        var fase = Simulador.TRANSICAO.getFase(dados.ano);
        var resultado = {};
        resultado.ano = dados.ano;
        resultado.faseCBS = fase.faseCBS;
        resultado.faseIBS = fase.faseIBS;
        resultado.atividades = [];

        var dasTotalGeral = 0;
        var creditoTotalGeral = 0;

        for (var a = 0; a < dados.atividades.length; a++) {
            var ativ = dados.atividades[a];
            var res = this.calcularAtividade(ativ, dados.rbt12, fase, dados.percB2B);
            resultado.atividades.push(res);
            dasTotalGeral += res.dasTotal;
            creditoTotalGeral += res.creditoB2B;
        }

        resultado.dasTotalMensal = dasTotalGeral;
        resultado.creditoTotalB2B = creditoTotalGeral;
        return resultado;
    },

    calcularAtividade: function(ativ, rbt12, fase, percB2B) {
        var info = Simulador.Calculator.encontrarFaixaEBDAS(ativ.anexo, rbt12, 0);
        var aliqEf = info.aliqEfetiva;
        var percPis = info.percPisCofins;
        var percIcms = info.percIcmsIss;

        var receitaNormal = ativ.receitaTotal - ativ.receitaST - ativ.receitaMono;

        var aliqNormal = aliqEf;
        var aliqST = aliqEf * (1 - percIcms * ((1 - fase.faseIBS) + fase.faseIBS * ativ.percPermanece));
        var aliqMono = aliqEf * (1 - percPis * fase.faseCBS * ativ.percPermanece);

        var dasNormal = receitaNormal * aliqNormal;
        var dasST = ativ.receitaST * aliqST;
        var dasMono = ativ.receitaMono * aliqMono;
        var dasTotal = dasNormal + dasST + dasMono;

        var cbsNormal = aliqEf * (receitaNormal * (percPis * fase.faseCBS + percIcms * fase.faseIBS));
        var cbsST = aliqEf * (ativ.receitaST * (percPis * fase.faseCBS + percIcms * fase.faseIBS * (1 - ativ.percPermanece)));
        var cbsMono = aliqEf * (ativ.receitaMono * (percPis * fase.faseCBS * (1 - ativ.percPermanece) + percIcms * fase.faseIBS));
        var creditoTotal = cbsNormal + cbsST + cbsMono;
        var creditoB2B = creditoTotal * percB2B;

        return {
            anexo: ativ.anexo,
            nome: ativ.nome,
            receitaTotal: ativ.receitaTotal,
            receitaST: ativ.receitaST,
            receitaMono: ativ.receitaMono,
            receitaSemConcentracao: receitaNormal,
            aliqNominal: info.aliqNominal,
            parcelaDeduzir: info.parcelaDeduzir,
            aliqEfetiva: aliqEf,
            percPisCofins: percPis,
            percIcmsIss: percIcms,
            aliqDasNormal: aliqNormal,
            aliqDasST: aliqST,
            aliqDasMono: aliqMono,
            dasNormal: dasNormal,
            dasST: dasST,
            dasMono: dasMono,
            dasTotal: dasTotal,
            creditoTotal: creditoTotal,
            creditoB2B: creditoB2B,
            faixa: info.faixa.faixa
        };
    }
};
