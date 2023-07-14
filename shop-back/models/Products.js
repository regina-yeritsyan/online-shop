import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';
import Brands from './Brands';
import Categories from './Categories';

class Products extends Model {

}

Products.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'name',
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    // type: DataTypes.DECIMAL(10, 2),
    type: DataTypes.DECIMAL,
    allowNull: false,
  },

  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },

  numRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  // categoryId: {},
  // brandId: {},

}, {
  sequelize,
  tableName: 'products',
  modelName: 'products',
});

Products.belongsTo(Brands, {
  foreignKey: 'brandId',
  as: 'product_brand',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Brands.hasMany(Products, {
  foreignKey: 'brandId',
  as: 'brand_product',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Products.belongsTo(Categories, {
  foreignKey: 'categoryId',
  as: 'product_category',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Categories.hasMany(Products, {
  foreignKey: 'categoryId',
  as: 'category_product',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default Products;
