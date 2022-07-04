import { Request, Response } from "express";
import db from "../models/connection";
import fs from "fs";
import PDFGenerator from "pdfkit";
const Cars=db.Cars;

class CarsController{

    public viewCars = async (req:Request, res:Response)=>{
        const cars = await Cars.findAll({ });
            const response = {  
                data:cars,
            }
            res.status(200).json(response)  
    }

    public addCars = async (req:Request, res:Response)=>{

        if (!req.file) {
            console.log("No file upload");
        } else {
            console.log(req.file.filename)
            const imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename

            const cars = req.body;
            
            await Cars.create({ images:imgsrc,...cars })
                .then((data:any)=> {
                    console.log(data);
                    res.status(200).send(data);
            })
                .catch((err:any)=> {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Cars."
                });
            });
        }
    };

    public findOneCars = async (req:Request, res:Response)=>{

        const id = req.params.id;

        const cars = await Cars.findByPk(id)
        const response = {  
            data:cars,
        }
        res.status(200).json(response) 
    }

    public updateCars = async (req:Request, res:Response)=>{

        const id = req.params.id;

        // Update the cars
        const cars = req.body;

        // update query
        await Cars.update(cars,{ where: { id : id } })
            .then((data:any)=> {
            res.status(200).json(data);
            })
            .catch((err:any)=> {
            res.status(500).send({
                message:
                err.message || "Some error occurred while updating the Cars."
            });
        });

    }

    public deleteCars = async (req:Request, res:Response)=>{

        const id  = req.params.id;

        // const cars = req.body;

        await Cars.destroy({ where:{ id: id}})
        .then((data:any) =>{
            res.status(200).json(data);
        })
        .catch((err:any) =>{
            res.status(500).json(err);
        })
    }

    public imageUpload = async (req:Request, res:Response)=>{
             
        if (!req.file) {
            console.log("No file upload");
        } else {
            console.log(req.file.filename)
            const imgsrc = 'http://127.0.0.1:8000/images/' + req.file.filename

            const cars = req.body;
            
            await Cars.create({ images:imgsrc,...cars })
                .then((data:any)=> {
                    console.log(data);
                    res.status(200).send(data);
            })
                .catch((err:any)=> {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Cars."
                });
            });
        }
    }

    public pdfGenerator = async (req:Request, res:Response)=>{
      
        // instantiate the library
        let theOutput = new PDFGenerator 
        //const cars = req.body;
        // pipe to a writable stream which would save the result into the same directory
        theOutput.pipe(fs.createWriteStream('CarsDocument.pdf'))
        
        const cars = await Cars.findAll({ });
            const response:any = {  
                data:cars,
            }
            
        theOutput.text(JSON.stringify(response));
        
        // write out file
        theOutput.end();
    }

};

export default CarsController;