/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/

//  APIShop – G-uppgift
//  Hanterar beställning, formulär och orderbekräftelse

// Referens till Bootstrap-modaler (skapas när DOM är klar)
let orderModal;
let successModal;
 
// Öppna beställningsmodal
// Tar emot produktdata direkt från products.js
 
function openOrderModal(id, title, price, image) {
    document.getElementById("modal-product-img").src           = image;
    document.getElementById("modal-product-img").alt           = title;
    document.getElementById("modal-product-title").textContent = title;
    document.getElementById("modal-product-price").textContent = "$" + Number(price).toFixed(2);
    document.getElementById("field-product-id").value          = id;
 
    resetForm();
    orderModal.show();
}
 
// Hjälpfunktion – markera fält som ogiltigt
 
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
 
// Validera formuläret
 
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
 
    // Telefon: siffror, bindestreck och parenteser, max 20 tecken
    const phone = document.getElementById("field-phone").value.trim();
    const phonePattern = /^[0-9\-()\s]+$/;
    if (phone.length === 0 || !phonePattern.test(phone)) {
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
        return;
    }
 
    const name    = document.getElementById("field-name").value.trim();
    const street  = document.getElementById("field-street").value.trim();
    const zip     = document.getElementById("field-zip").value.trim();
    const city    = document.getElementById("field-city").value.trim();
    const product = document.getElementById("modal-product-title").textContent;
 
    orderModal.hide();
 
    document.getElementById("success-message").textContent =
        name + ', din beställning av "' + product + '" skickas till ' + street + ", " + zip + " " + city + ".";
 
    successModal.show();
}
 
// Rensa formuläret
 
function resetForm() {
    const form = document.getElementById("order-form");
 
    form.querySelectorAll(".form-control").forEach(function (field) {
        field.value = "";
        field.classList.remove("is-valid", "is-invalid");
    });
 
    form.querySelectorAll(".invalid-feedback").forEach(function (el) {
        el.textContent = "";
    });
}
 
// Initialisering
 
document.addEventListener("DOMContentLoaded", function () {
    orderModal   = new bootstrap.Modal(document.getElementById("orderModal"));
    successModal = new bootstrap.Modal(document.getElementById("successModal"));
 
    document.getElementById("submit-order").addEventListener("click", submitOrder);
});