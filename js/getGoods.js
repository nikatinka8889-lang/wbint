const getGoods = async () => {
  const links = document.querySelectorAll(".navigation-link");

  const getData = async () => {
    const res = await fetch("../db/db.json");
    const data = await res.json();
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
  };
  links.forEach((link) => {
    console.log(link.textContent)
    link.addEventListener("click", (e) => {
      e.preventDefault();
      getData();
    });
  });
  const dataLocal = JSON.parse(localStorage.getItem("data"));
};

getGoods();
