export default class Card {
    constructor(
        { name, link, _id, isLiked, likes },
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
        this._likes = likes;
    }

    _updateLikes() {
        if (this._isLiked) {
            this._likeButton.classList.add("card__like-button_active");
        } else {
            this._likeButton.classList.remove("card__like-button_active");
        }
    }

    _setEventListeners() {
        this._likeButton =
            this._cardElement.querySelector(".card__like-button");

        this._likeButton.addEventListener("click", () => {
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
        this._updateLikes();
        return this._cardElement;
    }

    getId() {
        return this._cardId;
    }

    deleteCard() {
        this._cardElement.remove();
    }

    isLiked() {
        return this._likeButton.classList.contains("card__like-button_active");
    }

    setLikes(likes) {
        this._likes = likes;
        this._isLiked = likes.some((like) => like._id === this._userId);
        this._updateLikes();
    }

    toggleLike() {
        this._isLiked = !this._isLiked;
        this._updateLikes();
    }
}
