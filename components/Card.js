export default class Card {
    constructor({ name, link }, cardSelector, handleImageClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }
    _setEventListeners() {
        this._cardElement
            .querySelector(".card__like-button")
            .addEventListener("click", () => {
                likeButton.classList.toggle("card__like-button_active");
            });

        this._cardElement
            .querySelector(".cards__delete-button")
            .addEventListener("click", () => {
                this._cardElement.remove();
            });

        this._cardImageEl.addEventListener("click", () => 
            this._handleImageClick(this._name, this._link);
        );
    }

    getView() {
        this._cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        this._setEventListeners();
        this._cardImageEl = this._cardElement.querySelector(".card__image");
        this._cardtitleEl = this._cardElement.querySelector(".card__title");
        this._cardImageEl.src = this._link;
        this._cardImageEl.alt = this._name;
        this._cardtitleEl.textContent = this._name;
        return this._cardElement;
    }
}
