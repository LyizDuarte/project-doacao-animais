const express = require("express")
const AdocaoController = require("../controllers/adocaoController")

const router = express.Router()

let controller = new AdocaoController()
router.get("/", controller.listarView)
router.post("/adotar", controller.adotar)

module.exports = router
