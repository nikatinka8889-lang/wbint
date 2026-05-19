const cart = () => {
  const cartBtn = document.querySelector(".button-cart");
  const cartModal = document.getElementById("modal-cart");
  const btnModalClose = cartModal.querySelector(".modal-close");
  cartBtn.addEventListener("click", () => {
    if (cartModal.style.display === "none") {
      cartModal.style.display = "flex";
    } else {
      cartModal.style.display = "none";
    }
  });

  btnModalClose.addEventListener("click", () => {
    cartModal.style.display = "none";
  });
};
cart()
