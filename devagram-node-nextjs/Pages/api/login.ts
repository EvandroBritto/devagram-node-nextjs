import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

export default (
    req : NextApiRequest,
    res : NextApiResponse
) => {
    if(req.method === 'POST') {
        const {login, senha} = req.body;
        
        if(login === 'admin@admin.com' &&
            senha === 'Admin@123'){
                res.status(200).json({msgn: 'Usuario autenticado com sucesso'})
            }
            return res.status(400).json ({erro: 'Usuario ou senha não encontrados'});
    }
    return res.status(405).json({erro: 'Metodo informado nao e valido'});
}