class Auth {

  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
  _check(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Возникла ошибка: ${res.status}`);
  }
  

  registration({ email, password }) {
    const url = `${this._baseUrl}/signup`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    .then(res => this._check(res))
  }

  authorization({ email, password }) {
    const url = `${this._baseUrl}/signin`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    .then(res => this._check(res))
    .catch((err) => { throw err });
  }

  checkInToken(token) {
    const url = `${this._baseUrl}/users/me`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include',
    })
    .then(res => this._check(res))
  }
}

const auth = new Auth('https://api.andrewflow.students.nomoredomains.club');

export default auth;