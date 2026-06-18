import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import s from "./Footer.module.scss";

const footerSections = [
  {
    titleKey: "footerCompany",
    items: [
      { labelKey: "footerAbout", to: "/" },
      { labelKey: "stores", to: "/stores" },
      { labelKey: "footerContacts", to: "/stores" },
      { labelKey: "footerTalents", to: "/account" },
    ],
  },
  {
    titleKey: "footerCustomerCare",
    items: [
      { labelKey: "footerDelivery", to: "/checkout" },
      { labelKey: "footerTrackOrder", to: "/account#orders" },
      { labelKey: "footerWarranty", to: "/account#warranty" },
      { labelKey: "footerReturns", to: "/cart" },
    ],
  },
  {
    titleKey: "footerInfo",
    items: [
      { labelKey: "footerPromos", to: "/products" },
      { labelKey: "footerClub", to: "/account#bonus" },
      { label: "Trade-In", to: "/products/smartphones" },
      { labelKey: "footerPrivacy", to: "/account" },
    ],
  },
];

const serviceBadges = [
  "footerSecurePayment",
  "footerPickupToday",
  "footerOfficialWarranty",
];

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={s.root}>
      <div className={s.top}>
        <div className={s.brand}>
          <Link className={s.logo} to="/">
            <img src="/img/MobileLend.svg" alt="MobileLend" />
          </Link>
          <p>{t("footerTagline")}</p>
          <div className={s.contacts}>
            <a href="tel:+37360782223">
              <span>{t("footerHotline")}</span>
              <strong>060 78 22 23</strong>
            </a>
            <a href="mailto:support@mobilelend.test">
              <span>{t("footerEmail")}</span>
              <strong>support@mobilelend.test</strong>
            </a>
          </div>
          <span className={s.schedule}>{t("footerWorkHours")}</span>
        </div>

        <div className={s.links}>
          {footerSections.map((section) => (
            <nav className={s.section} key={section.titleKey}>
              <h2>{t(section.titleKey)}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item.labelKey || item.label}>
                    <Link to={item.to}>{item.labelKey ? t(item.labelKey) : item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={s.subscribe}>
          <span>{t("footerNews")}</span>
          <h2>{t("footerSubscribeTitle")}</h2>
          <p>{t("footerSubscribeText")}</p>
          <form className={s.subscribeForm}>
            <input type="email" placeholder={t("footerEmailPlaceholder")} />
            <button type="button">{t("footerSubscribeButton")}</button>
          </form>
        </div>
      </div>

      <div className={s.badges}>
        {serviceBadges.map((badgeKey) => (
          <div key={badgeKey}>
            <span aria-hidden="true" />
            <strong>{t(badgeKey)}</strong>
          </div>
        ))}
      </div>

      <div className={s.bottom}>
        <span>{t("footerCopyright")}</span>
        <strong>{t("footerMadeIn")}</strong>
        <span>{t("footerPaymentMethods")}</span>
      </div>
    </footer>
  );
}

export default Footer;
