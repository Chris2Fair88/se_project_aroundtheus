export default class Card {
    constructor({ name, link }, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }
    _setEventListeners() {
        this._cardElement
            .querySelector(".card__like-button")
            .addEventListener("click", () => {
                likeButton.classList.toggle("card__like-button_active");
            });

        //this._cardElement
        //.querySelector(".cards__delete-button")
        //.addEventListener("click", () => {});
        const deleteButton =
            this._cardElement.querySelector(".card__like-button");
    }

    getView() {
        this._cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        this._setEventListeners();
        this._cardImageEl = this._cardElement;
        this._cardtitleEl = this._cardElement;
        this._cardImageEl.src = this.link;
        this._cardImageEl.alt = this.name;
        this._cardtitleEl.textContent = this._name;
        return this._cardElement;
    }
}