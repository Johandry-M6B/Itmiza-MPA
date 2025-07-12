import { API_URL } from "./main";


document.getElementById("product-form").addEventListener("submit", async (e) =>{
    e.preventDefault();

    const productData = {
        name: document.getElementById("product-name").value,
        price: parseFloat(document.getElementById("product-price").value),
        image: document.getElementById("product-image").value,
        size: document.getElementById("product-size").value,
        stock: parseInt(document.getElementById("product-stock").value)
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        });
        if(response.ok){
            alert("Product created successfully!");
            window.location.href = "../../index.html";
        }
    } catch (error) {
        console.error("Error creating product:", error);
    }
})