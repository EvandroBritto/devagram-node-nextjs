import type { NextApiRequest, NextApiResponse } from "next";
import { validarTokenJWT } from "@/midllewares/validarTokenJWT";
import { json } from "stream/consumers";

const usuarioEndpoint = (req: NextApiRequest, res : NextApiResponse) => {
    return res.status(200).json('Usuario autenticado com sucesso');
}

export default validarTokenJWT(usuarioEndpoint);

