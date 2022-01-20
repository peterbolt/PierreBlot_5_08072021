const fetchPrice = (id) => {
  fetch(`${productURL}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      result = data;
      return result;
    })
    .catch((error) => console.log(error));
};

const returnPrice = async (id) => {
  return await fetchPrice(id);
};
// Promise.resolve(fetchPrice(id)).then((result) => console.log(result));

const productURL = `http://localhost:3000/api/products`;

let productArray = JSON.parse(localStorage.getItem("panier"));

const produitsPanier = document.getElementById("cart__items");

//--- Gestion de l'affichage du panier
let structureProduitPanier = [];
for (i = 0; i < productArray.length; i++) {
  structureProduitPanier =
    structureProduitPanier +
    `
        <article class="cart__item" data-id="${
          productArray[i].id
        }" data-color="${productArray[i].color}">
            <div class="cart__item__img">
                <img src="${productArray[i].img}" alt="${productArray[i].alt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${productArray[i].name}</h2>
                <p>${productArray[i].color}</p>
                <p>${returnPrice(productArray[i].id)} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" data-id="${
                      productArray[i].id
                    }" data-color="${productArray[i].color}" value="${
      productArray[i].quantity
    }">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${
                      productArray[i].id
                    }" data-color="${productArray[i].color}">Supprimer</p>
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

//----- Controle du Formulaire
//-------Prenom
const validPrenom = function () {
  if (/^[A-Za-z\-]{3,20}$/.test(firstName.value)) {
    // firstNameErrorMsg.textContent = `Prénom valide`;
    return true;
  } else {
    firstNameErrorMsg.textContent = `Le prénom doit contenir entre 3 et 20 lettres et ne doit pas avoir de caractères spéciaux ou chiffres`;
    return false;
  }
};
//-------Nom
const validNom = function () {
  if (/^[A-Za-z\-]{3,20}$/.test(lastName.value)) {
    // lastNameErrorMsg.textContent = `Nom valide`;
    return true;
  } else {
    lastNameErrorMsg.textContent = `Le nom doit contenir entre 3 et 20 lettres et ne doit pas avoir de caractères spéciaux ou chiffres`;
    return false;
  }
};
//-------Adresse
const validAdresse = function () {
  if (/^[A-Za-z0-9\s]{5,100}$/.test(address.value)) {
    // addressErrorMsg.textContent = `Adresse valide`;
    return true;
  } else {
    addressErrorMsg.textContent = `L'adresse doit contenir entre 5 et 100 caractères et ne doit pas avoir de caractères spéciaux`;
    return false;
  }
};
//-------Ville
const validVille = function () {
  if (/^[A-Za-z\ ]{3,20}$/.test(city.value)) {
    // cityErrorMsg.textContent = `Ville valide`;
    return true;
  } else {
    cityErrorMsg.textContent = `La ville doit contenir entre 3 et 20 lettres et ne doit pas avoir de caractères spéciaux ou chiffres`;
    return false;
  }
};
//-------Email
const validEmail = function () {
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    // emailErrorMsg.textContent = `Email valide`;
    return true;
  } else {
    emailErrorMsg.textContent = `Erreur Email : Respectez les conventions (Exemple : john.doe@gmail.com)`;
    return false;
  }
};

//--- Gestion du formulaire
function getFormInfo() {
  let contact = {};
  let products = [];

  let userOrder = {
    contact,
    productArray,
  };

  let form = document.querySelector(".cart__order__form");

  form.firstName.addEventListener("change", () => {
    validPrenom();
  });
  form.lastName.addEventListener("change", () => {
    validNom();
  });
  form.address.addEventListener("change", () => {
    validAdresse();
  });
  form.city.addEventListener("change", () => {
    validVille();
  });
  form.email.addEventListener("change", () => {
    validEmail();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      validPrenom() &&
      validNom() &&
      validAdresse() &&
      validVille() &&
      validEmail()
    ) {
      for (let m = 0; m < productArray.length; m++) {
        products.push(productArray[m].id);
      }
      contact.firstName = firstName.value;
      contact.lastName = lastName.value;
      contact.address = address.value;
      contact.city = city.value;
      contact.email = email.value;

      localStorage.setItem("commande", JSON.stringify(userOrder));
      //--- POST
      let aEnvoyer = {
        contact,
        products,
      };

      const promise01 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aEnvoyer),
        mode: "cors",
        credentials: "same-origin",
      };

      fetch("http://localhost:3000/api/products/order", promise01)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          document.location.href = `confirmation.html?id=${data.orderId}`;
        });
    }
  });
}

calculTotal();
deleteItem();
changeQuantity();
getFormInfo();
