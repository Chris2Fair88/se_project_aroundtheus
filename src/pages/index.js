import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import PopupWithImages from "../components/PopupWithImages.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/API.js";

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

const userInfo = new UserInfo(
    ".profile__title",
    ".profile__description",
    ".profile__image"
);
const imagePopup = new PopupWithImages("#card-image-modal");

profileEditButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profileTitleInput.value = userData.name;
    profileDescriptionInput.value = userData.job;
});

function handleImageClick(name, link) {
    const cardData = { name, link };
    imagePopup.open(cardData);
}

function handleDeleteCard(cardId) {
    deleteCardPopup.open();
    deleteCardPopup.setSubmitAction(() => {
        deleteCardPopup(cardId);
        deleteCardPopup.close();
    });
}

function getCardElement(cardData) {
    const card = new Card(
        cardData,
        "#card-template",
        handleImageClick,
        handleDeleteCard
    );
    return card.getView();
}

imagePopup.setEventListeners();

function createCard(cardData) {
    const card = new Card(
        cardData,
        "#card-template",
        handleImageClick,
        handleDeleteCard
    );
    return card.getView();
}

const section = new Section(
    {
        items: initialCards,
        renderer: renderCard,
    },

    ".cards__list"
);

function renderCard(data) {
    const card = createCard(data);
    section.addItem(card);
}

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
    const newData = { name: formData.title, link: formData.url };
    renderCard(newData, cardListEl);
    addCardPopup.close();
    addCardForm.reset();
    addCardFormValidator.disableButton();
    api.createNewCard()
        .then((result) => {
            renderCard(result);
        })
        .catch((err) => {
            console.error(err);
        });
});

addCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
    addCardPopup.open();
});

const editProfileModal = new PopupWithForm(
    "#profile-edit-modal",
    (formData) => {
        userInfo.setUserInfo({
            name: formData.title,
            description: formData.description,
        });
        editProfileModal.close();
        profileEditForm.reset();
        api.setProfileInfo(name, about).then((result) => {
            userInfo.setUserInfo({
                name: result.name,
                description: result.about,
            });
        });
    }
);

const deleteCardPopup = new PopupWithConfirm("#delete-card-modal");

deleteCardPopup.setEventListeners();

editProfileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
    editProfileModal.open();
});

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(settings, profileEditForm);
editProfileFormValidator.enableValidation();

const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
        authorization: "34309ff6-916f-42f6-9f50-594fbb533e2c",
        "Content-Type": "application/json",
    },
});

api.getInitialCards()
    .then((result) => {
        section.renderItems(result);
    })
    .catch((err) => {
        console.error(err);
    });

api.getUserInfo()
    .then((result) => {
        userInfo.setUserInfo({
            name: result.name,
            description: result.about,
        });
        userInfo.setAvatar(result.avatar);
    })
    .catch((err) => {
        console.error(err);
    });

cardInfoSubmit.setSubmitAction(() => {
    api.removeCard(card.getId())
        .then(() => {
            card.removeCard();
            cardInfoSubmit.close();
        })
        .catch((err) => {
            console.error(
                "An error occurred while trying to delete the card: ${err}"
            );
        });
});
