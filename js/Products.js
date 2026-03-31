/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/


//  APIShop – G-uppgift
//  Hämtar produkter från Fake Store API med DummyJSON som backup


const API_URL      = "https://fakestoreapi.com/products";
const FALLBACK_URL = "https://dummyjson.com/products?limit=20";

// Normalisera DummyJSON-produkter till samma format som Fake Store API
function normalizeDummyProduct(product) {
    return {
        id:    product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
    };
}

// Hämta produkter från API och rendera produktkorten
// Försöker först Fake Store API, faller tillbaka på DummyJSON om det misslyckas

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Kunde inte hämta produkter från API:et.");
        }

        const products = await response.json();

        // Dölj laddningsspinnern
        document.getElementById("loading").style.display = "none";

        renderProducts(products);

    } catch (error) {
        // Fake Store API är nere – försök med DummyJSON som backup
        console.warn("Fake Store API unavailable, switching to fallback...", error.message);

        try {
            const fallbackResponse = await fetch(FALLBACK_URL);

            if (!fallbackResponse.ok) {
                throw new Error("Backup-API:et svarade inte heller.");
            }

            const data = await fallbackResponse.json();
            const products = data.products.map(normalizeDummyProduct);

            // Dölj laddningsspinnern
            document.getElementById("loading").style.display = "none";

            // Visa en informationsruta om att backup-API används
            const banner = document.createElement("div");
            banner.className = "alert alert-warning text-center mb-0 rounded-0";
            banner.textContent = "Fake Store API is currently unavailable. Showing products from backup source.";
            document.querySelector("header").insertAdjacentElement("afterend", banner);

            renderProducts(products);

        } catch (fallbackError) {
            document.getElementById("loading").innerHTML =
                `<div class="alert alert-danger mx-auto" style="max-width:400px">
                    Could not load products. Both APIs are currently unavailable.
                 </div>`;
        }
    }
}

// Rendera produktkort i grid

function renderProducts(products) {
    const container = document.getElementById("products-container");

    products.forEach(product => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-3";

        // Trunkera långa titlar
        const shortTitle = product.title.length > 50
            ? product.title.substring(0, 47) + "..."
            : product.title;

        col.innerHTML = `
            <div class="card h-100">
                <div class="d-flex align-items-center justify-content-center p-3" style="height:200px;">
                    <img src="${product.image}"
                         class="card-img-top"
                         alt="${product.title}"
                         style="max-height:180px; max-width:100%; object-fit:contain;">
                </div>
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="card-title" style="font-size:0.9rem;">${shortTitle}</h5>
                    <p class="text-muted mt-auto mb-2">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary btn-sm"
                            onclick="openOrderModal(${product.id})">
                        Beställ
                    </button>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
}

// Initialisering när sidan är laddad

document.addEventListener("DOMContentLoaded", () => {
    // Hämta och visa produkter
    fetchProducts();
});