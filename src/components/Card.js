export default class Card {
    constructor(
        { name, link, _id, isLiked },
        cardSelector,
        handleImageClick,
        handleDeleteCard,
        handleLikeClick
    ) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeClick = handleLikeClick;
        this._cardId = _id;
        this._likeButton = null;
        this._isLiked = isLiked;
    }

    _setEventListeners() {
        this._likeButton =
            this._cardElement.querySelector(".card__like-button");

        this._likeButton.addEventListener("click", () => {
            this._likeButton.classList.toggle("card__like-button_active");
            this._handleLikeClick(this);
        });

        this._cardElement
            .querySelector(".cards__delete-button")
            .addEventListener("click", () => {
                this._handleDeleteCard(this);
            });

        this._cardImageEl.addEventListener("click", () =>
            this._handleImageClick(this._name, this._link)
        );
    }

    getView() {
        this._cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        this._cardImageEl = this._cardElement.querySelector(".card__image");
        this._cardtitleEl = this._cardElement.querySelector(".card__title");
        this._cardImageEl.src = this._link;
        this._cardImageEl.alt = this._name;
        this._cardtitleEl.textContent = this._name;
        this._setEventListeners();
        return this._cardElement;
    }

    getId() {
        return this._cardId;
    }

    deleteCard() {
        this._cardElement.remove();
    }

    isLiked() {
        return this._isLiked;
    }
}
