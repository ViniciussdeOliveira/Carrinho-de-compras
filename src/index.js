import createItem from "./services/item.js"
import * as cartService from "./services/cart.js"

const cart = [];

console.log("Welcome to the your Shopping Cart!");

const item1 = await createItem("Booster Pack Pokemon", 10.99, 5);
const item2 = await createItem("Booster Pack YuGiOh", 13.50, 10);
const item3 = await createItem("Booster Pack One Piece", 20.89, 3);

await cartService.addItem(cart, item1);
await cartService.addItem(cart, item2);
await cartService.addItem(cart, item3);

await cartService.removeItem(cart, item3);

await cartService.displayCart(cart);

await cartService.calculateTotal(cart);