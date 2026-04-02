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

    // 1. Validera Namn (minst 2 tecken)
    const name = document.getElementById("name").value.trim();
    if (name.length < 2) {
        setInvalid("name", "error-name", "Namnet måste vara minst 2 tecken.");
        isValid = false;
    } else {
        setValid("name");
    }

    // 2. Validera E-post (måste innehålla @ och en punkt)
    const email = document.getElementById("email").value.trim();
    if (!email.includes("@") || !email.includes(".")) {
        setInvalid("email", "error-email", "Vänligen ange en giltig e-postadress.");
        isValid = false;
    } else {
        setValid("email");
    }

    // 3. Validera Ämne (minst 2 tecken)
    const subject = document.getElementById("subject").value.trim();
    if (subject.length < 2) {
        setInvalid("subject", "error-subject", "Ämnet måste vara minst 2 tecken.");
        isValid = false;
    } else {
        setValid("subject");
    }

    // 4. Validera Meddelande (minst 10 tecken så de faktiskt skriver något)
    const message = document.getElementById("message").value.trim();
    if (message.length < 10) {
        setInvalid("message", "error-message", "Meddelandet måste vara minst 10 tecken långt.");
        isValid = false;
    } else {
        setValid("message");
    }

    return isValid;
}

// Körs när sidan har laddats klart
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    // Lyssna på när användaren klickar på "Skicka meddelande" (submit)
    contactForm.addEventListener("submit", function(event) {
        // Stoppa formuläret från att ladda om sidan direkt
        event.preventDefault(); 

        // Kör valideringen
        if (validateContactForm()) {
            // Om allt stämmer: 
            
            // 1. Dölj själva formuläret
            contactForm.style.display = "none";
            
            // 2. Visa din fina success-alert!
            document.getElementById("success-alert").style.display = "block";
            
        }
    });
});