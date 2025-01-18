import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
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

function handleEscClose(e) {
    if (e.key === "Escape") {
        const openedPopup = document.querySelector(".modal_opened");
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function handleCloseOverlay(e) {
    if (e.target.classList.contains("modal_opened")) {
        closePopup(e.target);
    }
}

function openPopup(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscClose);
    modal.addEventListener("click", handleCloseOverlay);
}

function closePopup(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscClose);
    modal.removeEventListener("click", handleCloseOverlay);
}

profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openPopup(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () => {
    closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditModal);
});

addCardButton.addEventListener("click", () => {
    addCardTitleInput.value = addCardTitle.textContent;
    addCardURLInput.value = addCardURL.textContent;
    openPopup(addCardModal);
});

addImageCloseButton.addEventListener("click", () => {
    closePopup(addCardModal);
});

imageModalCloseButton.addEventListener("click", () => {
    closePopup(imageModal);
});

addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = addCardTitleInput.value;
    const url = addCardURLInput.value;
    renderCard({ name: title, link: url }, cardListEl);
    closePopup(addCardModal);
    addCardForm.reset();
    addCardFormValidator.disableButton();
});

function handleImageClick(name, link) {
    imageModalImg.src = link;
    imageModalImg.alt = name;
    imageModalText.textContent = name;
    openPopup(imageModal);
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
