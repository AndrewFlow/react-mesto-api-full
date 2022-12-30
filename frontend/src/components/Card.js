import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardDeleteButtonClassName = (
    `cards__delete ${isOwn ? 'cards__delete_visible' : 'cards__delete_hidden'}`
  );
  const cardLikeButtonClassName = `cards__icon ${isLiked ? 'cards__icon_active' : ''}`; 
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }


  return (
    <li className="cards__item">
      <img className="cards__image" src={props.link} alt={props.name} title="Посмотреть в полном размере" onClick={handleCardClick} />
      <div className="cards__info">
        <h2 className="cards__title">{props.name}</h2>
        <div className="cards__likes">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <h2 className="cards__counter">{props.likes}</h2>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
    </li>
  )
}

export default Card;