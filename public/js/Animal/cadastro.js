document.addEventListener("DOMContentLoaded", function () {
  var btnGravar = document.getElementById("btnGravar")

  var inputImg = document.getElementById("inputImagem")

  inputImg.addEventListener("change", exibirPrevia)
  btnGravar.addEventListener("click", gravarAnimal)
})

function exibirPrevia(e) {
  //carrega a imagem na div previaImagem!
  //ler a imagem;
  let imagem = document.getElementById("inputImagem").files[0]

  //validando extensão
  let ext = imagem.type.split("/").pop()
  if (ext == "png" || ext == "jpg" || ext == "jpeg") {
    let imgPrevia = document.getElementById("imgPrevia")
    let objImg = URL.createObjectURL(imagem)
    imgPrevia.setAttribute("src", objImg)
    document.getElementById("previaImagem").style.display = "block"
  } else {
    alert("A extensão da imagem é inválida!")
    document.getElementById("inputImagem").value = ""
  }
}

function gravarAnimal() {
console.log("fui chamado para gravar")
  var inputNome = document.getElementById("inputNome")
  var inputDescricao = document.getElementById("inputDescricao")
  var inputFile = document.getElementById("inputImagem").files[0]
  var inputDisponivel = document.getElementById("selDisponivel")
  var selTipo = document.getElementById("selTipo")

  //if de validação básica
  if (
    inputNome.value != "" &&
    inputDescricao.value != "" &&
    selTipo.value != "0" &&
    inputDisponivel != "" &&
    inputFile != null
  ) {
    //converter para um formData
    /*var data = {
            codigo: inputCodigo.value,
            nome: inputNome.value,
            quantidade: inputQtde.value,
            marca: selMarca.value,
            categoria: selCategoria.value
        }*/

    var data = new FormData()
    data.append("nome", inputNome.value)
    data.append("descricao", inputDescricao.value)
    data.append("tipo", selTipo.value)
    data.append("disponivel", selDisponivel.checked ? 1 : 0)
    data.append("imagem", inputFile)

    fetch("/animal/cadastrar", {
      method: "POST",
      body: data,
    })
      .then((r) => {
        return r.json()
      })
      .then((r) => {
        if (r.ok) {
          alert("Animal cadastrado!")
        } else {
          alert("Erro ao cadastrar animal")
        }
      })
      .catch((e) => {
        console.log(e)
      })
  } else {
    alert("Preencha todos os campos corretamente!")
    return
  }
}
