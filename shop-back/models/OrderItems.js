import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';

import Orders from './Orders';
import ProductItems from './ProductItems';

class OrderItems extends Model {

}

OrderItems.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  // orderId: {},
  // productItemId: {},

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },

}, {
  sequelize,
  tableName: 'orderItems',
  modelName: 'orderItems',
});

OrderItems.belongsTo(Orders, {
  foreignKey: 'orderId',
  as: 'item_order',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Orders.hasMany(OrderItems, {
  foreignKey: 'orderId',
  as: 'order_item',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

OrderItems.belongsTo(ProductItems, {
  foreignKey: 'productItemId',
  as: 'order_productItem',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ProductItems.hasMany(OrderItems, {
  foreignKey: 'productItemId',
  as: 'productItem_order',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default OrderItems;
