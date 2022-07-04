import express from "express";
import bodyParser from "body-parser";
console.log("test")

const app = express();

const PORT = process.env.PORT || 8000;

import router from "./router/test";
import router1 from "./router/excel"
import db from './models/connection';

// const PORT = process.env.PORT || 8000;
//using boddy parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended:false }));
app.use('/Cars',router);
app.use('/Excel',router1);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
    })
})


module.exports=app;
