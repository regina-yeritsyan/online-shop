import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';
import Products from './Products';

class ProductItems extends Model {

}

ProductItems.init({

  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },

  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active',
  },

  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // productId: {},

}, {
  sequelize,
  tableName: 'productItems',
  modelName: 'productItems',
});

ProductItems.belongsTo(Products, {
  foreignKey: 'productId',
  as: 'product_item',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Products.hasMany(ProductItems, {
  foreignKey: 'productId',
  as: 'item_products',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Products.hasOne(ProductItems, {
  foreignKey: 'productId',
  as: 'item_product',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default ProductItems;
