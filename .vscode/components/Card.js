export default class Card {
    constructor({ name, link }, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }
    _setEventListeners() {}

    getView() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .cloneNode(true);
        this._setEventListeners();
    }
}
