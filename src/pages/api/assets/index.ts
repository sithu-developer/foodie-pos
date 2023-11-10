// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { uploadFile } from "@/utils/assets"
import {Request , Response} from "express"

export const config = {  //
    api : {
        bodyParser : false
    }
}

export default function handler(
  req: Request,
  res: Response
) {
    try {
        uploadFile(req , res , (error) => {
            if(error) {
                return res.status(500).send("Internal server error1");
            }
            const files = req.files as Express.MulterS3.File[];
            const file = files[0];
            const assetUrl = file.location;
            res.status(200).json({ assetUrl });
        })
    } catch (err) {
        res.status(500).send("Internal server error2")
    }
}
