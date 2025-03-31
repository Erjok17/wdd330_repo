import { setLocalStorage, getLocalStorage } from "../js/utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}" />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details
    this.product = await this.dataSource.findProductById(this.productId);
    
    // Render product details
    this.renderProductDetails("main");

    // Add event listener to "Add to Cart" button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    let cartItems = getLocalStorage("so-cart") || [];

    // Ensure cartItems is an array
    if (!Array.isArray(cartItems)) {
      console.error("cartItems was not an array. Fixing it...");
      cartItems = [cartItems]; // Convert to array
    }

    // Add the current product to the cart
    cartItems.push(this.product);

    // Save back to localStorage
    setLocalStorage("so-cart", cartItems);

    // Debugging: Check if items are correctly added
    console.log("Updated Cart:", cartItems);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
  }
}
