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
      req.body.idAnimal,
      null,
      null,
      null,
      null,
      null,
      null
    )
    let result = await adocao.adotar()
    if (result) {
      let animal = new AnimalModel()
      animal.colocarComoIndisponivel(req.body.idAnimal)
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

  async adotadosView(req, res) {
    let adotados = new AdocaoModel()
    let lista = await adotados.listarAdotados()
    res.render("adocao/adotados", { lista: lista })
  }
}

module.exports = AdocaoController
