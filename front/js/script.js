let kanapData = [];

const fetchKanaps = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (kanapData = data))
    .catch((error) => console.log(error));

  console.table(kanapData);
};

const kanapDisplay = async () => {
  await fetchKanaps();

  kanapData.map((kanap) => {
    const href = document.createElement("a");
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    href.setAttribute("href", "product.html?id=" + kanap._id);
    img.setAttribute("src", kanap.imageUrl);
    img.setAttribute("alt", kanap.altTxt);
    h3.className = "productName";
    p.className = "productDescription";

    h3.textContent = kanap.name;
    p.textContent = kanap.description;

    href.appendChild(article);
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);

    document.getElementById("items").appendChild(href);
  });
};

kanapDisplay();
