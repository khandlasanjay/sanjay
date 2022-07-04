import express from 'express'
import { pdfClass } from '../controller/excel.controller'
import uploadfile from '../middlewares/upload'

const router = express()

const pdfclass = new pdfClass
router.post('/pdf',uploadfile.single("file"),pdfclass.upload)
// router.post('/pdf',pdfclass.upload)

router.get('/pdff',pdfclass.getTutorials)



export default router