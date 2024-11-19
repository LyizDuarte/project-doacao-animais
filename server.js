//importando os packages instalados
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const homeRoute = require('./routes/homeRoute');
const usuarioRoute = require("./routes/usuarioRoute");
const loginRoute = require("./routes/loginRoute");
const animalRoute = require("./routes/animalRoute");
const adocaoRoute = require("./routes/adocaoRoute");
const cookieParser = require("cookie-parser");
const AuthMiddleware = require('./middlewares/authMiddleware');
const app = express();
//configurando a nossa pasta public como o nosso repositorio de arquivos estáticos (css, js, imagens)
app.use(express.static(__dirname + "/public"))
//configuração das nossas views para utilizar a ferramenta EJS
app.set('view engine', 'ejs');
//Configuração de onde ficará nossas views
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configuração da nossa página de layout
app.set('layout', './layout');
app.use(expressLayouts);
app.use(cookieParser());

//definindo as rotas que o nosso sistema vai reconhecer através da url do navegador
app.use("/login", loginRoute);
app.use("/", adocaoRoute);

let auth = new AuthMiddleware();

app.use(auth.verificarUsuarioLogado);

app.use('/animal', animalRoute);
app.use('/home', homeRoute)
app.use("/usuarios", usuarioRoute);

//ponto de inicio do nosso servidor web
const server = app.listen('5001', function() {
    console.log('Servidor web iniciado');
});
