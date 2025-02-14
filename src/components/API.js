export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
            headers: {
                authorization: "34309ff6-916f-42f6-9f50-594fbb533e2c",
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    getUserInfo() {
        return fetch(
            "https://around-api.en.tripleten-services.com/v1/users/me",
            {
                method: "GET",
                headers: {
                    authorization: "34309ff6-916f-42f6-9f50-594fbb533e2c",
                },
                {
              "about": 
              "avatar":
              "name":
                "_id":
                }
            }
        ).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }
}

const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
        authorization: "34309ff6-916f-42f6-9f50-594fbb533e2c",
        "Content-Type": "application/json",
    },
});
