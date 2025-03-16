import { getLocalStorage, setLocalStorage } from "./utils.mjs"; // Import getLocalStorage
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Retrieve the existing cart or initialize an empty array
  const cart = getLocalStorage("so-cart") || [];
  // Add the new product to the cart
  cart.push(product);
  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
