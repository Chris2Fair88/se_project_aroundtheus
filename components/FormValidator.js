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
        const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        errorMessageEl.textContent = "";
        errorMessageEl.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputEl) {
        if (!inputEl.validity.valid) {
            this._showInputError(inputEl);
        } else {
            this._hideInputError(inputEl);
        }
    }

    _toggleButtonState() {
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
        this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
        this._submitButton = this._form.querySelector(
            this._submitButtonSelector
        );

        this._toggleButtonState();
        this._inputEls.forEach((inputEl) => {
            inputEl.addEventListener("input", (e) => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState();
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
