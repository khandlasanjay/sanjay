import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";


const app = express();
const port = 8000;
const mazSize = 16 * 1024 * 1024; //16mb

const storage = multer.diskStorage({
  destination: function(req, file, cb)  {
    cb(null, "img");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },  
})


const upload = multer({
  storage, 
  fileFilter:function (req, file, cb)  {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Olnly .png .jpg and .jpeg format allowed !"));
    }
  },
  limits: { fileSize: mazSize },
}).single("file");

app.post("/uploadfile",function (req: Request, res: Response)  {
  upload(req,res, function(err) {
    if (err instanceof multer.MulterError) {
      res.send(err);
    } else if (err) {
      res.send(err);
    }
    console.log(req.file);
    //console.log("hi");
  });
});

app.listen(port, () => {
  console.log(`App is listing on Port ${port}`);
});
