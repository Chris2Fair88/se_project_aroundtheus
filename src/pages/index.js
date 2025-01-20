import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import PopupWithImages from "../components/PopupWithImages.js";

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

function handleImageClick(name, link) {
    imageModalImg.src = link;
    imageModalImg.alt = name;
    imageModalText.textContent = name;
    open(imageModal);
}

profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    open(profileEditModal);
});

addCardButton.addEventListener("click", () => {
    addCardTitleInput.value = addCardTitle.textContent;
    addCardURLInput.value = addCardURL.textContent;
    open(addCardModal);
});

function createCard(cardData) {
    const card = new Card(cardData, "#card-template", handleImageClick);
    return card.getView();
}

function renderCard(cardData, cardListEl) {
    const cardElement = createCard(cardData);
    cardListEl.prepend(cardElement);
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
    const card = new Card(formData, "#card-template");
    const cardElement = card.generateCard();
    document.querySelector(".cards__list").prepend(cardElement);
    addCardPopup.close();
});
addCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
    addCardPopup.open();
});

const editProfileModal = new PopupWithForm(
    "#profile-edit-modal",
    (formData) => {
        profileTitle.textContent = formData.name;
        profileDescription.textContent = formData.about;
        editProfileModal.close();
    }
);
editProfileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
    editProfileModal.open();
});

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(settings, profileEditForm);
editProfileFormValidator.enableValidation();
