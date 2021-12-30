let productArray = JSON.parse(localStorage.getItem("panier"));

const produitsPanier = document.getElementById("cart__items");

//--- Gestion de l'affichage du panier
let structureProduitPanier = [];
for (i = 0; i < productArray.length; i++) {
  structureProduitPanier =
    structureProduitPanier +
    `
        <article class="cart__item" data-id="${productArray[i].id}" data-color="${productArray[i].color}">
            <div class="cart__item__img">
                <img src="${productArray[i].img}" alt="${productArray[i].alt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${productArray[i].name}</h2>
                <p>${productArray[i].color}</p>
                <p>${productArray[i].price} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" data-id="${productArray[i].id}" data-color="${productArray[i].color}" value="${productArray[i].quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${productArray[i].id}" data-color="${productArray[i].color}">Supprimer</p>
                </div>
                </div>
            </div>
            </article>
    `;
  produitsPanier.innerHTML = structureProduitPanier;
}

//--- Gestion de la suppression
function deleteItem() {
  document.querySelectorAll(".deleteItem").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      for (let j = 0; j < productArray.length; j++) {
        if (
          productArray[j].id === e.target.dataset.id &&
          productArray[j].color === e.target.dataset.color
        ) {
          productArray.splice(j, 1);
          break;
        }
      }
      localStorage.setItem("panier", JSON.stringify(productArray));
      calculTotal();
      window.location.reload();
    });
  });
}

//--- Gestion du total
function calculTotal() {
  let prixProduitsPanier = [];
  let nombreProduitsPanier = [];
  let prixTotalProduit = [];

  for (let k = 0; k < productArray.length; k++) {
    prixTotalProduit.push(productArray[k].price * productArray[k].quantity);
    prixProduitsPanier.push(prixTotalProduit);
    nombreProduitsPanier.push(parseInt(productArray[k].quantity, 10));
  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let prixTotalPanier = prixTotalProduit.reduce(reducer, 0);
  let nombreTotalPanier = nombreProduitsPanier.reduce(reducer, 0);

  const affichageTotalPanier = `
    <div class="cart__price">
        <p>
        Total (<span id="totalQuantity">${nombreTotalPanier}</span> articles) :
        <span id="totalPrice">${prixTotalPanier}</span> €
        </p>
    </div>
`;
  produitsPanier.innerHTML = structureProduitPanier + affichageTotalPanier;
}

//--- Gestion de la modification de quantité
function changeQuantity() {
  document.querySelectorAll(".itemQuantity").forEach((btn) => {
    btn.addEventListener("change", (e) => {
      for (let l = 0; l < productArray.length; l++) {
        if (
          productArray[l].id === e.target.dataset.id &&
          productArray[l].color === e.target.dataset.color
        ) {
          productArray[l].quantity = e.target.value;
          localStorage.setItem("panier", JSON.stringify(productArray));
          calculTotal();
          window.location.reload();
          return;
        }
      }
    });
  });
}
calculTotal();
deleteItem();
changeQuantity();
