function excelSchema(sequelize:any,DataTypes:any){
    const pdf:any = sequelize.define("excel",{
        No:  DataTypes.INTEGER,
        Name:  DataTypes.STRING,
        Age:  DataTypes.INTEGER,
        Address:DataTypes.STRING,
    })
    return pdf
}
export default excelSchema;

