document.addEventListener("DOMContentLoaded", function () {
  let adocao = localStorage.getItem("adocao") || "[]"
  var modalAdocao = document.getElementById("modalAdocao")

  const btnAdd = document.querySelectorAll(".btnAdotar")
  for (const btn of btnAdd) {
    btn.addEventListener("click", adicionarParaAdocao)
  }

  modalAdocao.addEventListener("show.bs.modal", function (event) {
    console.log("modal abriu")
    let html = ""
    html += `<div>
    <form>
        <div class="form-group">
            <label for="inputNome">Nome do adotante</label>
            <input type="text" class="form-control" id="inputNome">
        </div>
        <div class="form-group">
          <label for="inputEndereco">Endereco</label>
          <input type="text" class="form-control" id="inputEndereco">
        </div>
        <div class="form-group">
          <label for="inputTelefone">Telefone</label>
          <input type="text" class="form-control" id="inputTelefone">
        </div>
      </form>
</div>`

    document.getElementById("corpoFicha").innerHTML = html
    const btnGravar = document.querySelectorAll(".btnGravar")
    for (const btn of btnGravar) {
      btn.addEventListener("click", gravarAdocao)
    }
  })
  function adicionarParaAdocao() {
    console.log("fui chamado para adotar ")
    // Recuperar o id do animal
    let id = this.dataset.animal
    const that = this
    fetch("/animal/buscar/" + id)
      .then((r) => {
        return r.json()
      })
      .then((r) => {
        if (r.ok) {
          let lista = JSON.parse(localStorage.getItem("adocao") || "[]") // Parse e inicialização do carrinho como array
          lista.push(r.animal)
          localStorage.setItem("adocao", JSON.stringify(lista))

          that.innerHTML = '<i class="fas fa-check"></i> Animal adicionado!'
          setTimeout(() => {
            that.innerHTML = "<i class='fas fa-check'></i> Quero adotar"
          }, 3000)
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  function gravarAdocao() {
    let adocao = JSON.parse(localStorage.getItem("adocao")) || []
    let idAnimal = adocao.length > 0 ? adocao[0].animalId : null

    if (!idAnimal) {
      alert("Nenhum animal selecionado para adoção!")
      return
    }
    var inputNome = document.getElementById("inputNome")
    var inputEndereco = document.getElementById("inputEndereco")
    var inputTelefone = document.getElementById("inputTelefone")

    let data = {
      nome: inputNome.value,
      endereco: inputEndereco.value,
      telefone: inputTelefone.value,
      idAnimal: idAnimal,
    }

    fetch("/adotar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((r) => {
        return r.json()
      })
      .then((r) => {
        if (r.ok) {
          alert(r.msg)
          localStorage.removeItem("adocao")
          window.location.reload()
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
})
