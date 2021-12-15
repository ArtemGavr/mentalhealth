import React, { useEffect, useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

import i18n from "i18n";


import "./style.scss";

const AuthSystemWrapp = (props) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "en"
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleLanguageChange = (value) => {
    localStorage.setItem("i18nextLng", value);
    setLanguage(value);
    i18n.changeLanguage(language);
  };
  const default_route = (
    <div className="container_sign_buttons">
      <Link to="/login">
        <button className="primary_button">{t("Sign Up")}</button>
      </Link>
      <Link to="/register">
        <button className="primary_button">{t("Sign In")}</button>
      </Link>{" "}
    </div>
  );
  const content = (
    <div className="auth">
      <div className="auth_wrapp">
        <div className="auth_left_wrapp">
        </div>
        <div className="auth_right_wrapp">
          {props.children || default_route}
          <div className="language_container">
            <h2 className="language_header">{t("Language")}:</h2>
            <p
              onClick={() => handleLanguageChange("ua")}
              className={`language_content ${
                language === "ua" ? "bold" : null
              }`}
            >
              {t("Ukraine")}
            </p>
            <p
              onClick={() => handleLanguageChange("en")}
              className={`language_content ${
                language === "en" ? "bold" : null
              }`}
            >
              {t("English")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  return window.localStorage.getItem("forHeader") ? (
    <Redirect to="procedures" />
  ) : (
    content
  );
};

export default withRouter(AuthSystemWrapp);
