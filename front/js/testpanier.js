const ajoutPanierBtn = document.getElementById("addToCart");
ajoutPanierBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const choixCouleur = document.getElementById("colors").value;
  const choixNombre = document.getElementById("quantity").value;
  const choixNom = document.querySelector("#title").textContent;
  const choixPrix = document.querySelector("#price").textContent;
  //-----
  let produitPanier = {
    name: choixNom,
    price: choixPrix,
    color: choixCouleur,
    quantity: choixNombre,
  };
  //-----
  const ajoutProduitLocalStorage = () => {
    produitEnregistreDansLocalStorage.push(produitPanier);
    localStorage.setItem(
      "produit",
      JSON.stringify(produitEnregistreDansLocalStorage)
    );
  };
  //-----
  let produitEnregistreDansLocalStorage = JSON.parse(
    localStorage.getItem("produit")
  );

  if (produitEnregistreDansLocalStorage) {
    ajoutProduitLocalStorage();
  } else {
    produitEnregistreDansLocalStorage = [];
    ajoutProduitLocalStorage();
  }
});
