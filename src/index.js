document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch("db.json");
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        productsContainer.appendChild(productCard);
    });
}
