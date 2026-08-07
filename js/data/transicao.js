var Simulador = Simulador || {};

Simulador.TRANSICAO = {
    fases: [
        { ano: 2027, faseCBS: 1,   faseIBS: 0   },
        { ano: 2028, faseCBS: 1,   faseIBS: 0   },
        { ano: 2029, faseCBS: 1,   faseIBS: 0.1 },
        { ano: 2030, faseCBS: 1,   faseIBS: 0.2 },
        { ano: 2031, faseCBS: 1,   faseIBS: 0.3 },
        { ano: 2032, faseCBS: 1,   faseIBS: 0.4 },
        { ano: 2033, faseCBS: 1,   faseIBS: 1   }
    ],

    getFase: function(ano) {
        for (var i = 0; i < this.fases.length; i++) {
            if (this.fases[i].ano === ano) return this.fases[i];
        }
        return this.fases[0];
    }
};

Simulador.ALICOTAS_REFERENCIA = {
    cbs: 0.088,
    ibs: 0.177,
    total: 0.265
};

Simulador.CCLASSTRIB = [
    { codigo: "000001",         cst: "200", desc: "Tributação integral - regra geral",                              pRedIBS: 0,   pRedCBS: 0,   baseLegal: "art. 10"           },
    { codigo: "200003",         cst: "200", desc: "Produtos destinados a alimentação humana (red. 60%)",             pRedIBS: 0.6, pRedCBS: 0.6, baseLegal: "art. 137 / Anexo"   },
    { codigo: "200004",         cst: "200", desc: "Dispositivos médicos (red. 60%)",                                pRedIBS: 0.6, pRedCBS: 0.6, baseLegal: "art. 137 / Anexo"   },
    { codigo: "200039",         cst: "200", desc: "Produções artísticas, culturais e eventos - Anexo X (red. 60%)", pRedIBS: 0.6, pRedCBS: 0.6, baseLegal: "art. 137 / Anexo X" },
    { codigo: "RED-60",         cst: "200", desc: "Genérico - alíquota reduzida em 60% (saúde, educação, agro etc.)", pRedIBS: 0.6, pRedCBS: 0.6, baseLegal: "arts. 128-145"     },
    { codigo: "RED-30",         cst: "200", desc: "Genérico - profissões intelectuais regulamentadas (red. 30%)",   pRedIBS: 0.3, pRedCBS: 0.3, baseLegal: "art. 127"          },
    { codigo: "ALIQ-ZERO",      cst: "200", desc: "Genérico - alíquota zero (cesta básica nacional etc.)",           pRedIBS: 1,   pRedCBS: 1,   baseLegal: "arts. 125-126"      },
    { codigo: "RED-40-BAR-REST",cst: "200", desc: "Bares, restaurantes e lanchonetes - regime específico (red. 40%)", pRedIBS: 0.4, pRedCBS: 0.4, baseLegal: "arts. 273-276"   },
    { codigo: "RED-40-HOTEL",   cst: "200", desc: "Hotelaria, parques de diversão e temáticos (red. 40%)",          pRedIBS: 0.4, pRedCBS: 0.4, baseLegal: "regime específico" }
];

Simulador.buscarCClassTrib = function(codigo) {
    for (var i = 0; i < Simulador.CCLASSTRIB.length; i++) {
        if (Simulador.CCLASSTRIB[i].codigo === codigo) return Simulador.CCLASSTRIB[i];
    }
    return { codigo: codigo, pRedIBS: 0, pRedCBS: 0 };
};
