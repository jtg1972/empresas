import Sequelize from 'sequelize'

      class Alimentos extends Sequelize.Model{

        	static init(sequelize,DataTypes){

          		return super.init({
		 grasas:DataTypes.INTEGER,
		 proteinas:DataTypes.INTEGER,
		 colesterol:DataTypes.INTEGER},{sequelize})
}}
export default Alimentos