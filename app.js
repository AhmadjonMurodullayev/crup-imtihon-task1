const result = document.getElementById("result");
const save = document.getElementById("save");
const open_moda = document.getElementById("open-modal");
const user_modal = document.getElementById("user-modal");
const close = document.getElementById("close");
let form = {};
let products = [];
let currentEditId = null;
let bestUrl = "http://localhost:3000/Prodact";
document.addEventListener("DOMContentLoaded", function () {
  open_moda.addEventListener("click", openMadal);
  save.addEventListener("click", saveProduct);
  getProducts()
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

// async function saveProdact() {
//   try {
//     const response = await fetch(`${bestUrl}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     });
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }


async function saveProduct() {
    try {
      if (currentEditId) {
        // Yangilanishi kerak bo'lgan mahsulot
        const response = await fetch(`${bestUrl}/${currentEditId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        console.log(response);
      } else {
        // Yangi mahsulot qo'shish
        const response = await fetch(`${bestUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        console.log(response);
      }
      getProducts(); // Mahsulotlar ro'yxatini yangilash
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
  products.forEach((item, index) => {
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
        <button class="btn btn-info mx-1" onclick="editProduct('${item.id}')"> <i class="fa-solid fa-pen"></i> </button>
        <button class="btn btn-danger" onclick="deleteProduct('${item.id}')"> <i class="fa-regular fa-trash-can"></i> </button>
        </td>
        `;
        result.appendChild(tr)
  });
}

async function deleteProduct(id){
    try{
            await fetch(`${bestUrl}/${id}`,{
                method: "DELETE"
            })
    }catch(error){
        console.log(error);
        
    }
}




function editProduct(id) {
    currentEditId = id;
    const product = products.find(p => p.id === id);
    if (product) {
      form = { ...product };
      document.querySelector("input[name='name']").value = product.name || '';
      document.querySelector("input[name='price']").value = product.price || '';
      document.querySelector("select[name='brand']").value = product.brand || '';
      document.querySelector("input[name='number']").value = product.number || '';
      document.querySelector("input[name='color']").value = product.color || '';
      toggelModal("block");
    }
  }

