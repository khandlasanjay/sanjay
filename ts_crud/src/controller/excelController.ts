import pdfschema from "../models/excel";
import readXlsxFile from "read-excel-file";
import xlsx from "xlsx";
import express, { Request, Response, NextFunction } from "express";
import db from "../models/connection";
import ExcelJs from "exceljs";
const Pdf = db.excel

const Pdf1 = db.Pdfs

// const aspose:any = {};
// aspose.cells = require("aspose.cells");

class pdfClass{
  public upload = async (req:Request,res:Response)=>{ 
    const file = xlsx.readFile(
      "/home/manish/Practical_Programs/ts_crud/src/resource/xlsx/"
       +
        req.file?.originalname
    );
    try{
      const sheets = file.SheetNames;
      const Agestring:any = [];
      const data:any =[];
      const duplicateData :any = [];

      const database = await Pdf.findAll()
      for(let i=0;i<sheets.length;i++){
        const sheetname = sheets[i];
        const sheetData = xlsx.utils.sheet_to_json(file.Sheets[sheetname])

        sheetData.forEach((a)=>{
          data.push(a)
        })
      }
      if(database.length>1){
        data.forEach(async (l:any)=>{
          database.forEach(async (d:any)=>{
            if(typeof l.age === "string"){
              Agestring.push(l)
            }
            if(l.No === d.No && l.Name === d.Name && l.Age === d.Age && l.Address === d.Address){duplicateData.push(l)} 
          })
        })

        function getDifference(data: any, database: any) {
          return data.filter((object1: any) => {
            return !database.some((object2: any) => {
              return (
                object1.No === object2.No ||
                object1.Name === object2.Name ||
                object1.Age === object2.Age ||
                object1.Address === object2.Address
              );
            });
          });
        }
        const remaindata = getDifference(data, database);
        remaindata.forEach(async (r: any) => {
          if (typeof r.Age !== "number") {
            return res.json({
              message: "Only Number Required In Number ",
              data: r,
            });
          }
          if (typeof r.No !== "number") {
            return res.json({
              message: "Only Number Required In No ",
              data: r,
            });
          }
          if (typeof r.Name !== "string") {
            return res.json({
              message: "Only String Required In Name ",
              data: r,
            });
          }
          if (typeof r.Address !== "string") {
            return res.json({
              message: "Only String Required In Address",
              data: r,
            });
          } else {
            const Pdfschema = new Pdf({
              No: r.No,
              Name: r.Name,
              Age: r.Age,
              Address: r.Address,
            });
            await Pdfschema.save();
          }
        });
        return res.json({
          Agestring: Agestring[0],
          remaindata,
          duplicateData,
          data,
        });
      }else {
        data.forEach(async (element: any) => {
          if (typeof element.Age !== "string") {
            const Pdfschema = new Pdf({
              No: element.No,
              Name: element.Name,
              Age: element.Age,
              Address: element.Address,
            });
            await Pdfschema.save();
          } else {
            return res.json({
              message: "Only Number Required In Age",
              data: element,
            });
          }
        });
      }
      return res.status(200).json({
        message: "Data Inserted",
        data,
      });
    }catch(error){
      console.log(error)
    }
    // res.status(200).json("sanjay khandla")
  }

  public getTutorials = async (req: Request, res: Response) => {

   const displayCar = await Pdf.findAll({});

    res.status(200).json(displayCar)
  };

  public converateXsls = async (req: Request, res: Response) => {
    try{
        const Data = await Pdf.findAll()
        const workbook=new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet('abcd');
        worksheet.columns=[
          {header:'No',key:'No',width:10},
          {header:'Name',key:'Name',width:10},
          {header:'Age',key:'Age',width:10},
          {header:'Address',key:'Address',width:10},
      ];
  
      Data.forEach((Pdf:any)=>{
          worksheet.addRow(Pdf);
      })

      worksheet.getRow(1).eachCell((cell)=>{
          cell.font={bold:true};
      })

    const data1=await workbook.xlsx.writeFile('/home/manish/Practical_Programs/ts_crud/src/resource/xlsx/abcd.xlsx');
    res.status(200).json("ok");
    } catch(err){
    console.log(err);
   };
  };

  public singleXsls = async (req: Request, res: Response) => {
    try{
          
        const id = req.params.id;

        const Data = await Pdf.findByPk(id)
        // console.log(Data)
        const workbook=new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet('abcd');
        worksheet.columns=[
          {header:'No',key:'No',width:10},
          {header:'Name',key:'Name',width:10},
          {header:'Age',key:'Age',width:10},
          {header:'Address',key:'Address',width:10},
      ];
  
      worksheet.addRow(Data);
      // Data.forEach((Pdf:any)=>{
      //     worksheet.addRow(Pdf);
      // })

      worksheet.getRow(1).eachCell((cell)=>{
          cell.font={bold:true};
      })

    const data1=await workbook.xlsx.writeFile('/home/manish/Practical_Programs/ts_crud/src/resource/xlsx/single.xlsx');
    res.status(200).json("ok");
    } catch(err){
    console.log(err);
  };
 };

  public excelTopdf = async (req: Request, res: Response) => {

      // const workbook = aspose.cells.Workbook("/home/manish/Practical_Programs/ts_crud/src/resource/xlsx/single.xlsx");

      // // create and set PDF options
      // const pdfOptions = aspose.cells.PdfSaveOptions();
      // pdfOptions.setCompliance(aspose.cells.PdfCompliance.PDF_A_1_B);

      // // convert Excel to PDF
      // workbook.save("Excel to PDF - Compliance.pdf", pdfOptions);
  };

};

export default pdfClass

