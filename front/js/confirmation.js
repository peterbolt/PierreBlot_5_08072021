let orderParams = new URLSearchParams(document.location.search);

const displayOrderNumber = () => {
  orderId.textContent = orderParams.get("id");
  localStorage.clear();
  setTimeout(() => {
    document.location.href = "index.html";
  }, 5000);
};
displayOrderNumber();
