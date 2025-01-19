import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";

import {
    settings,
    initialCards,
    profileEditButton,
    profileEditModal,
    profileModalCloseButton,
    profileTitle,
    profileDescription,
    profileTitleInput,
    profileDescriptionInput,
    profileEditForm,
    addCardButton,
    addCardModal,
    addImageCloseButton,
    addCardTitle,
    addCardURL,
    addCardTitleInput,
    addCardURLInput,
    cardListEl,
    addCardForm,
    imageModal,
    imageModalImg,
    imageModalText,
    imageModalCloseButton,
} from "../utils/constants.js";

profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    open(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () => {
    close(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    close(profileEditModal);
});

addCardButton.addEventListener("click", () => {
    addCardTitleInput.value = addCardTitle.textContent;
    addCardURLInput.value = addCardURL.textContent;
    open(addCardModal);
});

addImageCloseButton.addEventListener("click", () => {
    close(addCardModal);
});

imageModalCloseButton.addEventListener("click", () => {
    close(imageModal);
});

addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = addCardTitleInput.value;
    const url = addCardURLInput.value;
    renderCard({ name: title, link: url }, cardListEl);
    close(addCardModal);
    addCardForm.reset();
    addCardFormValidator.disableButton();
});

function handleImageClick(name, link) {
    imageModalImg.src = link;
    imageModalImg.alt = name;
    imageModalText.textContent = name;
    open(imageModal);
}

function createCard(cardData) {
    const card = new Card(cardData, "#card-template", handleImageClick);
    return card.getView();
}

function renderCard(cardData, cardListEl) {
    const cardElement = createCard(cardData);
    cardListEl.prepend(cardElement);
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(settings, profileEditForm);
editProfileFormValidator.enableValidation();
