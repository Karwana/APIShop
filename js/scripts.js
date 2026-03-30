/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/


//  APIShop – G-uppgift
//  Hämtar produkter från Fake Store API och hanterar beställning


const API_URL = "https://fakestoreapi.com/products";

// Referens till Bootstrap-modaler (skapas när DOM är klar)
let orderModal;
let successModal;

// Hämta produkter från API och rendera produktkorten

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
        document.getElementById("loading").innerHTML =
            `<div class="alert alert-danger mx-auto" style="max-width:400px">
                Fel: ${error.message}
             </div>`;
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


// Öppna beställningsmodal för vald produkt

async function openOrderModal(productId) {
    try {
        const response = await fetch(`${API_URL}/${productId}`);
        const product = await response.json();

        // Fyll i produktinfo i modalen
        document.getElementById("modal-product-img").src = product.image;
        document.getElementById("modal-product-img").alt = product.title;
        document.getElementById("modal-product-title").textContent = product.title;
        document.getElementById("modal-product-price").textContent = `$${product.price.toFixed(2)}`;
        document.getElementById("field-product-id").value = product.id;

        // Rensa eventuella gamla formulärfel
        resetForm();

        orderModal.show();

    } catch (error) {
        alert("Kunde inte hämta produktinformation. Försök igen.");
    }
}


// Validering av formulärfält


// Hjälpfunktion – markera fält som ogiltigt med meddelande

function setInvalid(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    error.textContent = message;
    return false;
}

// Hjälpfunktion – markera fält som giltigt
function setValid(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");
    return true;
}

function validateForm() {
    let isValid = true;

    // Namn: min 2, max 50 tecken
    const name = document.getElementById("field-name").value.trim();
    if (name.length < 2) {
        setInvalid("field-name", "error-name", "Namnet måste vara minst 2 tecken.");
        isValid = false;
    } else if (name.length > 50) {
        setInvalid("field-name", "error-name", "Namnet får vara max 50 tecken.");
        isValid = false;
    } else {
        setValid("field-name");
    }

    // E-post: måste innehålla @, max 50 tecken
    const email = document.getElementById("field-email").value.trim();
    if (!email.includes("@")) {
        setInvalid("field-email", "error-email", "E-postadressen måste innehålla @.");
        isValid = false;
    } else if (email.length > 50) {
        setInvalid("field-email", "error-email", "E-postadressen får vara max 50 tecken.");
        isValid = false;
    } else {
        setValid("field-email");
    }

    // Telefon: siffror, bindestreck, parenteser. max 20 tecken
    const phone = document.getElementById("field-phone").value.trim();
    const phonePattern = /^[0-9\-()\s]+$/;
    if (!phonePattern.test(phone) || phone.length === 0) {
        setInvalid("field-phone", "error-phone", "Telefonnumret får bara innehålla siffror, bindestreck och parenteser.");
        isValid = false;
    } else if (phone.length > 20) {
        setInvalid("field-phone", "error-phone", "Telefonnumret får vara max 20 tecken.");
        isValid = false;
    } else {
        setValid("field-phone");
    }

    // Gatuadress: min 2, max 50 tecken
    const street = document.getElementById("field-street").value.trim();
    if (street.length < 2) {
        setInvalid("field-street", "error-street", "Gatuadressen måste vara minst 2 tecken.");
        isValid = false;
    } else if (street.length > 50) {
        setInvalid("field-street", "error-street", "Gatuadressen får vara max 50 tecken.");
        isValid = false;
    } else {
        setValid("field-street");
    }

    // Postnummer: exakt 5 siffror
    const zip = document.getElementById("field-zip").value.trim();
    const zipPattern = /^\d{5}$/;
    if (!zipPattern.test(zip)) {
        setInvalid("field-zip", "error-zip", "Postnumret måste vara exakt 5 siffror.");
        isValid = false;
    } else {
        setValid("field-zip");
    }

    // Ort: min 2, max 20 tecken
    const city = document.getElementById("field-city").value.trim();
    if (city.length < 2) {
        setInvalid("field-city", "error-city", "Orten måste vara minst 2 tecken.");
        isValid = false;
    } else if (city.length > 20) {
        setInvalid("field-city", "error-city", "Orten får vara max 20 tecken.");
        isValid = false;
    } else {
        setValid("field-city");
    }

    return isValid;
}


// Skicka beställning

function submitOrder() {
    if (!validateForm()) {
        return; // Stoppa om validering misslyckas
    }

    // Hämta värden
    const name    = document.getElementById("field-name").value.trim();
    const email   = document.getElementById("field-email").value.trim();
    const phone   = document.getElementById("field-phone").value.trim();
    const street  = document.getElementById("field-street").value.trim();
    const zip     = document.getElementById("field-zip").value.trim();
    const city    = document.getElementById("field-city").value.trim();
    const product = document.getElementById("modal-product-title").textContent;

    // Stäng beställningsmodalen
    orderModal.hide();

    // Visa bekräftelsemeddelande
    document.getElementById("success-message").textContent =
        `${name}, din beställning av "${product}" skickas till ${street}, ${zip} ${city}.`;

    successModal.show();
}


// Rensa formuläret (vid ny öppning av modal)

function resetForm() {
    const form = document.getElementById("order-form");
    const fields = form.querySelectorAll(".form-control");

    fields.forEach(field => {
        field.value = "";
        field.classList.remove("is-valid", "is-invalid");
    });

    // Rensa felmeddelanden
    form.querySelectorAll(".invalid-feedback").forEach(el => el.textContent = "");
}


// Initialisering när sidan är laddad

document.addEventListener("DOMContentLoaded", () => {
    // Skapa Bootstrap modal-instanser
    orderModal   = new bootstrap.Modal(document.getElementById("orderModal"));
    successModal = new bootstrap.Modal(document.getElementById("successModal"));

    // Koppla knappen "Lägg beställning" till submitOrder
    document.getElementById("submit-order").addEventListener("click", submitOrder);

    // Hämta och visa produkter
    fetchProducts();
});