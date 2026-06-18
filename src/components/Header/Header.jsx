import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CartMetaContext,
  CompareMetaContext,
  FavoritesMetaContext,
} from "../../context/ContextProvider";
import { languageOptions } from "../../i18n/translations";
import { useTranslation } from "react-i18next";
import Btn from "../UIkit/Btn/Btn";
import Search from "../UIkit/Search/Search";
import s from "./Header.module.scss";
import { ReactComponent as LocateSvg } from "../../assets/icons/location.svg";
import { ReactComponent as HeartSvg } from "../../assets/icons/heart.svg";
import { ReactComponent as ShoppingCartSvg } from "../../assets/icons/shoppingCart.svg";
import { ReactComponent as LanguageSvg } from "../../assets/icons/language.svg";
import { ReactComponent as CompareSvg } from "../../assets/icons/archive-svgrepo-com.svg";
import { ReactComponent as UserSvg } from "../../assets/icons/user.svg";

function Header({ onMenuClick }) {
  const lastScrollY = useRef(0);
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();
  const { cartItemCount } = useContext(CartMetaContext);
  const { favoritesCount } = useContext(FavoritesMetaContext);
  const { compareCount } = useContext(CompareMetaContext);
  const { i18n, t } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const language = i18n.resolvedLanguage || i18n.language || "ru";

  const handleCartClick = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  const handleFavoritesClick = useCallback(() => {
    navigate("/favorites");
  }, [navigate]);

  const handleCompareClick = useCallback(() => {
    navigate("/compare");
  }, [navigate]);

  const handleStoresClick = useCallback(() => {
    navigate("/stores");
  }, [navigate]);

  const handleAccountClick = useCallback(() => {
    navigate("/account");
  }, [navigate]);

  useEffect(() => {
    let frameId = null;
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const shouldHide =
          currentScrollY > lastScrollY.current && currentScrollY > 24;

        setIsHidden(shouldHide);
        if (shouldHide) {
          setIsLanguageOpen(false);
        }
        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${s.root} ${isHidden ? s.hidden : ""}`}>
      <button
        className={s.menuBtn}
        type="button"
        onClick={onMenuClick}
        aria-label={t("menu")}
      >
        <span />
        <span />
        <span />
      </button>
      <Btn
        icon={<LocateSvg />}
        onClickFunc={handleStoresClick}
        reduction={"tablet"}
      >
        {t("stores")}
      </Btn>
      <Search />
      <div className={s.svgContainer}>
        <Btn
          icon={<CompareSvg />}
          color={"clear"}
          onClickFunc={handleCompareClick}
          className={s.headerIconButton}
          notification={compareCount > 0 && compareCount}
          aria-label={t("compare")}
        ></Btn>
        <Btn
          icon={<HeartSvg />}
          color={"clear"}
          onClickFunc={handleFavoritesClick}
          className={s.headerIconButton}
          notification={favoritesCount > 0 && favoritesCount}
          aria-label={t("favorites")}
        ></Btn>
        <Btn
          icon={<ShoppingCartSvg />}
          color={"clear"}
          onClickFunc={handleCartClick}
          className={s.headerIconButton}
          notification={cartItemCount > 0 && cartItemCount}
          aria-label={t("cart")}
        ></Btn>
        <Btn
          icon={<UserSvg />}
          color={"clear"}
          onClickFunc={handleAccountClick}
          className={s.headerIconButton}
          aria-label={t("account")}
        ></Btn>
        <div className={s.language}>
          <button
            className={s.languageBtn}
            type="button"
            onClick={() => setIsLanguageOpen((isOpen) => !isOpen)}
            aria-label={t("language")}
          >
            <LanguageSvg />
            <span>{language.toUpperCase()}</span>
            <i aria-hidden="true">⌄</i>
          </button>
          {isLanguageOpen && (
            <div className={s.languageMenu}>
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  className={option.code === language ? s.activeLanguage : ""}
                  type="button"
                  onClick={() => {
                    i18n.changeLanguage(option.code);
                    localStorage.setItem("language", option.code);
                    setIsLanguageOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                  <strong>{option.name}</strong>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
