export default class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
    }

    open() {
        this._popupElement.classList.add("modal_opened");
        document.addEventListener("keydown", this._handleEscClose);
        this._popupElement.addEventListener("click", this._handleCloseOverlay);
    }

    close() {
        this._popupElement.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._handleEscClose);
        this._popupElement.removeEventListener(
            "click",
            this._handleCloseOverlay
        );
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement
            .querySelector(".modal__close-button")
            .addEventListener("click", () => {
                this.close();
            });
    }
}
