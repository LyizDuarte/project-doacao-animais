const AnimalModel = require("../models/animalModel");


class AdocaoController {

    async listarView(req, res) {
        let animal = new AnimalModel();
        let lista = await animal.listar(true);

        res.render('adocao/index', {lista: lista, layout: "adocao/index" });
    }

}

module.exports = AdocaoController;