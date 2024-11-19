document.addEventListener("DOMContentLoaded", function() {

    var modalAdocao = document.getElementById('modalAdocao')

    modalAdocao.addEventListener('show.bs.modal', function (event) {
        console.log("modal abriu")
    })
})