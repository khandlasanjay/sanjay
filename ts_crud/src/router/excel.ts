import express, { Request, Response } from "express";
const router = express();
import excelController from "../controller/excelController";
import db from '../models/connection';
import upload from "../middleware/upload";

const PdExcel=db.excel;
const excelClass=new excelController();

router.post('/pdf',upload.single("file"),excelClass.upload);
// router.post('/pdf',pdfclass.upload)

router.get('/getpdf',excelClass.getTutorials);

router.post('/converateXsls',excelClass.converateXsls);

router.post('/singleXsls/:id',excelClass.singleXsls);

router.post('/excelTopdf',excelClass.excelTopdf);

export default router;
