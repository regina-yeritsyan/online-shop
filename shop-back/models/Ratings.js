import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';
import Users from './Users';
import Products from './Products';

class Ratings extends Model {

}

Ratings.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  // userId: {}
  // productId: {}

}, {
  sequelize,
  tableName: 'ratings',
  modelName: 'ratings',

});

Ratings.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user_rate',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Users.hasMany(Ratings, {
  foreignKey: 'userId',
  as: 'rate_user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Ratings.belongsTo(Products, {
  foreignKey: 'productId',
  as: 'rate_product',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Products.hasMany(Ratings, {
  foreignKey: 'productId',
  as: 'product_rate',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default Ratings;
