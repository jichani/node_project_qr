const idDom = document.getElementById("id");
const pwDom = document.getElementById("password");
const nameDom = document.getElementById("name");
const btn = document.getElementById("btn");

const joinFetch = () => {
  const id = idDom.value;
  const password = pwDom.value;
  const name = nameDom.value;

  console.log(id, password, name);
}

btn.addEventListener("click", joinFetch);