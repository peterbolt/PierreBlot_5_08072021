let productParams = new URLSearchParams(document.location.search); // Récupère les params de l'URL
let productID = productParams.get("id"); // Prends l'ID dans les params
const productURL = `http://localhost:3000/api/products/${productID}`; // retourne un nouvel URL avec l'ID

const fetchProduct = async () => {
  await fetch(productURL)
    .then((res) => res.json())
    .then((data) => {
      products = data;
    })
    .catch((error) => console.log(error));
};

// fonction affiche le produit sur la page produit
const displayProduct = async () => {
  await fetchProduct();
  document.title = products.name; // ajoute le nom du produit dans l'onglet

  const img = document.createElement("img");
  const item_img = document.getElementsByClassName("item__img");

  img.setAttribute("src", products.imageUrl);
  img.setAttribute("alt", products.altTxt);

  item_img[0].appendChild(img);

  title.textContent = `${products.name}`;
  price.textContent = `${products.price}`;
  description.textContent = `${products.description}`;

  colors.innerHTML += products.colors
    .map(
      (color) =>
        `
      <option value="${color}">${color}</option>
      `
    )
    .join("");
};

function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

function addBasket(product) {
  let basket = getBasket();
  let foundProduct = basket.find((p) => p.id == product.id); // cherche le produit qui a le meme ID
  if (foundProduct != undefined) {
    foundProduct.quantity++;
  } else {
    product.quantity = 1;
    basket.push(product);
  }
  saveBasket(basket);
}

function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter((p) => p.id != product.id);
  saveBasket(basket);
}

function changeQuantity(product, quantity) {
  let basket = getBasket();
  let foundProduct = basket.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      removeFromBasket(foundProduct);
    } else {
      saveBasket(basket);
    }
  }
}

function getNumberProduct() {
  let number = 0;
  let basket = getBasket();
  for (let product of basket) {
    number += product.quantity;
  }
  return number;
}

function getTotalPrice() {
  let total = 0;
  let basket = getBasket();
  for (let product of basket) {
    total += product.quantity * product.price;
  }
  return total;
}

displayProduct();
