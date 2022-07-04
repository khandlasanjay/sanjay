import pdfschema from "../models/tutorial.model";
import readXlsxFile from "read-excel-file";
import xlsx from "xlsx";
import express, { Request, Response, NextFunction } from "express";
// const publicPath:any = path.join(__dirname, "../../pdf");

export class pdfClass {

  public upload = async (req: Request, res: Response) => {
    const file = xlsx.readFile(
      "/home/sanjay/VSC/TypeScript/mongotoexcel-master/src/controller/"
       +
        req.file?.originalname
        
    );
    try {
      const sheets = file.SheetNames;
      const Agestring: any = [];
      const data: any = [];
      const duplicateData: any = [];

      const database = await pdfschema.find();
      let i = 0;
      for (i; i < sheets.length; i++) {
        const sheetname = sheets[i];
        const sheetData = xlsx.utils.sheet_to_json(file.Sheets[sheetname]);

        sheetData.forEach((a) => {
          data.push(a);
        });
      }

      if (database.length > 1) {
        data.forEach(async (l: any) => {
          database.forEach(async (d) => {
            if (typeof l.Age === "string") {
              Agestring.push(l);
            }

            if (
              l.No === d.No &&
              l.Name === d.Name &&
              l.Age === d.Age &&
              l.Address === d.Address
            ) {
              duplicateData.push(l);
            }
          });
        });
        //Find the modified String data into string

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
            const Pdfschema = new pdfschema({
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
      } else {
        data.forEach(async (element: any) => {
          if (typeof element.Age !== "string") {
            const Pdfschema = new pdfschema({
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
    } catch (error) {
      console.log(error);
    }
  };

  public getTutorials = (req: Request, res: Response) => {
    pdfschema
      .find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        err.message || "Soe error occurred while retriving tutorials";
      });
  };
}
