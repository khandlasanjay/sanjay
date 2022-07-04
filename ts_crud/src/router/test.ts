import express, { Request, Response } from "express";
const router = express();
import CarsController from "../controller/testController";
import db from '../models/connection';
import upload from "../middleware/upload";

const Cars=db.Cars;
const carClass=new CarsController();

router.get('/viewCars',carClass.viewCars);

router.post('/addCars',carClass.addCars);

router.get('/findOneCars/:id',carClass.findOneCars);

router.put('/updateCars/:id',carClass.updateCars);

router.delete('/deleteCars/:id',carClass.deleteCars);

router.post("/imageUpload",upload.single("image"),carClass.imageUpload);

router.get("/pdfGenerator",carClass.pdfGenerator);

export default router;

