const express = require("express")
const AdocaoController = require("../controllers/adocaoController")
const AuthMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()
let auth = new AuthMiddleware()

let controller = new AdocaoController()
router.get("/", controller.listarView)
router.get("/listar", auth.verificarUsuarioLogado, controller.adotadosView)
router.post("/adotar", controller.adotar)

module.exports = router
