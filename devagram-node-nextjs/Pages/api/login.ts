import type { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDb } from "../../midllewares/conectarMongoDb";
import type {respostaPadraoMsgn} from '../../types/respostaPadraoMsg';
import type {LoginResposta} from '../../types/LoginResposta';
import md5 from "md5";
import { UsuarioModel } from "@/Models/UsuarioModel";
import jwt from "jsonwebtoken";

const endPointLogin = async (
    req : NextApiRequest,
    res : NextApiResponse<respostaPadraoMsgn | LoginResposta >
) => {

    const {MINHA_CHAVE_JWT} = process.env;
    if (!MINHA_CHAVE_JWT){
        return res.status(500).json({erro : 'ENV Jwt nao informada'});
    }

    if(req.method === 'POST') {
        const {login, senha} = req.body;
        
        const usuariosEncontrados = await UsuarioModel.find ({email : login, senha :md5(senha)});    
        if(usuariosEncontrados && usuariosEncontrados.length >0){
            const usuarioEncontrado = usuariosEncontrados [0]

                const token = jwt.sign({_id :usuarioEncontrado._id}, MINHA_CHAVE_JWT);

                return res.status(200).json({
                    nome: usuarioEncontrado.nome,
                    email: usuarioEncontrado.email,
                    token})
            }
            return res.status(400).json ({erro: 'Usuario ou senha não encontrados'});
    }
    return res.status(405).json({erro: 'Metodo informado nao e valido'});
}

export default conectarMongoDb(endPointLogin);

