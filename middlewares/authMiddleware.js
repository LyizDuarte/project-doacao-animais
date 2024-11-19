const UsuarioModel = require("../models/usuarioModel");


class AuthMiddleware {

    async verificarUsuarioLogado(req, res, next) {
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            let usuarioId = req.cookies.usuarioLogado;
            let usuario = new UsuarioModel();
            usuario = await usuario.obter(usuarioId);
            if(usuario != null && usuario.usuarioAtivo == 1) {
                //o locals na resposta vai injetar a variavel usuarioLogado em todas as páginas que dependem do middleware para liberar o acesso
                res.locals.usuarioLogado = usuario;
                next();
                
            }
            else{
                res.redirect("/login");
            }
        }
        else{
            res.redirect("/login");
        }
    }

}

module.exports = AuthMiddleware;