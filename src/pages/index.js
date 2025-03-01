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

function handleDeleteCard(card) {
    deleteCardPopup.open();
    deleteCardPopup.setSubmitFunc(() => {
        api.deleteCard(card.getId())
            .then(() => {
                card.deleteCard();
                deleteCardPopup.close();
            })
            .catch((error) => {
                console.error(
                    "An error occurred while trying to delete the card: ${err}"
                );
            });
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
        handleDeleteCard,
        handleLikeClick
    );
    return card.getView();
}

function cardInfoSubmit(cardId) {
    deleteCardPopup.setSubmitFunc(() => {
        api.deleteCard(cardId)
            .then(() => {
                card.deleteCard();
                deleteCardPopup.close();
            })
            .catch((err) => {
                console.error(err);
            });
    });
}

function handleLikeClick(card) {
    if (card.isLiked() === true) {
        api.addLike(card.getId())
            .then((result) => {})
            .catch((err) => {
                console.error(err);
            });
    } else {
        api.deleteLike(card.getId())
            .then((result) => {})
            .catch((err) => {
                console.error(err);
            });
    }
}

function handleAvatarClick() {
    const avatar = userInfo.getAvatar();
    imagePopup.open({ name: "Avatar", link: avatar });
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
    api.createNewCard(newData)
        .then((result) => {
            renderCard(result);
            addCardPopup.close();
            addCardForm.reset();
            addCardFormValidator.disableButton();
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

const avatarEditButton = document.querySelector(".profile__image");

const avatarEditModal = new PopupWithForm("#avatar-edit-modal", (formData) => {
    api.setAvatar(formData.avatar)
        .then((result) => {
            userInfo.setAvatar(result.avatar);
            avatarEditModal.close();
        })
        .catch((err) => {
            console.error(err);
        });
    avatarEditModal.setEventListeners();
});

avatarEditButton.addEventListener("click", () => {
    avatarEditModal.open();
});
