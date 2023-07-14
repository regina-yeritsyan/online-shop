import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';

class Brands extends Model {

}

Brands.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

}, {
  sequelize,
  tableName: 'brands',
  modelName: 'brands',

});

export default Brands;
