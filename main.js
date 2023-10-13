const API = "http://localhost:3000/products";
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

let editingProductId = null;

async function fetchProducts() {
  try {
    const response = await fetch(API);
    const products = await response.json();

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
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function validateForm(name, price, desc) {
  if (name.length < 6) {
    alert("Ten san pham phai co it nhat 6 ky tu");
    return false;
  }

  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    alert("Gia san pham khong duoc nho hon 0");
    return false;
  }

  if (desc.length < 10) {
    alert("Mo ta san pham phai dai it nhat 10 ky tu");
    return false;
  }

  return true;
}

async function addProduct(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;

  // Validate the input data
  if (!validateForm(name, price, desc)) {
    return;
  }

  const newProduct = {
    name,
    price,
    desc,
  };

  if (editingProductId) {
    try {
      const response = await fetch(`${API}/${editingProductId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      await response.json();
      fetchProducts();
      productForm.reset();
      editingProductId = null;
    } catch (error) {
      console.error("Error updating product:", error);
    }
  } else {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      await response.json();
      fetchProducts();
      productForm.reset();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }
}

async function editProduct(id) {
  editingProductId = id;

  try {
    const response = await fetch(`${API}/${id}`);
    const product = await response.json();

    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const descInput = document.getElementById("desc");

    nameInput.value = product.name;
    priceInput.value = product.price;
    descInput.value = product.desc;
  } catch (error) {
    console.error("Lỗi khi update:", error);
  }
}

async function deleteProduct(id) {
  const confirmDelete = confirm("Bạn có chắc chắn muốn xóa không?");

  if (confirmDelete) {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }
}

productForm.addEventListener("submit", addProduct);
fetchProducts();
