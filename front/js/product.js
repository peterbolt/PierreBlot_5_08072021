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

displayProduct();
