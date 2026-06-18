import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const revealSelector = [
  '[class*="LayOut_wrapper"] > *',
  '[class*="App_hero"]',
  '[class*="App_dealBoard"]',
  '[class*="App_homeSection"]',
  '[class*="PromoHighlights_root"]',
  '[class*="ServiceStrip_root"]',
  '[class*="BrandList_root"]',
  '[class*="ProductList_categoryHero"]',
  '[class*="ProductList_toolbar"]',
  '[class*="ProductList_pageInfo"]',
  '[class*="ProductList_root"]',
  '[class*="ProductPage_header"]',
  '[class*="ProductPage_product"]',
  '[class*="Cart_hero"]',
  '[class*="Cart_checkoutLayout"]',
  '[class*="Checkout_hero"]',
  '[class*="Checkout_layout"]',
  '[class*="Account_hero"]',
  '[class*="Account_metrics"]',
  '[class*="Account_content"]',
  '[class*="Account_panel"]',
  '[class*="Stores_hero"]',
  '[class*="Stores_content"]',
  '[class*="Compare_root"]',
  '[class*="Favorites_root"]',
  '[class*="Login_hero"]',
  '[class*="Login_authCard"]',
  '[class*="Product_root"]',
  '[class*="App_categoryTile"]',
  '[class*="App_homeProduct"]',
  '[class*="App_heroDevice"]',
  '[class*="Cart_cartItem"]',
  '[class*="Checkout_panel"]',
  '[class*="Checkout_summary"]',
  '[class*="Account_orderCard"]',
  '[class*="Account_recommendation"]',
  '[class*="Stores_storeCard"]',
  '[class*="Catalog_catalogItem"]',
  '[class*="PromoHighlights_card"]',
  '[class*="ServiceStrip_item"]',
].join(",");

const staggerSelector = [
  '[class*="Product_root"]',
  '[class*="App_categoryTile"]',
  '[class*="App_homeProduct"]',
  '[class*="App_heroDevice"]',
  '[class*="Cart_cartItem"]',
  '[class*="Stores_storeCard"]',
].join(",");

const isStaggerElement = (element) =>
  element.matches(staggerSelector) ||
  [
    "Product_root",
    "App_categoryTile",
    "App_homeProduct",
    "App_heroDevice",
    "Cart_cartItem",
    "Stores_storeCard",
  ].some((classPart) => element.className?.toString().includes(classPart));

function ScrollReveal() {
  const location = useLocation();

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let observer;
    let mutationObserver;
    let setupTimeoutId;
    let frameId;
    const pendingElements = new Set();

    const isInRevealRange = (element) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      return rect.top < viewportHeight * 1.15 && rect.bottom > 0;
    };

    const revealElement = (element) => {
      pendingElements.delete(element);
      element.classList.add("is-visible");
      window.setTimeout(() => {
        element.classList.remove("scroll-reveal");
        element.style.removeProperty("--reveal-delay");
      }, 920);
      observer?.unobserve(element);
    };

    const checkPendingElements = () => {
      pendingElements.forEach((element) => {
        if (isInRevealRange(element)) {
          revealElement(element);
        }
      });
    };

    const schedulePendingCheck = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(checkPendingElements);
    };

    const setupReveal = () => {
      const elements = Array.from(document.querySelectorAll(revealSelector))
        .filter((element, index, source) => source.indexOf(element) === index)
        .filter(
          (element) =>
            !element.closest("header") &&
            !element.className?.toString().includes("Header_") &&
            element.dataset.scrollRevealReady !== "true"
        );

      if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        elements.forEach((element) => {
          element.dataset.scrollRevealReady = "true";
          element.classList.add("is-visible");
          element.style.removeProperty("--reveal-delay");
        });
        return;
      }

      elements.forEach((element, index) => {
        element.dataset.scrollRevealReady = "true";
        element.classList.remove("is-visible");
        element.classList.add("scroll-reveal");

        if (isStaggerElement(element)) {
          element.style.setProperty(
            "--reveal-delay",
            `${Math.min((index % 4) * 80, 240)}ms`
          );
        } else {
          element.style.removeProperty("--reveal-delay");
        }

        pendingElements.add(element);
        observer.observe(element);
      });

      schedulePendingCheck();
    };

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealElement(entry.target);
            }
          });
        },
        {
          threshold: 0,
          rootMargin: "0px 0px 15% 0px",
        }
      );
    }

    const scheduleSetup = (delay = 0) => {
      window.clearTimeout(setupTimeoutId);
      setupTimeoutId = window.setTimeout(setupReveal, delay);
    };

    mutationObserver = new MutationObserver(() => {
      scheduleSetup(80);
    });

    mutationObserver.observe(document.getElementById("root"), {
      childList: true,
      subtree: true,
    });

    window.addEventListener("scroll", schedulePendingCheck, { passive: true });
    window.addEventListener("resize", schedulePendingCheck);

    setupReveal();

    return () => {
      window.clearTimeout(setupTimeoutId);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", schedulePendingCheck);
      window.removeEventListener("resize", schedulePendingCheck);
      mutationObserver?.disconnect();
      observer?.disconnect();
    };
  }, [location.pathname, location.search]);

  return null;
}

export default ScrollReveal;
