import React from "react";
import headerLogo from '../images/logo.svg';

function Header({children}) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="лого" />
      {children && (
        <ul className="header__body">
          {(children.length > 1 ? children : [children]).map((item, key) => (
            <li className="header__currentUser" key={key}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default Header;

