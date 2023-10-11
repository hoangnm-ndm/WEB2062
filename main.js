const API = "http://localhost:3000/products";
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

let editingProductId = null;

function fetchProducts() {
  fetch(API)
    .then((response) => response.json())
    .then((products) => {
      productList.innerHTML = "";
      products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.innerHTML = `
          <div>
            <strong>Name:</strong> ${product.name} <br>
            <strong>Price:</strong> $${product.price} <br>
            <strong>Description:</strong> ${product.desc} <br>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
          </div>
          <hr>
        `;
        productList.appendChild(productItem);
      });
    });
}

function addProduct(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;

  const newProduct = {
    name,
    price,
    desc,
  };

  if (editingProductId) {
    // Update the product if editing
    fetch(`${API}/${editingProductId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then(() => {
        fetchProducts();
        productForm.reset();
        editingProductId = null;
      });
  } else {
    // Add a new product if not editing
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then(() => {
        fetchProducts();
        productForm.reset();
      });
  }
}

function editProduct(id) {
  editingProductId = id;

  fetch(`${API}/${id}`)
    .then((response) => response.json())
    .then((product) => {
      const nameInput = document.getElementById("name");
      const priceInput = document.getElementById("price");
      const descInput = document.getElementById("desc");

      nameInput.value = product.name;
      priceInput.value = product.price;
      descInput.value = product.desc;
    });
}

function deleteProduct(id) {
  const confirmDelete = confirm("Co muon xoa khong?");

  if (confirmDelete) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchProducts();
    });
  }
}

productForm.addEventListener("submit", addProduct);
fetchProducts();
