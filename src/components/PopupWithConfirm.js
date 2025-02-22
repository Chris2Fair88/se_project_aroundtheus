import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(modalSelector) {
        super({ modalSelector });
        this._modalForm = this._modalElement.querySelector(".modal__form");
    }

    setSubmitFunc(SubmitFunc) {
        this._SubmitFunc = SubmitFunc;
    }

    setEventListeners() {
        super.setEventListeners();
        this._modalForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._SubmitFunc();
        });
    }
}
