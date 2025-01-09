import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
    {
        name: "Yosemite Valley",
        link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
];

//profile edit button
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
    "#profile-description-input"
);
//add card button
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addImageCloseButton = document.querySelector("#add-image-close-button");
const addCardTitle = document.querySelector(".modal__input_type_title");
const addCardURL = document.querySelector(".modal__input_type_url");
const addCardTitleInput = document.querySelector("#image-title-input");
const addCardURLInput = document.querySelector("#image-description-input");

//image modal
const imageModal = document.querySelector("#card-image-modal");
const imageModalImg = document.querySelector(".modal__image");
const imageModalText = document.querySelector(".modal__description");
const imageModalCloseButton = document.querySelector(
    "#image-modal-close-button"
);

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

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
const addCardTitleForm = document.querySelector(".modal__input_type_title");
const addCardURLForm = document.querySelector(".modal__input_type_url");

const cardListEl = document.querySelector(".cards__list");

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

const addCardForm = addCardModal.querySelector(".modal__form");

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

const settings = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
};

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(settings, profileEditForm);
editProfileFormValidator.enableValidation();
