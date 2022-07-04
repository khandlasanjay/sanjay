import express, { Request, Response } from "express";
import multer from 'multer';


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
  

const fileStrogeEngine = multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'/home/manish/Practical_Programs/ts_crud/src/resource/xlsx')
      //cb(null,'/home/Practical_Programs/ts_crud/src/controller/');
  },
  filename:(req,file,cb)=>{
       console.log(file.originalname)
       cb(null,`${file.originalname}`)
       
     // cb(null,Date.now()+ "--" + file.originalname)
  }
})

const upload = multer({storage:fileStrogeEngine,fileFilter: excelFilter})


export default upload;