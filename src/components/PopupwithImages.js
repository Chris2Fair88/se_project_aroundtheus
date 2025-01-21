import Popup from "./Popup.js";

export default class PopupWithImages extends Popup {
    constructor(modalSelector) {
        super(modalSelector);
        this._modalImage = this._modal.querySelector(".modal__image");
        this._modalTitle = this._modal.querySelector(".modal__title");
    }

    open(cardData) {
        this._modalImage.src = data.link;
        this._modalImage.alt = data.name;
        this._modalTitle.textContent = data.name;
        super.open();
    }
}
