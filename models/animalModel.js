const Database = require("../db/database")

const conexao = new Database()

class AnimalModel {
  #animalId
  #animalNome
  #animalDescricao
  #animalDisponivel
  #animalImagem
  #tipoId
  #tipoNome

  get animalId() {
    return this.#animalId
  }

  set animalId(value) {
    this.#animalId = value
  }

  get animalNome() {
    return this.#animalNome
  }

  set animalNome(value) {
    this.#animalNome = value
  }

  get animalDescricao() {
    return this.#animalDescricao
  }

  set animalDescricao(value) {
    this.#animalDescricao = value
  }

  get animalDisponivel() {
    return this.#animalDisponivel
  }

  set animalDisponivel(value) {
    this.#animalDisponivel = value
  }

  get animalImagem() {
    return this.#animalImagem
  }

  set animalImagem(value) {
    this.#animalImagem = value
  }

  get tipoId() {
    return this.#tipoId
  }

  set tipoId(value) {
    this.#tipoId = value
  }

  get tipoNome() {
    return this.#tipoNome
  }

  set tipoNome(value) {
    this.#tipoNome = value
  }

  constructor(
    animalId,
    animalNome,
    animalDescricao,
    animalDisponivel,
    animalImagem,
    tipoId,
    tipoNome
  ) {
    this.#animalId = animalId
    this.#animalNome = animalNome
    this.#animalDescricao = animalDescricao
    this.#animalDisponivel = animalDisponivel
    this.#animalImagem = animalImagem
    this.#tipoId = tipoId
    this.#tipoNome = tipoNome
  }

  async gravar() {
    let sql = `insert into tb_animal (ani_nome, ani_descricao, ani_disponivel, ani_imagem, tip_id) values (?, ?, ?, ?, ?)`
    let valores = [
      this.#animalNome, 
      this.#animalDescricao,
      this.#animalDisponivel,
      this.#animalImagem,
      this.#tipoId,
    ]
    return await conexao.ExecutaComandoNonQuery(sql, valores)
  }

  async listarTipos() {
    let sql = `select * from tb_tipoanimal`
    let rows = await conexao.ExecutaComando(sql)
    let lista = []
    for (let i = 0; i < rows.length; i++) {
      lista.push(
        new AnimalModel(
          null,
          null,
          null,
          null,
          null,
          rows[i]["tip_id"],
          rows[i]["tip_nome"]
        )
      )
    }
    return lista
  }

  async listar(apenasDisponivel = false) {
    let sqlWhere = ""
    if (apenasDisponivel) sqlWhere = " where ani_disponivel = 'S' "

    let sql =
      "select * from tb_animal a inner join tb_tipoanimal t on a.tip_id = t.tip_id" +
      sqlWhere

    var rows = await conexao.ExecutaComando(sql)

    let listaRetorno = []

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        var row = rows[i]

        let imagem = ""
        if (row["ani_imagem"].toString("base64")[0] == "i") {
          imagem =
            "/img/animais/" + row["ani_imagem"]
        } else {
          imagem =
            "/img/animais/" + row["ani_imagem"]
        }

        listaRetorno.push(
          new AnimalModel(
            row["ani_id"],
            row["ani_nome"],
            row["ani_descricao"],
            row["ani_disponivel"],
            imagem,
            row["tip_id"],
            row["tip_nome"]
          )
        )
      }
    }

    return listaRetorno
  }

  toJSON() {
    return {
      animalId: this.#animalId,
      animalNome: this.#animalNome,
      animalDescricao: this.#animalDescricao,
      animalDisponivel: this.#animalDisponivel,
      animalImagem: this.#animalImagem,
      tipoId: this.#tipoId,
      tipoNome: this.#tipoNome,
    }
  }
}

module.exports = AnimalModel
