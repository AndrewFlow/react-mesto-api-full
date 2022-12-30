import React, { useEffect, useState} from "react";
import { Route, Routes, Navigate, useNavigate} from "react-router-dom";
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";
import  api  from "../utils/api.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({});
  const [LogIn, setLogIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [infoMessage, setInfoMessage] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth.checkInToken(token)
        .then((res) => {
          if(res) {
            setEmail(res.email);
            setLogIn(true);
            navigate("/");
          }
        })
        .catch(console.error);
    }
  }, [navigate]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);

  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setInfoMessage(null);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    console.log(card.likes)
    if (!isLiked) {
      api.setLikes(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  function handleCardDelete(card) {
    api.openConfirmationPopup(card).then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id && c));
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleUpdateUser(data) {
    api.setInfo(data).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }
  function handleAvatar(data) {
    api.setAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleAddPlaceSubmit(data) {
    api.addCards(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleShowInfo(message) {
    setInfoMessage(message);
  }
  function handleLogin() {
    setLogIn(true);
  }
  function handleLogout() {
    localStorage.removeItem("token");
    setLogIn(false);
  }
  useEffect(() => {
    if (LogIn) {
      Promise.all([api.getInfo(), api.getInitialCards()]).then(([user, cards]) => {
        setCurrentUser(user)
        setCards(cards)
      }).catch((err) => {
        console.error(err);
      })
    }
  }, [LogIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLogin={LogIn}>
                <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  onLogout={handleLogout}
                  email={email}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register handleShowInfo={handleShowInfo} />}
          />
          <Route
            path="/signin"
            element={<Login
                handleShowInfo={handleShowInfo}
                onLogin={handleLogin}/>
            }
          />
          <Route
            path="*"
            element={LogIn ? <Navigate to="/" /> : <Navigate to="/signin" />}
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAvatar} />

        <PopupWithForm name='delete' title='Вы уверены?' onClose={closeAllPopups}>
        </PopupWithForm>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip info={infoMessage} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;

