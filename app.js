const result = document.getElementById("result");
const save = document.getElementById("save");
const open_moda = document.getElementById("open-modal");
const user_modal = document.getElementById("user-modal");
const close = document.getElementById("close");
let form = {};
let products = [];
let currentEditId = null;
let page = 1;
let prodactPages = 2;

let bestUrl = "http://localhost:3000/Prodact";
document.addEventListener("DOMContentLoaded", function () {
  open_moda.addEventListener("click", openMadal);
  save.addEventListener("click", saveProduct);
  document.getElementById("prev").addEventListener("click", function () {
    if (page !== 1) {
      page--;
      getProducts();
    }
  });
  document.getElementById("next").addEventListener("click", function () {
    page++;
    getProducts();
  });
  getProducts();
});
function openMadal() {
  toggelModal("block");
}
function handleChange(event) {
  const { name, value } = event.target;
  form = { ...form, [name]: value };
}

function toggelModal(status) {
  user_modal.style.display = status;
}

window.addEventListener("click", function (event) {
  if (event.target === user_modal) {
    toggelModal("none");
  }
});
async function saveProduct() {
  try {
    if (currentEditId) {
      const response = await fetch(`${bestUrl}/${currentEditId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(response);
    } else {
      const response = await fetch(`${bestUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(response);
    }
    getProducts();
    toggelModal("none");
  } catch (error) {
    console.log(error);
  }
}

async function getProducts() {
  try {
    const response = await fetch(`${bestUrl}`);
    products = await response.json();
    displayProduct();
  } catch (error) {
    console.log(error);
  }
}

function displayProduct() {
  result.innerHTML = "";
  const start = (page - 1) * prodactPages;
  const end = start + prodactPages;
  const paginationControls = products.slice(start, end);

  paginationControls.forEach((item, index) => {
    console.log(item);

    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.brand}</td>
        <td>${item.number}</td>
        <td>${item.color}</td>
        <td>
        <button class="btn btn-info mx-1" onclick="editProduct('${
          item.id
        }')"> <i class="fa-solid fa-pen"></i> </button>
        <button class="btn btn-danger" onclick="deleteProduct('${
          item.id
        }')"> <i class="fa-regular fa-trash-can"></i> </button>
        </td>
        `;
    result.appendChild(tr);
  });
  paginationUsers(filtered_users.length);
}

async function deleteProduct(id) {
  try {
    await fetch(`${bestUrl}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
}
function editProduct(id) {
  currentEditId = id;
  const product = products.find((p) => p.id === id);
  if (product) {
    form = { ...product };
    document.querySelector("input[name='name']").value = product.name || "";
    document.querySelector("input[name='price']").value = product.price || "";
    document.querySelector("select[name='brand']").value = product.brand || "";
    document.querySelector("input[name='number']").value = product.number || "";
    document.querySelector("input[name='color']").value = product.color || "";
    toggelModal("block");
  }
}





















































