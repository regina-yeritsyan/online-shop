import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';

import Users from './Users';

class Orders extends Model {

}

Orders.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  // userId: {},

  totalPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },

  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  paymentMethod: {
    type: DataTypes.ENUM('paypal', 'cash'),
    allowNull: false,
    defaultValue: 'cash',
  },

  paymentStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  status: {
    type: DataTypes.ENUM('completed', 'pending', 'canceled'),
    allowNull: false,
    defaultValue: 'pending',
  },

}, {
  sequelize,
  tableName: 'orders',
  modelName: 'orders',
});

Orders.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'order_user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Users.hasMany(Orders, {
  foreignKey: 'userId',
  as: 'user_order',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default Orders;
