function Carsadd(sequelize:any,DataTypes:any){
    const Cars:any = sequelize.define("Cars",{
        name: {
            type:DataTypes.STRING,
        },
        color:{
            type: DataTypes.STRING,
        },
        model: {
            type: DataTypes.STRING,
        },
        images: {
            type: DataTypes.STRING,
        },
    })
    return Cars
}
export default Carsadd;
