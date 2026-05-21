const cart = () => {
  const cartBtn = document.querySelector(".button-cart");
  const cartModal = document.getElementById("modal-cart");
  const btnModalClose = cartModal.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector(".cart-table__goods");
  const modalForm = document.querySelector(".modal-form");
  const total = document.querySelector(".card-table__total");
  const nameInput = document.querySelector('[name="nameCustomer"]');
const phoneInput = document.querySelector('[name="phoneCustomer"]');
console.log(nameInput)
console.log(phoneInput)
const  sumTotal = ()=>{
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let sum = 0 
  cart.forEach(good=>{
    sum += good.price * good.count;
  })

  total.textContent = sum
}
  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.filter((good) => good.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    sumTotal()
  };


  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }

      return good;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    sumTotal()
  };

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((good) => {
      if (good.id === id && good.count > 1) {
        good.count--;
      }
      return good;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    sumTotal()
  };

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem("data"));
    const clickedGood = goods.find((item) => item.id === id);
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cart.some((good) => good.id === clickedGood.id)) {
      console.log("COOOOUUUUUUNT");
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }

        return good;
      });
    } else {
      console.log("aaaaaaaaaaaaaaaaa");
      clickedGood.count = 1;
      cart.push(clickedGood);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    sumTotal()
  };

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = "";
    goods.forEach((good) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${good.name}</td>
						<td>${good.price}$</td>
						<td><button class="cart-btn-minus">-</button></td>
						<td>${good.count}</td>
						<td><button class=" cart-btn-plus">+</button></td>
						<td>${+good.price * +good.count}</td>
						<td><button class="cart-btn-delete">x</button></td>
        `;

      cartTable.append(tr);
      tr.addEventListener("click", (e) => {
        if (e.target.classList.contains("cart-btn-minus")) {
          minusCartItem(good.id);

        } else if (e.target.classList.contains("cart-btn-plus")) {
          plusCartItem(good.id);

        } else if (e.target.classList.contains("cart-btn-delete"))
          deleteCartItem(good.id);

      });
    });
  };




  const sendForm = async () => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        cart: cartArray,
        name: nameInput.value,
        phone: phoneInput.value,
      }),
    });
    cartModal.style.display = "none";
  };

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendForm();
  });
  cartBtn.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    renderCartGoods(cartArray);
    sumTotal()

    if (cartModal.style.display === "none") {
      cartModal.style.display = "flex";
    } else {
      cartModal.style.display = "none";
    }
  });

  cartModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay")) {
      cartModal.style.display = "none";
    }
  });

  btnModalClose.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  if (goodsContainer) {
    goodsContainer.addEventListener("click", (e) => {
      if (e.target.closest(".add-to-cart")) {
        const buttonToCart = e.target.closest(".add-to-cart");
        const goodId = buttonToCart.dataset.id;
        addToCart(goodId);
        renderCartGoods(JSON.parse(localStorage.getItem("cart")));
        sumTotal()
      }
    });
  }
};
cart();
