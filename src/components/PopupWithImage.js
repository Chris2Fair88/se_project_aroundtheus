import Popup from "./Popup.js";

export default class PopupWithImages extends Popup {
    constructor(modalSelector) {
        super({ modalSelector });
        this._modalImage = this._modalElement.querySelector(".modal__image");
        this._modalTitle = this._modalElement.querySelector(
            ".modal__description"
        );
    }

    open(data) {
        this._modalImage.src = data.link;
        this._modalImage.alt = data.name;
        this._modalTitle.textContent = data.name;
        super.open();
    }
}
