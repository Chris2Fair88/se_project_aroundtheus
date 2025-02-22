import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(modalSelector, handleFormSubmit) {
        super({ modalSelector });
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._modalElement.querySelector(".modal__form");
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
    }
}
