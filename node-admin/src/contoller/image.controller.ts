import {Request, Response} from "express";
import multer from "multer";
import {extname} from "path";

export const UploadImg = async (req: Request, res: Response) => {

    const storage = multer.diskStorage({
        destination: "./uploads/",
        filename(_, file, cb){
            const randomName = Math.random().toString(36).substring(2, 12);
            return cb(null, `${randomName}${Date.now()}${extname(file.originalname)}`);
        }
    })

    const upload = multer({storage}).single('image');

    upload(req, res, (err)=>{
        if(err){
            return res.status(400).send({error: err.message});
        }
        res.send({
            url:`http://localhost:8000/api/uploads/${req.file.filename}`
        });
    })
}