function setEventListeners(formEL, config) {
    const { inputSelector } = config;
    const inputELs = { ...formEL.querySelectorAll(inputSelector) };
    console.log(inputELs);
}
function enableValidation(config) {
    const formELs = { ...document.querySelectorAll(config.formSelector) };
    formELs.forEach((formEL) => {
        formEL.addEventListener("submit", (e) => {
            e.preventDefault();
        });
    });
}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
};

enableValidation(config);
