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

function openPopup(modal) {
    modal.classList.add("modal_opened");
}

function closePopup(modal) {
    modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardtitleEl = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button_active");
    });

    cardtitleEl.textContent = cardData.name;
    cardImageEl.alt = cardData.name;
    cardImageEl.src = cardData.link;
    return cardElement;
}

function renderCard(cardData) {
    const newCard = getCardElement(cardData);
    cardListEl.prepend(newCard);
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

addCardTitleForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = addCardTitleInput.value;
    const url = addCardURLInput.value;
    const cardElement = getCardElement(title, url);
    cardListEl.prepend(cardElement);
    closePopup(addCardModal);
    addCardModal.reset();
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const likeButtons = document.querySelectorAll(".card__like-button");
