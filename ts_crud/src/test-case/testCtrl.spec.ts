// const chai = require('chai');
import chai, {request} from "chai"
const app= require("../app")
const assert = chai.assert;
const should = require('chai').should();
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('---Aspect Test---',function() {
    it("ViewCars",async()=>{
        const response:any = await chai.request(app).get("/Cars/viewCars");
        // console.log(response);
        expect(response.status).to.be.eq(200)
    }) 

    

});

describe('---Aspect Test---',function() {
    it("addCars",async()=>{
        const response:any = await chai.request(app).post("/Cars/addCars").send({
            "name":"oddi",
            "color":"black",
            "model" : "1.2"
        
        });
        // console.log(response);
        expect(response.status).to.be.eq(200)
    }) 

});
