"use strict";
document.addEventListener('DOMContentLoaded', () => {

const allProductsUrl = './js/db.json';
const toggleNav = document.querySelector('.toggle-nav');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const closeBtn = document.querySelector('.sidebar-close');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.cart-close');
const toggleCartBtn = document.querySelector('.toggle-cart');
const featuredCenter = document.querySelector('.featured-center');
const cartItemCountDOM = document.querySelector('.cart-item-count');
const cartItemsDOM = document.querySelector('.cart-items');
const cartTotalDOM = document.querySelector('.cart-total');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.cart-checkout');
const loading = document.querySelector('.page-loading');

//fetch and load databsae
const fetchProducts = async () => {
    const response = await fetch(allProductsUrl).catch((err) => console.log(err));
    if (response) {
      return response.json();
    }
    return response;
};

const loadDb = async () => {
    const products = await fetchProducts();
    if (products) {
      // add products to the store
      setupStore(products);
      if (featuredCenter) {
        const featured = store.filter((product) => product.featured === true);
        display(featured, featuredCenter);
      }
      if (loading) {
        loading.style.display = 'none';
      }
    }
};
  
loadDb();

// setting storage and get item
const getStorageItem = (item) => {
    let storageItem = localStorage.getItem(item);
    if (storageItem) {
      storageItem = JSON.parse(localStorage.getItem(item));
    } else {
      storageItem = [];
    }
    return storageItem;
};
  
const setStorageItem = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item));
};

let store = getStorageItem('store');
let cart = getStorageItem('cart');

// setting the store
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id, company, image, price, name, featured,
    } = product;
    return { id, company, image, price, name, featured };
  });
  setStorageItem('store', store);
};

const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  return product;
};

// display products
const display = (products, element, filters) => {
    element.innerHTML = products
      .map((product) => {
        const { id, name, image, price } = product;
        return ` 
        <article class="product">
          <div class="product-container">
            <img src="${image}" class="product-img img" alt="${name}" />
            <div class="product-icons">
              <a href="${image}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${price}</h4>
          </footer>
        </article> `;
      })
      .join('');
  
    if (filters) return;
  
    element.addEventListener('click', function (e) {
      const parent = e.target.parentElement;
      if (parent.classList.contains('product-cart-btn')) {
        addToCart(parent.dataset.id);
      }
    });
};

// add to cart

const addToCartDOM = ({ id, name, price, image, amount }) => {
    const article = document.createElement('article');
    article.classList.add('cart-item');
    article.setAttribute('data-id', id);
    article.innerHTML = `
      <img src="${image}"
        class="cart-item-img"
        alt="${name}"
      />  
      <div>
        <h4 class="cart-item-name">${name}</h4>
        <p class="cart-item-price">${price}</p>
        <button class="cart-item-remove-btn" data-id="${id}">remove
        </button>
      </div>
      <div>
        <button class="cart-item-increase-btn" data-id="${id}">
          <i class="fas fa-chevron-up"></i>
        </button>
        <p class="cart-item-amount" data-id="${id}">${amount}</p>
        <button class="cart-item-decrease-btn" data-id="${id}">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
    `;
    cartItemsDOM.appendChild(article);
};

const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === +id);
  if (!item) {
    let product = findProduct(+id);
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    addToCartDOM(product);
  } else {
    const amount = increaseAmount(+id);
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
  }
  displayCartItemCount();
  displayCartTotal();
  setStorageItem('cart', cart);
  openCart();
};

// cart functionality

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total : $ ${total} `;
}

function displayCartItemsDOM() {
  [...cart].map((cartItem) => {
    addToCartDOM(cartItem);
  });
}

function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== +id);
}

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === +id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === +id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    // remove
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      element.parentElement.parentElement.remove();
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}

displayCartItemCount();
displayCartTotal();
displayCartItemsDOM();
setupCartFunctionality();


const openCart = () => {
  cartOverlay.classList.add('show');
};

//toggle nav & cart

toggleNav.addEventListener('click', () => {
    sidebarOverlay.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    sidebarOverlay.classList.remove('show');
});
toggleCartBtn.addEventListener('click', () => {
    cartOverlay.classList.add('show');
});
closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('show');
});
  
// modal checkout

const openModal =  () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    cartOverlay.classList.remove('show');
};
const closeModal =  () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', openModal);
}
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (event) {  
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
});