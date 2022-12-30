import React from "react";
import { Link,useNavigate  } from "react-router-dom";
import Header from "./Header";
import auth from "../utils/auth.js";

function Register({ handleShowInfo }) {
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
    auth.registration(inputs)
      .then(() => {
        handleShowInfo({
          text: "Вы успешно зарегистрировались!",
          ifSuccess: true
        });
        navigate("/signin");
      })
      .catch(() => {
        const text = "Что-то пошло не так! Попробуйте еще раз.";
        handleShowInfo({
          text: text,
          ifSuccess: false
        });
      });
  }

  return (
    <>
      <Header>
        <Link to="/signin" className="header__currentUser">
          Войти
        </Link>
      </Header>

      <main>
        <div className="authentication">
          <h2 className="authentication__header">Регистрация</h2>
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
              Зарегистрироваться
            </button>
          </form>

            <Link className="authentication__link" to="/signin">
            Уже зарегистрированы? Войти
            </Link>

        </div>
      </main>
    </>
  );
}

export default Register;
