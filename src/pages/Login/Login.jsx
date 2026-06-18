import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/ContextProvider";
import Btn from "../../components/UIkit/Btn/Btn";
import s from "./Login.module.scss";

const initialForm = {
  name: "",
  email: "nikita@mobilelend.test",
  phone: "",
  password: "123456",
};

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, register, authLoading, authError, clearAuthError } =
    useContext(AuthContext);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const returnTo = location.state?.from || "/account";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(returnTo, { replace: true });
    }
  }, [isAuthenticated, navigate, returnTo]);

  useEffect(() => () => clearAuthError(), [clearAuthError]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearAuthError();

    try {
      if (mode === "login") {
        await login({
          email: form.email,
          password: form.password,
        });
      } else {
        await register(form);
      }

      navigate(returnTo, { replace: true });
    } catch (error) {
      // Ошибка уже лежит в authError из useAPI.
    }
  };

  const switchMode = (nextMode) => {
    clearAuthError();
    setMode(nextMode);
  };

  return (
    <div className={s.root}>
      <section className={s.hero}>
        <span>MobileLend ID</span>
        <h1>
          {mode === "login"
            ? t("loginPage.loginTitle")
            : t("loginPage.registerTitle")}
        </h1>
        <p>{t("loginPage.text")}</p>
      </section>

      <section className={s.authCard}>
        <div className={s.tabs}>
          <button
            className={mode === "login" ? s.activeTab : ""}
            type="button"
            onClick={() => switchMode("login")}
          >
            {t("loginPage.loginTab")}
          </button>
          <button
            className={mode === "register" ? s.activeTab : ""}
            type="button"
            onClick={() => switchMode("register")}
          >
            {t("loginPage.registerTab")}
          </button>
        </div>

        <form className={s.form} onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <label>
                {t("loginPage.name")}
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("checkoutPage.namePlaceholder")}
                  required
                />
              </label>
              <label>
                {t("loginPage.phone")}
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+373 ..."
                />
              </label>
            </>
          )}
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </label>
          <label>
            {t("loginPage.password")}
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              minLength="6"
              placeholder={t("loginPage.passwordPlaceholder")}
              required
            />
          </label>

          {authError && <div className={s.error}>{authError}</div>}

          <Btn color="primary" disable={authLoading}>
            {authLoading
              ? t("loginPage.checking")
              : mode === "login"
                ? t("loginPage.loginTab")
                : t("loginPage.registerTitle")}
          </Btn>
        </form>

        <div className={s.demo}>
          <span>{t("loginPage.demo")}</span>
          <strong>nikita@mobilelend.test</strong>
          <small>{t("loginPage.demoPassword")}</small>
        </div>

        <Link className={s.backLink} to="/">
          {t("loginPage.backHome")}
        </Link>
      </section>
    </div>
  );
}

export default Login;
