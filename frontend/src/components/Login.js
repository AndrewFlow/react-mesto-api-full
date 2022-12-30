import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import auth from "../utils/auth";

function Login({ handleShowInfo, onLogin }) {
  const defaultInputs = {
    email: "",
    password: ""
  };
  const [inputs, setInputs] = React.useState(defaultInputs);
  const navigate = useNavigate();

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setInputs((state) => ({ ...state, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth.authorization(inputs)
    .then(res => {
        if (res.token) localStorage.setItem('token', res.token);
        onLogin();
        navigate("/");
      })
      .catch(() => {
        const text = "Неккоректно заполнено одно из полей. Попробуйте еще раз.";
        handleShowInfo({
          text: text,
          ifSuccess: false,
        });
      });
  }

  return (
    <>
      <Header>
        <Link to="/signup" className="header__currentUser"> Регистрация </Link>
      </Header>

      <main>
        <div className="authentication content__element">
          <h2 className="authentication__header">Вход</h2>
          <form className="authentication__form" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              className="authentication__input"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              minLength='3'
              maxLength='40'
              required
            />
            <input
              type="password"
              className="authentication__input"
              placeholder="Пароль"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              minLength='7'
              maxLength='40'
              required
            />
            <button rype="submit" className="authentication__button">
              Войти
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;