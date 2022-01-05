const displayOrderNumber = () => {
  orderId.textContent = localStorage.getItem("orderId");
  //   localStorage.clear();
  //   setTimeout(() => {
  //     document.location.href = "index.html";
  //   }, 5000);
};
displayOrderNumber();
