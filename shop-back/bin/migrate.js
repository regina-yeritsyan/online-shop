import {
  Users,
  Brands,
  Cart,
  Products,
  Categories,
  ProductItems,
  CartItems,
  Ratings,
  Orders,
  OrderItems,
  Favorites,
} from '../models';

async function main() {
  for (const Model of [
    Users,
    Brands,
    Cart,
    Categories,
    Products,
    ProductItems,
    CartItems,
    Ratings,
    Orders,
    OrderItems,
    Favorites,

  ]) {
    console.log(Model);
    await Model.sync({ alter: true, logging: true });
  }

  process.exit();
}

main().catch(console.error);
