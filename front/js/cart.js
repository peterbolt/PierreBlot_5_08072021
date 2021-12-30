let productArray = JSON.parse(localStorage.getItem("panier"));

const produitsPanier = document.getElementById("cart__items");

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
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productArray[i].quantity}">
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

function deleteItem() {
  document.querySelectorAll(".deleteItem").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      for (let i = 0; i < productArray.length; i++) {
        if (
          productArray[i].id === e.target.dataset.id &&
          productArray[i].color === e.target.dataset.color
        ) {
          productArray.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("panier", JSON.stringify(productArray));
    });
    document.location.reload();
  });
}

deleteItem();
