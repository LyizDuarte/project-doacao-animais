document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnBuscar").addEventListener("click", buscar)
  document
    .getElementById("btnExportarExcel")
    .addEventListener("click", exportarExcel)

  function exportarExcel() {
    console.log("Fui chamado para exportar por excel")
    var wb = XLSX.utils.table_to_book(document.getElementById("tbExcel"))
    XLSX.writeFile(wb, "animais-adotados.xlsx")
  }

  function buscar() {
    console.log("Fui chamado para filtrar")
    let objetoBusca = {}
    let termo = document.getElementById("inputBusca").value
    let tipoBusca = ""
    if (document.querySelector("input[name='tipoBusca']:checked")) {
      tipoBusca = document.querySelector(
        "input[name='tipoBusca']:checked"
      ).value
    }

    if (termo != "" && (tipoBusca == "numero" || tipoBusca == "animal")) {
      objetoBusca.termo = termo
      objetoBusca.tipoBusca = tipoBusca
    } else if (termo == "") {
      objetoBusca.termo = termo
    } else {
      alert("Escolha o tipo da busca!")
      return
    }

    fetch("/listar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objetoBusca),
    })
      .then((r) => {
        return r.json()
      })
      .then((r) => {
        console.log(r)
        if (r.lista.length > 0) {
          let html = ""
          for (let lista of r.lista) {
            html += `<tr>
                          <td>${lista.adocaoId}</td>
                          <td>${lista.animalNome}</td>
                          <td><img width="80" src="${
                            lista.animalImagem
                          }" /></td>
                          <td>${lista.animalDescricao}</td>
                          <td>${
                            lista.animalDisponivel ? "Disponível" : "Adotado"
                          }</td>
                          <td>${lista.adocaoNome}</td>
                          <td>${lista.adocaoEndereco}</td>
                          <td>${lista.adocaoTelefone}</td>
                      </tr>`
          }
          document.querySelector(".tabelaPedidos > tbody").innerHTML = html
        } else {
          alert("Nenhum item encontrado")
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
})
