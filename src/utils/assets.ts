import multer from "multer";
import multerS3 from "multer-s3";
import {S3Client , PutObjectCommand} from "@aws-sdk/client-s3"
import { config } from "./config";
import QRCode from "qrcode"

const s3Client = new S3Client({
    endpoint : config.spaceEndpoint,
    region : "sgp1",
    credentials : {
        accessKeyId : config.spaceAccessKeyId,
        secretAccessKey : config.spaceSecretAccessKey,
    },
})

export const uploadFile = multer({
    storage : multerS3({
        s3 : s3Client,
        bucket : "msquarefdc",
        acl : "public-read",
        key : (request , file , cb) => {
            cb(null , `foodie-pos/si-thu-naing/${Date.now()}_${file.originalname}`)
        }
    })
}).array("files" , 1 );

export const getQrCodeUrl = (companyId : number , tableId : number) => {
    return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/si-thu-naing/qrcode/companyId-${companyId}-tableId-${tableId}.png`;
}

export const generateLinkForQRCode = (companyId : number , tableId : number) => {
    return `${config.orderAppUrl}?companyId=${companyId}&tableId=${tableId}`;
}

export const qrCodeImageUpload = async (companyId : number , tableId : number) => {
    try {
        const qrImageData = await QRCode.toDataURL(generateLinkForQRCode(companyId , tableId));
        const input = {
            Bucket : "msquarefdc",
            Key  : `foodie-pos/si-thu-naing/qrcode/companyId-${companyId}-tableId-${tableId}`,
            ACL : "public-read",
            Body : Buffer.from(
                qrImageData.replace(/^data:image\/\w+;base64,/, ""),
                "base64"
            ),
        }
        // @ts-ignore
        const command = new PutObjectCommand(input)
        await s3Client.send(command);
    } catch (err) {
        console.log(err);
    }
}