import mongoose,{connect} from "mongoose";


const db= async()=>{
    try {
        await connect("mongodb+srv://sanju:fozTg4SXxhvdB8kM@cluster0.cidcz.mongodb.net/PDF&EXCLE?retryWrites=true&w=majority")
        .then(()=>{
            console.log("Connected Succesfully");
            
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export default db