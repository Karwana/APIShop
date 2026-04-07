/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/

//  APIShop – G-uppgift
//  Hämtar produkter från Fake Store API med DummyJSON som backup och statisk lista som sista utväg

const API_URL = "https://fakestoreapi.com/products";
const BACKUP_URL = "https://dummyjson.com/products?limit=12";

// Statisk backup – används om båda API:er är nere
const STATIC_PRODUCTS = [
    { id: 1, title: "Fjallraven Foldsack Backpack", price: 109.95, image: "img/1.jpg" },
    { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts", price: 22.30,image: "img/2.jpg" },
    { id: 3, title: "Mens Cotton Jacket", price: 55.99, image: "img/3.jpg" },
    { id: 4, title: "Mens Casual Slim Fit", price: 15.99, image: "img/4.jpg" },
    { id: 5, title: "John Hardy Women's Legends Naga Gold", price: 695.00, image: "img/5.jpg" },
    
];


// Visa skeleton-kort direkt när sidan laddas

function showSkeletons() {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    for (let i = 0; i < 16; i++) {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-3";
        col.innerHTML = `
            <div class="card h-100">
                <div class="skeleton skeleton-img"></div>
                <div class="card-body text-center">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-price"></div>
                    <div class="skeleton skeleton-btn"></div>
                </div>
            </div>
        `;
        container.appendChild(col);
    }
}

// Ersätt skeletons med riktiga produktkort

function renderProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    products.forEach(function (product) {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-3";

        const shortTitle = product.title.length > 50
            ? product.title.substring(0, 47) + "..."
            : product.title;

        col.innerHTML = `
            <div class="card h-100">
                <div class="d-flex align-items-center justify-content-center p-3" style="height:200px;">
                    <img src="${product.image}"
                         alt="${product.title}"
                         style="max-height:180px; max-width:100%; object-fit:contain;">
                </div>
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="card-title" style="font-size:0.9rem;">${shortTitle}</h5>
                    <p class="text-muted mt-auto mb-2">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary btn-sm order-btn">Beställ</button>
                </div>
            </div>
        `;

        // Koppla beställningsknappen – addEventListener undviker problem med specialtecken
        const btn = col.querySelector(".order-btn");
        btn.addEventListener("click", function () {
            openOrderModal(product.id, product.title, product.price, product.image);
        });

        container.appendChild(col);
    });
}

// Hämta produkter

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("API svarade med ett fel.");
        }

        const products = await response.json();
        renderProducts(products);

    } catch (error) {
        // Fake Store är nere – försök med backup
        console.warn("Fake Store API otillgängligt, försöker backup...", error.message);
        fetchBackup();
    }
}

// Hämta från backup-API

async function fetchBackup() {
    try {
        const response = await fetch(BACKUP_URL);

        if (!response.ok) {
            throw new Error("Backup-API svarade också med ett fel.");
        }

        const data = await response.json();
        const products = data.products.map(normalizeProduct);

        showBanner("Fake Store API är otillgängligt. Visar produkter från backup.", "warning");
        renderProducts(products);

    } catch (error) {
        // Båda API:er nere – använd statisk lista
        console.warn("Backup-API otillgängligt, använder statisk lista...", error.message);
        useStaticFallback();
    }
}

// Statisk fallback – sista utvägen

function useStaticFallback() {
    showBanner("Båda API:erna är otillgängliga. Visar ett begränsat urval produkter.", "danger");
    renderProducts(STATIC_PRODUCTS);
}

// Normalisera DummyJSON till samma format som Fake Store

function normalizeProduct(p) {
    return {
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.thumbnail
    };
}

// Visa banner

function showBanner(message, type) {
    const banner = document.createElement("div");
    banner.className = "alert alert-" + type + " text-center mb-0 rounded-0";
    banner.textContent = message;
    document.querySelector("header").insertAdjacentElement("afterend", banner);
}

// Initialisering

document.addEventListener("DOMContentLoaded", function () {
    showSkeletons();
    fetchProducts();
});

// Fallback vid omladdning – DOMContentLoaded triggar inte alltid vid reload
window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        showSkeletons();
        fetchProducts();
    }
});