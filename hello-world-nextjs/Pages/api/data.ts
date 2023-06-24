import type {NextApiRequest, NextApiResponse} from "next";
import moment from "moment";

export default (req : NextApiRequest, res : NextApiResponse) => {
    res.status(200).json({ data : moment().format('DD/MM/YYYY HH:MM:SS')});
}