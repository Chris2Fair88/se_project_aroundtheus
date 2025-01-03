export default class FormValidator {
    constructor(settings, formEl) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._form = formEl;
    }

    _showinputerror(inputEl) {
        const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        errorMessageEl.textContent = inputEl.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
    }

    _hideInputError(inputEl) {
        const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(inputErrorClass);
        errorMessageEl.textContent = "";
        errorMessageEl.classList.remove(errorClass);
    }

    _checkInputValidity(inputEl) {
        if (!inputEl.validity.valid) {
            showInputError(formEl, inputEl, config);
        } else {
            hideInputError(formEl, inputEl, config);
        }
    }

    _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
        let foundInvalid = false;
        inputEls.forEach((inputEl) => {
            if (!inputEl.validity.valid) {
                foundInvalid = true;
            }
        });
        if (foundInvalid) {
            submitButton.classList.add(inactiveButtonClass);
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove(inactiveButtonClass);
            submitButton.disabled = false;
        }
    }

    _setEventListeners() {
        const inputEls = this._form.querySelectorAll(this._inputSelector);
        const submitButton = this._form.querySelector(
            this._.submitButtonSelector
        );
        toggleButtonState(inputEls, submitButton, settings);
        inputEls.forEach((inputEl) => {
            inputEl.addEventListener("input", (e) => {
                checkInputValidity(formEl, inputEl, settings);
                toggleButtonState(inputEls, submitButton, settings);
            });
        });
    }

    enableValidation() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        setEventListeners(formEl, settings);
    }
}
