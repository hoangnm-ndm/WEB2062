document.getElementById("form");
const productList = document.getElementById("products");

const instance = axios.create({
	baseURL: "http://localhost:3000/products",
	headers: {
		"Content-Type": "application/json",
	},
});

let isEdit = "";

const fetchProducts = async () => {
	try {
		const { data } = await instance.get("/");
		console.log(data);
		if (productList) {
			showProducts(data);
		}
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
	isEdit = id;
	(async () => {
		try {
			const { data } = await instance.get(`/${id}`);
			const { title, price, description } = data;
			document.getElementById("title").value = title;
			document.getElementById("price").value = price;
			document.getElementById("description").value = description;
		} catch (error) {
			console.log(error);
		}
	})();
}

function submitProduct() {
	const title = document.getElementById("title").value;
	const price = document.getElementById("price").value;
	const description = document.getElementById("description").value;

	if (!title || !price || !description) {
		alert("Please fill out all fields");
		return;
	}

	if (price < 0) {
		alert("Price must be greater than 0");
		return;
	}

	const product = {
		title,
		price,
		description,
	};

	(async () => {
		try {
			if (isEdit) {
				await instance.put(`/${isEdit}`, product);
				isEdit = "";
				console.log("Edit product successful");
			} else {
				await instance.post("/", product);
				console.log("Created product successfully");
			}
		} catch (error) {
			console.log(error);
		}
	})();
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

document.getElementById("form").addEventListener("submit", (e) => {
	e.preventDefault();
	submitProduct();
});
