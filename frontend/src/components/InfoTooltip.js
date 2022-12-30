

function InfoTooltip({ info, onClose }) {
  return (
    <div className={`popup popup_info` + (info ? " popup_opened" : "")}>
      <div className="popup__container">
        <p className={ "popup__authtorization" +
            (info ? info.ifSuccess ? " popup__authtorization_type_success"
                : " popup__authtorization_type_error"
              : "")
          }>
          {info ? info.text : " "}
        </p>

        <button 
          className="popup__icon"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;