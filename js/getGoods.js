const getGoods = async () => {
  const links = document.querySelectorAll(".navigation-link");
  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector(".long-goods-list");
    goodsContainer.innerHTML = ''
    goods.forEach((good) => {
      const goodBlock = document.createElement("div");
      goodBlock.classList.add("col-lg-3");
      goodBlock.classList.add("col-sm-6");
      goodBlock.innerHTML = `
        <div class="goods-card">
						<span class="label ${good.label ? null : 'd-none' }">${good.label}</span>
            <img src="db/${good.img}" alt="${good.name}" class="goods-image">
						<h3 class="goods-title">${good.name}</h3>
						<p class="goods-description">${good.description}</p>
						<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
						<span class="button-price">$${good.price}</span>
						</button>
					</div>
        `;

        goodsContainer.append(goodBlock)
      console.log(good.name);
    });
  };
  //render
  const getData = async (category, value) => {
    const res = await fetch("../db/db.json");
    const data = await res.json();
    const arr = category
      ? data.filter((item) => item[category] == value)
      : data;
    console.log("arr", arr);

    localStorage.setItem("data", JSON.stringify(arr));
    if (window.location.pathname !== "./goods.html") {
      window.location.href = "./goods.html";
    } else {
      renderGoods(arr);
    }
  };
  //getData

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;
      console.log(linkValue, category);
      getData(category, linkValue);
    });
  });
  //link

  if (
    localStorage.getItem("data") &&
    window.location.pathname === "./goods.html"
  ) {
    renderGoods(JSON.parse(localStorage.getItem("data")));
  }
  //local
};

getGoods();
