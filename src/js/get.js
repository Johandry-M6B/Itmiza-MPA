import { API_URL } from "./main";

let products = [];


export async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro al fetching products');
        }
        products = await response.json();
        showProduct();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("shoes-list").innerHTML = `
        <div class="error">Error loading products: ${error.message}</div>`;
        
    };
};

export async function showProduct() {
 const shoesList = document.getElementById("shoes-list")
 shoesList.innerHTML = ""

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("Current User:", currentUser);

  const isAdmin = currentUser && currentUser.role === "admin";
  console.log("Is Admin:", isAdmin);
  
  
  if (isAdmin) {
    shoesList.innerHTML += `
    <div class="admin-actions">
      <button class="btn btn-success" onclick="createProduct()">
        + Create New product
      </button>
    </div>
    `;
  }

 products.forEach((product) => {
    const colum = document.createElement("div");
    colum.className = "col-md-4 mb-4";

    const adminButton = isAdmin ? `
      <button class="btn btn-warning" onclick="editProduct(${product.id})">
        Edit
      </button>
      <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
        Delete
      </button>
    ` : `
      <button class="btn btn-primary" onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    `;

    colum.innerHTML = `
      <div class="card">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price.toFixed(2)}</p>
          <p class="card-text">Size: ${product.size}</p>
          <p class="card-text">Stock: ${product.stock}</p>
          <div class="d-flex justify-content-between">
            ${adminButton}  
            </div>
        </div>
      </div>
    `;
    shoesList.appendChild(colum);
 });

 window.editproduct = editproduct;
 window.deleteProduct = deleteProduct;
 window.createProduct = createProduct;

}

export function addToCart(productId) {
    console.log(`Product ${productId} added to cart`);
}

export async function editProduct(productId){
  alert(`Editing product with ID: ${productId}`);
  // Implement the edit functionality here
  window.location.href = `./edit-product.html?id=${productId}`;
} 

export async function deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
        try {
            const response = await fetch(`${API_URL}/${productId}  `, 
              {
                method: "DELETE"
              });

              if(response.ok){
                await loadProducts();
              }
        }catch (error){
          console.error("Error deleting product:", error);
        }
    }
}

export async function createProduct() {
    window.location.href = "/src/views/post.html";
}

document.addEventListener('DOMContentLoaded', loadProducts);