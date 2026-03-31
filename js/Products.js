/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/

//  APIShop – G-uppgift
//  Hämtar produkter från Fake Store API med DummyJSON som backup

const API_URL    = "https://fakestoreapi.com/products";
const BACKUP_URL = "https://dummyjson.com/products?limit=20";
 
// Hämta produkter
 
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
 
        if (!response.ok) {
            throw new Error("API svarade med ett fel.");
        }
 
        const products = await response.json();
 
        document.getElementById("loading").style.display = "none";
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
 
        const data     = await response.json();
        const products = data.products.map(normalizeProduct);
 
        document.getElementById("loading").style.display = "none";
        showBackupBanner();
        renderProducts(products);
 
    } catch (error) {
        document.getElementById("loading").innerHTML =
            `<div class="alert alert-danger mx-auto" style="max-width:400px">
                Kunde inte ladda produkter. Båda API:erna är otillgängliga.
             </div>`;
    }
}
 
// Normalisera DummyJSON till samma format som Fake Store
 
function normalizeProduct(p) {
    return {
        id:    p.id,
        title: p.title,
        price: p.price,
        image: p.thumbnail
    };
}
 
// Visa varningsbanner när backup används
 
function showBackupBanner() {
    const banner = document.createElement("div");
    banner.className   = "alert alert-warning text-center mb-0 rounded-0";
    banner.textContent = "Fake Store API är otillgängligt. Visar produkter från backup.";
    document.querySelector("header").insertAdjacentElement("afterend", banner);
}
 
// Rendera produktkort
 
function renderProducts(products) {
    const container = document.getElementById("products-container");
 
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
 
// Initialisering
 
document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});
 