const AnimalModel = require("../models/animalModel")
const AdocaoModel = require("../models/adocaoModel")

class AdocaoController {
  async listarView(req, res) {
    let animal = new AnimalModel()
    let lista = await animal.listar(true)

    res.render("adocao/index", { lista: lista, layout: "adocao/index" })
  }
  async adotar(req, res) {
    console.log(req.body)
    let adocao = new AdocaoModel(
      0,
      req.body.nome,
      req.body.endereco,
      req.body.telefone,
      req.body.idAnimal
    )
    let result = await adocao.adotar()
    if (result) {
      res.send({
        ok: true,
        msg: "Animal adotado com sucesso!",
      })
    } else {
      res.send({
        ok: false,
        msg: "Erro ao adotar animal!",
      })
    }
  }
}

module.exports = AdocaoController
