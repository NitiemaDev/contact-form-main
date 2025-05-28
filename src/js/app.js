const successMessage = document.querySelector(".success__message");

const form = document.querySelector("form");



const handleFormSubmission = (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());


    const errors = [
        handleInputError(data.firstname, ".firstname__error__message", "#firstname"),
        handleInputError(data.lastname, ".lastname__error__message", "#lastname"),
        handleEmailError(data.email, ".email__error__message", "#email"),
        handleInputError(data.message, ".message__text__error", "#message")
    ];



    // Radio button validation
    const queryError = document.querySelector(".enquiry__error__message");
    
    if (!data.query) {
        queryError.textContent = "Please select a query type";
        errors.push(true);
    } else {
        queryError.textContent = "";
    }


    // Checkbox validation

    const consentError = document.querySelector(".consent__message__error");

    if (!formData.has("consent")) {
        consentError.textContent = "To submit this form, please consent to being contacted";
        errors.push(true);
    } else {
        consentError.textContent = "";
    }



    const hasError = errors.includes(true);

    if (!hasError) {
        form.reset();
        showSuccessMessage();
        console.log("Form submitted with: ", data);
    }
};





function handleInputError(value, errorSelector, inputSelector) {

    const messageElement = document.querySelector(errorSelector);
    const input = document.querySelector(inputSelector);

    if (value.trim() === "") {

        messageElement.textContent = "This field is required";
        input.classList.add("error__input__state");
        return true; // error

    } else {

        messageElement.textContent = "";
        input.classList.remove("error__input__state");
        return false; // Not error

    }
}




function handleEmailError(email, errorSelector, inputSelector) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.querySelector(errorSelector);
    const input = document.querySelector(inputSelector);

    if (!emailRegex.test(email)) {

        errorElement.textContent = "Please enter a valid email address";
        input.classList.add("error__input__state");
        return true;

    } else {

        errorElement.textContent = "";
        input.classList.remove("error__input__state");
        return false;
    }
}




form.addEventListener("submit", handleFormSubmission);

function showSuccessMessage() {
    successMessage.classList.add("show");
    setTimeout(() => {
        successMessage.classList.remove("show");
    }, 3000);
}
