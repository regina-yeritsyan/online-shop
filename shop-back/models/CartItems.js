import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';
import ProductItems from './ProductItems';
import Cart from './Cart';

class CartItems extends Model {

}

CartItems.init({
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

  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0,
  },

  subTotalPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0,
  },

  // cartId: {}
  // productId

}, {
  sequelize,
  tableName: 'cartItems',
  modelName: 'cartItems',

});

CartItems.belongsTo(Cart, {
  foreignKey: 'cartId',
  as: 'cart_product',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Cart.hasMany(CartItems, {
  foreignKey: 'cartId',
  as: 'product_cart',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

CartItems.belongsTo(ProductItems, {
  foreignKey: 'productId',
  as: 'cartProduct',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ProductItems.hasMany(CartItems, {
  foreignKey: 'productId',
  as: 'productCart',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default CartItems;
