const productForm = document.getElementById("form");
const productList = document.getElementById("products");

const instance = axios.create({
	baseURL: "http://localhost:3000/products",
	headers: {
		"Content-Type": "application/json",
	},
});

const fetchProducts = async () => {
	try {
		const { data } = await instance.get("/");
		console.log(data);
		showProducts(data);
	} catch (error) {
		console.error("Error fetching products:", error);
	}
};

const showProducts = (data) => {
	productList.innerHTML = "";
	data.forEach((item) => {
		const tr = document.createElement("tr");
		tr.innerHTML = /*html */ `
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.price}</td>
      <td>${item.description}</td>
      <td>
        <button class="btn btn-warning" onClick="editProduct(${item.id})">Edit</button>
        <button class="btn btn-danger" onClick="deleteProduct(${item.id})">Delete</button>
      </td>
    `;
		productList.appendChild(tr);
	});
};

function editProduct(id) {
	console.log(id);
}

async function deleteProduct(id) {
	try {
		if (confirm("Are you sure you want to delete this product?")) {
			await instance.delete(`/${id}`);
			window.location.reload();
		}
	} catch (error) {
		console.error("Error deleting product:", error);
	}
}

fetchProducts();
