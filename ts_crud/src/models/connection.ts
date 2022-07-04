import { Sequelize,DataTypes} from "sequelize";
import Carsadd from "./test"; 
import excelSchema from "./excel";
// import Carsadd from "../controller/testController";

const sequelize = new Sequelize('Pdf_Create','sanjay','sAnjay@1234',{
    host: 'localhost',
    dialect:'mysql',
    logging: false, // true
    pool:{max:5,min:0,idle:10000},
});

sequelize.authenticate()
.then(()=> {
    console.log('connected');   
})
.catch(err => {
    console.log('error: ' + err.message);
})

var Cars:any;
var excel:any;

const db:any = {Sequelize,sequelize,Cars,excel};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Cars = Carsadd(sequelize,DataTypes);
db.excel = excelSchema(sequelize,DataTypes);

db.sequelize.sync().then(() =>{
    console.log("sync finished")
})

export default db;
