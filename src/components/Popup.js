export default class Popup {
    constructor({ modalSelector }) {
        this._modalElement = document.querySelector(modalSelector);
    }

    open(modal) {
        this._modal.classList.add("modal_opened");
        document.addEventListener("keydown", this._handleEscClose);
        this._modal.addEventListener("click", this._handleCloseOverlay);
    }

    close(modal) {
        this._modal.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._handleEscClose);
        this._modal.removeEventListener("click", this._handleCloseOverlay);
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._modalElement
            .querySelector(".modal__close-button")
            .addEventListener("click", () => {
                this.close();
            });
    }
}
