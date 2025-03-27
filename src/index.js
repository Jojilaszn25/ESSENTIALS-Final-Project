document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    document.getElementById("apply-filters").addEventListener("click", applyFilters);
    document.getElementById("search").addEventListener("input", searchProducts);
});

function fetchProducts() {
    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(data => displayProducts(data.products));
}

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

function applyFilters() {
    fetch("")
        .then(response => response.json())
        .then(data => {
            let filtered = data.products;
            const categories = Array.from(document.querySelectorAll(".filter-category:checked"))
                                    .map(input => input.value);
            if (categories.length > 0) {
                filtered = filtered.filter(p => categories.includes(p.category));
            }
            displayProducts(filtered);
        });
}

function searchProducts(event) {
    const query = event.target.value.toLowerCase();
    fetch("https://fearofgod.com/search?q=crewneck&type=product#")
        .then(response => response.json())
        .then(data => {
            const filtered = data.products.filter(p => p.name.toLowerCase().includes(query));
            displayProducts(filtered);
        });
}

function addToCart(name, price) {
    let cartCount = parseInt(document.getElementById("cart-count").textContent);
    document.getElementById("cart-count").textContent = cartCount + 1;
    alert(`${name} added to cart!`);
}
