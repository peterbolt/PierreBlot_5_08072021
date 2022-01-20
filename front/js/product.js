let productParams = new URLSearchParams(document.location.search); // Récupère les params de l'URL
let productID = productParams.get("id"); // Prends l'ID dans les params
const productURL = `http://localhost:3000/api/products/${productID}`; // retourne un nouvel URL avec l'ID

// Va chercher le produit avec l'ID correspondant
const fetchProduct = async () => {
  await fetch(productURL)
    .then((res) => res.json())
    .then((data) => {
      products = data;
    })
    .catch((error) => console.log(error));
};

// Affiche le produit sur la page produit
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
//---------------------------------------

// Ajout du produit au panier
const ajoutPanierBtn = document.getElementById("addToCart");
ajoutPanierBtn.addEventListener("click", (e) => {
  let productArray = [];
  const choixCouleur = document.getElementById("colors").value;
  const choixNombre = document.getElementById("quantity").value;
  const choixID = products._id;
  const choixNom = products.name;
  const choixPrix = products.price;
  const choixImg = products.imageUrl;
  const choixImgAltTxt = products.altTxt;
  //-----
  let produitPanier = {
    id: choixID,
    name: choixNom,
    price: choixPrix,
    color: choixCouleur,
    quantity: parseInt(choixNombre, 10),
    img: choixImg,
    alt: choixImgAltTxt,
  };
  //-----
  if (localStorage.getItem("panier")) {
    productArray = JSON.parse(localStorage.getItem("panier"));
    for (i = 0; i < productArray.length; i++) {
      if (
        produitPanier.id == productArray[i].id &&
        produitPanier.color == productArray[i].color
      ) {
        productArray[i].quantity =
          productArray[i].quantity + produitPanier.quantity;
        if (productArray[i].quantity > 100) {
          productArray[i].quantity = 100;
          alert("Le nombre d'articles selectionnés est trop important !");
        }
        localStorage.setItem("panier", JSON.stringify(productArray));
        return;
      }
    }
    productArray.push(produitPanier);
    localStorage.setItem("panier", JSON.stringify(productArray));
  } else {
    productArray.push(produitPanier);
    localStorage.setItem("panier", JSON.stringify(productArray));
  }
});
