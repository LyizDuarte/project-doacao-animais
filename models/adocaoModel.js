const Database = require("../db/database")

const conexao = new Database()

class AdocaoModel {
  #adocaoId
  #adocaoNome
  #adocaoEndereco
  #adocaoTelefone
  #animalId
  #animalNome
  #animalDescricao
  #animalDisponivel
  #animalImagem
  #tipoId
  #tipoNome

  get adocaoId() {
    return this.#adocaoId
  }
  set adocaoId(adocaoId) {
    this.#adocaoId = adocaoId
  }
  get adocaoNome() {
    return this.#adocaoNome
  }
  set adocaoNome(adocaoNome) {
    this.#adocaoNome = adocaoNome
  }
  get adocaoEndereco() {
    return this.#adocaoEndereco
  }
  set adocaoEndereco(adocaoEndereco) {
    this.#adocaoEndereco = adocaoEndereco
  }
  get adocaoTelefone() {
    return this.#adocaoTelefone
  }
  set adocaoTelefone(adocaoTelefone) {
    this.#adocaoTelefone = adocaoTelefone
  }
  get animalId() {
    return this.#animalId
  }
  set animalId(animalId) {
    this.#animalId = animalId
  }
  get animalNome() {
    return this.#animalNome
  }
  set animalNome(animalNome) {
    this.#animalNome = animalNome
  }
  get animalDescricao() {
    return this.#animalDescricao
  }
  set animalDescricao(animalDescricao) {
    this.#animalDescricao = animalDescricao
  }
  get animalDisponivel() {
    return this.#animalDisponivel
  }
  set animalDisponivel(animalDisponivel) {
    this.#animalDisponivel = animalDisponivel
  }
  get animalImagem() {
    return this.#animalImagem
  }
  set animalImagem(animalImagem) {
    this.#animalImagem = animalImagem
  }
  get tipoId() {
    return this.#tipoId
  }
  set tipoId(tipoId) {
    this.#tipoId = tipoId
  }
  get tipoNome() {
    return this.#tipoNome
  }
  set tipoNome(tipoNome) {
    this.#tipoNome = tipoNome
  }

  constructor(
    adocaoId,
    adocaoNome,
    adocaoEndereco,
    adocaoTelefone,
    animalId,
    animalNome,
    animalDescricao,
    animalDisponivel,
    animalImagem,
    tipoId,
    tipoNome
  ) {
    this.#adocaoId = adocaoId
    this.#adocaoNome = adocaoNome
    this.#adocaoEndereco = adocaoEndereco
    this.#adocaoTelefone = adocaoTelefone
    this.#animalId = animalId
    this.#animalNome = animalNome
    this.#animalDescricao = animalDescricao
    this.#animalDisponivel = animalDisponivel
    this.#animalImagem = animalImagem
    this.#tipoId = tipoId
    this.#tipoNome = tipoNome
  }

  async adotar() {
    let sql = `insert into tb_adocao (ado_nome, ado_endereco, ado_telefone, ani_id) values (?, ?, ?, ?)`
    let valores = [
      this.#adocaoNome,
      this.#adocaoEndereco,
      this.#adocaoTelefone,
      this.#animalId,
    ]
    let result = await conexao.ExecutaComandoNonQuery(sql, valores)
    return result
  }

  async listarAdotados() {
    let sql = `select * from tb_adocao a inner join tb_animal an on a.ani_id = an.ani_id`
    var rows = await conexao.ExecutaComando(sql)
    let lista = []
    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        var row = rows[i]
        let imagem = "/img/animais/" + row["ani_imagem"]
        lista.push(
          new AdocaoModel(
            row["ado_id"],
            row["ado_nome"],
            row["ado_endereco"],
            row["ado_telefone"],
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
    return lista
  }

  toJSON() {
    return {
      adocaoId: this.#adocaoId,
      adocaoNome: this.#adocaoNome,
      adocaoEndereco: this.#adocaoEndereco,
      adocaoTelefone: this.#adocaoTelefone,
      animalId: this.#animalId,
    }
  }
}
module.exports = AdocaoModel
