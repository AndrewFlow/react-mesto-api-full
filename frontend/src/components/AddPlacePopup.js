import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup (props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    function handleName(e) {
      setName(e.target.value);
    }
    function handleLink(e) {
      setLink(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
    
        props.onSubmit({
          name: name,
          link: link
        });
      }
      React.useEffect(() => {
        if (props.isOpen) {
          setName('');
          setLink('');
        }
      }, [props.isOpen]);
    return (
        <PopupWithForm name="add"
         title='Новое место' 
         isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          >
        <label className="popup__field">
          <input id="placeName" value={name} name="placeName" className="popup__input" type="text" placeholder="Название" required
            minLength="2" maxLength="30" onChange={handleName}/>
          <span className="popup__error placeName-error"></span>
        </label>
        <label className="popup__field">
          <input type="url" value={link} id="placeLink" name="placeLink" className="popup__input" placeholder="Ссылка на картинку"
            required onChange={handleLink}/>
          <span className="popup__error placeLink-error"></span>
        </label>
      </PopupWithForm>

    )
}

export default AddPlacePopup;