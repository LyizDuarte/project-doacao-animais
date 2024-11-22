const Database = require("../db/database")

const conexao = new Database()

class AdocaoModel {
  #adocaoId
  #adocaoNome
  #adocaoEndereco
  #adocaoTelefone
  #animalId

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

  constructor(adocaoId, adocaoNome, adocaoEndereco, adocaoTelefone, animalId) {
    this.#adocaoId = adocaoId
    this.#adocaoNome = adocaoNome
    this.#adocaoEndereco = adocaoEndereco
    this.#adocaoTelefone = adocaoTelefone
    this.#animalId = animalId
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
