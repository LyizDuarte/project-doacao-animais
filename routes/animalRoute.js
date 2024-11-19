const express = require("express")
const multer = require("multer")
const AuthMiddleware = require("../middlewares/authMiddleware")
const AnimalController = require("../controllers/animalController")

const animalRouter = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    //faz a chamada para salvar no diretório específicado
    cb(null, "public/img/animais")
  },
  filename(req, file, cb) {
    //última posição do array (extensão);
    let ext = file.originalname.split(".").pop()
    //novo nome do nosso arquivo
    let novoNome = Date.now().toString() + "." + ext
    cb(null, novoNome)
  },
})

let upload = multer({ storage })

let ctrl = new AnimalController()
let auth = new AuthMiddleware()
animalRouter.get("/", auth.verificarUsuarioLogado, ctrl.listarView)
animalRouter.get("/cadastrar", auth.verificarUsuarioLogado, ctrl.cadastrarView)
animalRouter.post(
  "/cadastrar",
  upload.single("imagem"),
  auth.verificarUsuarioLogado,
  ctrl.cadastrar
)

module.exports = animalRouter
