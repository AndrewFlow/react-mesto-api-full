import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function EditProfilePopup(props) {
    const [name, setDataName] = React.useState('');
    const [description, setDataDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    function handleUserName(e) {
        setDataName(e.target.value)
    }
    function handleDescription(e) {
        setDataDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onSubmit({
            name,
            description: description
        });
    }
    React.useEffect(() => {
        if (props.isOpen) {
            setDataName(currentUser.name);
            setDataDescription(currentUser.about);
        }
    }, [props.isOpen, currentUser]);
    return (

        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name='edit'
            title='Редактировать профиль' >
            <label className="popup__field">
                <input value={name} onChange={handleUserName} id="name-input" name="name" className="popup__input" type="text" placeholder="Имя" required
                    minLength="2" maxLength="40" />
                <span className="popup__error name-input-error"></span>
            </label>
            <label className="popup__field">
                <input value={description} id="description-input" onChange={handleDescription} name="description" className="popup__input" type="text"
                    placeholder="Деятельность" required minLength="2" maxLength="200" />
                <span className="popup__error description-input-error"></span>
            </label>
        </PopupWithForm>

    )
}

export default EditProfilePopup;