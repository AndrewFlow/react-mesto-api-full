
import React from "react";
function PopupWithForm(props) {
    return (
        <section className={`popup popup_${props.name}` + (props.isOpen && " popup_opened")}>
            <div className="popup__container">
                <button className='popup__icon' type="button" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form onSubmit={props.onSubmit} name={props.name} className="popup__form" noValidate>
                    {props.children}
                    <button type="submit" className="popup__button">{props.buttonText || 'Сохранить'}</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;
