
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import Header from "./Header";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <>
        <Header >
        <h2 className="header__userinfo">{props.email}</h2>
        <button className="header__userinfo" onClick={props.onLogout}>
          Выйти
        </button>
      </Header>
        <main>
            <section className="profile">
                <div onClick={props.onEditAvatar} className="profile__avatarinner">
                    <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__about">
                        <h1 className="profile__user">{currentUser.name}</h1>
                        <button onClick={props.onEditProfile} id='profile__edit-button' className="profile__edit-button"></button>
                    </div>
                    <p className="profile__status">{currentUser.about}</p>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button"></button>
            </section>

            <section className="elements">
                <ul className="cards">
                    {props.cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            link={card.link}
                            name={card.name}
                            likes={card.likes.length}
                            onCardClick={props.onCardClick}
                            onCardDelete={props.onCardDelete}
                            onCardLike={props.onCardLike}
                        />
                    ))}
                </ul>
            </section>
        </main>
        </>
    )
}

export default Main;
