import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup (props) {
    const ref = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit({
            avatar_input: ref.current.value
        });
      }
      React.useEffect(() => {
        ref.current.value = '';
      }, [props.isOpen]);
    return (

        <PopupWithForm name='avatar'
        title='Обновить аватар'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        >
        <label className="popup__field">
          <input ref={ref} type="url" className="popup__input" name="avatar_input" placeholder="Ссылка на новое изображение" id="avatar-input" required />
          <span className="popup__error" id="avatar-input-error"></span>
        </label>
      </PopupWithForm >
    )
}

export default EditAvatarPopup;