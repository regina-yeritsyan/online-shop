import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';
import Users from './Users';

class Cart extends Model {

}

Cart.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  totalQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },

}, {
  sequelize,
  tableName: 'cart',
  modelName: 'cart',

});

Cart.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'userCart',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Users.hasOne(Cart, {
  foreignKey: 'userId',
  as: 'cartUser',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default Cart;
