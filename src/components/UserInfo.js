class UserInfo {
    constructor(nameSelector, descriptionSelector) {
        this._nameElement = document.querySelector(nameSelector);
        this._descriptionElement = document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._description.textContent,
        };
    }

    setUserInfo({ name, description }) {
        this._name.textContent = name;
        this._description.textContent = description;
    }
}
