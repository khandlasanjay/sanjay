import db from "./src/config/db.config";

import express from "express";
import router from "./src/routes/tutorial.routes";
import bodyParser, { urlencoded } from "body-parser";

const app = express();
const port = 8000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/", router);

db();
app.listen(port, () => console.log("App listing on " + port));
