
import React from "react";
function ImagePopup(props) {
    return (
        <section  className={`popup popup_openimage ${props.card ? 'popup_opened' : ''}`} id="openimage">
            <div className="popup__body">
                <div className="popup__inner">
                    <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}/>
                    <p className="popup__description">{props.card ? props.card.name : ''}</p>
                </div>
                <button onClick={props.onClose} className="popup__icon" type="button"></button>
            </div>
            <div className="popup__overlay"></div>
        </section>
    )
}

export default ImagePopup;