// Markera fält som ogiltigt med felmeddelande
function setInvalid(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    error.textContent = message;
    return false;
}

// Markera fält som giltigt
function setValid(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");
    return true;
}

// Funktion för att validera hela formuläret
function validateContactForm() {
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    if (name.length < 2) {
        setInvalid("name", "error-name", "Namnet måste vara minst 2 tecken.");
        isValid = false;
    } else {
        setValid("name");
    }

    const email = document.getElementById("email").value.trim();
    if (!email.includes("@") || !email.includes(".")) {
        setInvalid("email", "error-email", "Vänligen ange en giltig e-postadress.");
        isValid = false;
    } else {
        setValid("email");
    }

    const subject = document.getElementById("subject").value.trim();
    if (subject.length < 2) {
        setInvalid("subject", "error-subject", "Ämnet måste vara minst 2 tecken.");
        isValid = false;
    } else {
        setValid("subject");
    }

    const message = document.getElementById("message").value.trim();
    if (message.length < 10) {
        setInvalid("message", "error-message", "Meddelandet är för kort. Skriv minst 10 tecken (du har skrivit " + message.length + ").");
        isValid = false;
    } else {
        setValid("message");
    }

    return isValid;
}

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();
        if (validateContactForm()) {
            contactForm.style.display = "none";
            document.getElementById("success-alert").style.display = "block";

        }
    });
});