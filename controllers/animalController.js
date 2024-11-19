const AnimalModel = require("../models/animalModel")

class AnimalController {
  async listarView(req, res) {
    let animal = new AnimalModel()
    let lista = await animal.listar()

    res.render("animal/listagem", { lista: lista })
  }

  async cadastrarView(req, res) {
    let animal = new AnimalModel()
    let listaTipos = await animal.listarTipos()
    res.render("animal/cadastro", { listaTipos })
  }
  async cadastrar(req, res) {
    var ok = true
    if (
      req.body.nome != "" &&
      req.body.descricao != "" &&
      req.body.tipo != "0" &&
      req.file != null
    ) {
      let animal = new AnimalModel(
        0,
        req.body.nome,
        req.body.descricao,
        req.body.disponivel,
        req.file.filename,
        req.body.tipo
      )
      ok = await animal.gravar()
    } else {
      ok = false
    }
    res.send({ ok: ok })
  }
}

module.exports = AnimalController
