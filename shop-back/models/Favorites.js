import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';
import Users from './Users';
import ProductItems from './ProductItems';

class Favorites extends Model {

}

Favorites.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  // userId: {}
  // productId: {}

}, {
  sequelize,
  tableName: 'favorites',
  modelName: 'favorites',

});

Favorites.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'favorite_user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Users.hasMany(Favorites, {
  foreignKey: 'userId',
  as: 'user_favorite',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Favorites.belongsTo(ProductItems, {
  foreignKey: 'productId',
  as: 'favorite_product',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ProductItems.hasMany(Favorites, {
  foreignKey: 'productId',
  as: 'product_favorite',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default Favorites;
