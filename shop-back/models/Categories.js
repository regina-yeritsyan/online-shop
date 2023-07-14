import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';

class Categories extends Model {

}

Categories.init({
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
  tableName: 'categories',
  modelName: 'categories',

});

export default Categories;
