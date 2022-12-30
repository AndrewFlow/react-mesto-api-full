class Api {
    constructor(options) {
        this._url = options.url;
    }

    // Запрос пользователя
    getInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(res => this._checkApi(res))
    }

    // Проверка получаения данных
    _checkApi(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Возникла ошибка: ${res.status}`);
    }

    // Редактирование пользователя
    setInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                about: data.description
            })
        })
            .then(res => this._checkApi(res))
    }

    // Редактирование аватара
    setAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify({
                avatar: data.avatar_input
            })
        })
            .then(res => this._checkApi(res))
    }

    // Запрос карточек от Api
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(res => this._checkApi(res))
    }

    // Добавление карточек в поток
    addCards(data) {
        return fetch(`${this._url}/cards`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._checkApi(res))

    }

    // Удаление лайка
    deleteLike(card) {
        return fetch(`${this._url}/cards/${card}/likes`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._checkApi(res))
    }


    setLikes(card) {
        return fetch(`${this._url}/cards/${card}/likes`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._checkApi(res))
    }
    // Удаление карточек
    openConfirmationPopup(card) {
        return fetch(`${this._url}/cards/${card._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._checkApi(res))
    }

}
const token = localStorage.getItem('token')
const api = new Api({
    url: 'https://api.andrewflow.students.nomoredomains.club',
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
})

export default api;
