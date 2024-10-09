function setEventListeners(formEl, config) {
    const { inputSelector } = config;
    const inputEls = { ...formEl.querySelectorAll(inputSelector) };
    console.log(inputEls);
}
function enableValidation(config) {
    const formEls = { ...document.querySelectorAll(config.formSelector) };
    formEls.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => {
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
