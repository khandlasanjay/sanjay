import { Request, Response, NextFunction } from "express";
import multer from "multer";

const excelFilter = async (req: Request, file: any, cb: any) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "/home/hardik/hardik/Friends Help Program/NisargBhaiPrograms/src/controller");
    cb(null,"/home/sanjay/VSC/TypeScript/mongotoexcel-master/src/controller/"
    );
  },
  filename: (req, file, cb) => {
    console.log("From Multer" +file.originalname);
    // cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
    cb(null, `${file.originalname}`);
  },
});
const uploadfile = multer({ storage: storage, fileFilter: excelFilter });

export default uploadfile;
