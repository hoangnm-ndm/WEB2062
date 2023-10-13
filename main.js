const API = "http://localhost:3000/products";
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

let editingProductId = null;

const fetchProducts = async () => {
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
};

const validateForm = (name, price, desc) => {
  if (name.length < 6) {
    alert("Tên sản phẩm phải có ít nhất 6 ký tự");
    return false;
  }

  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    alert("Giá sản phẩm không được nhỏ hơn 0");
    return false;
  }

  if (desc.length < 10) {
    alert("Mô tả sản phẩm phải dài ít nhất 10 ký tự");
    return false;
  }

  return true;
};

const performAction = async (apiEndpoint, method, data) => {
  try {
    const response = await fetch(apiEndpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await response.json();
    fetchProducts();
    productForm.reset();
    editingProductId = null;
  } catch (error) {
    console.error(
      `Error ${method === "PUT" ? "updating" : "adding"} product:`,
      error
    );
  }
};

const addProduct = async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;

  if (!validateForm(name, price, desc)) {
    return;
  }

  const newProduct = { name, price, desc };

  const apiEndpoint = editingProductId ? `${API}/${editingProductId}` : API;
  const method = editingProductId ? "PUT" : "POST";

  await performAction(apiEndpoint, method, newProduct);
};

const editProduct = async (id) => {
  editingProductId = id;

  try {
    const response = await fetch(`${API}/${id}`);
    const product = await response.json();

    const { name, price, desc } = product;
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
    document.getElementById("desc").value = desc;
  } catch (error) {
    console.error("Lỗi khi cập nhật:", error);
  }
};

const deleteProduct = async (id) => {
  const confirmDelete = confirm("Bạn có chắc chắn muốn xóa không?");

  if (confirmDelete) {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }
};

productForm.addEventListener("submit", addProduct);
fetchProducts();
