import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../hooks/useAPI";
import { SearchContext } from "../../context/ContextProvider";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Pagination from "../../components/Pagination/Pagination";
import s from "./ProductList.module.scss";
import Breadcrumbs from "../../components/UIkit/Breadcrumbs/Breadcrumbs";

const PRODUCTS_PER_PAGE = 12;

function ProductList() {
  const { t } = useTranslation();
  const { products, getAllProducts } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const { query } = useContext(SearchContext);
  const { category } = useParams();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const categoryInfo = useMemo(
    () => ({
      smartphones: {
        title: t("categories.smartphones"),
        text: t("productCategoryText.smartphones"),
        tags: ["Apple", "Samsung", "Xiaomi", "Google Pixel"],
      },
      headphones: {
        title: t("categories.headphones"),
        text: t("productCategoryText.headphones"),
        tags: ["AirPods", "Sony", "JBL", "Hi-Res"],
      },
      smartwatches: {
        title: t("categories.smartwatches"),
        text: t("productCategoryText.smartwatches"),
        tags: ["Apple Watch", "Galaxy Watch", "Garmin", "AMOLED"],
      },
      playstaions: {
        title: t("categories.playstaions"),
        text: t("productCategoryText.playstaions"),
        tags: ["PlayStation", "Xbox", "Nintendo", "Bundles"],
      },
      tablets: {
        title: t("categories.tablets"),
        text: t("productCategoryText.tablets"),
        tags: ["iPad", "Samsung Tab", "Stylus", "LTE"],
      },
      laptops: {
        title: t("categories.laptops"),
        text: t("productCategoryText.laptops"),
        tags: ["MacBook", "Gaming", "OLED", "16GB RAM"],
      },
      cameras: {
        title: t("categories.cameras"),
        text: t("productCategoryText.cameras"),
        tags: ["Canon", "Sony", "4K", "Kit lens"],
      },
    }),
    [t]
  );

  const currentCategory = useMemo(
    () =>
      categoryInfo[category] || {
        title: t("catalog"),
        text: t("productList.catalogText"),
        tags: t("productList.defaultTags").split(";"),
      },
    [category, categoryInfo, t]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [category, activeFilter, sortBy, query]);

  const productFilters = useMemo(
    () => [
      { id: "all", label: t("productList.all") },
      { id: "discount", label: t("productList.discount") },
      { id: "credit", label: t("productList.credit") },
      { id: "cashback", label: t("productList.cashback") },
    ],
    [t]
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const visibleProducts = products
      .filter((product) => {
        const matchesCategory = category ? product.category === category : true;
        const matchesQuery = product.title.toLowerCase().includes(normalizedQuery);

        return matchesCategory && matchesQuery;
      })
      .filter((product) => {
        if (activeFilter === "discount") return Boolean(product.discount);
        if (activeFilter === "credit") return product.price >= 300;
        if (activeFilter === "cashback") return product.price >= 100;
        return true;
      });

    return [...visibleProducts].sort((a, b) => {
      if (sortBy === "priceAsc") return a.price - b.price;
      if (sortBy === "priceDesc") return b.price - a.price;
      if (sortBy === "discount") return (b.discount || 0) - (a.discount || 0);
      return a.id - b.id;
    });
  }, [activeFilter, category, products, query, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;

    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, filteredProducts]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <>
      {filteredProducts.length > 0 ? (
        <>
          <Breadcrumbs />
          <section className={s.categoryHero}>
            <div>
              <span>MobileLend catalog</span>
              <h1>{currentCategory.title}</h1>
              <p>{currentCategory.text}</p>
            </div>
            <div className={s.categoryChips}>
              {currentCategory.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
          <div className={s.toolbar}>
            <div className={s.filterGroup}>
              {productFilters.map((filter) => (
                <button
                  key={filter.id}
                  className={cn(s.filterChip, {
                    [s.activeChip]: activeFilter === filter.id,
                  })}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <label className={s.sortControl}>
              <span>{t("productList.sort")}</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">{t("productList.popular")}</option>
                <option value="priceAsc">{t("productList.priceAsc")}</option>
                <option value="priceDesc">{t("productList.priceDesc")}</option>
                <option value="discount">{t("productList.firstDiscounts")}</option>
              </select>
            </label>
          </div>
          <div className={s.pageInfo}>
            <div className={s.pageIndicator}>
              {t("commonPageOf", { current: currentPage, total: totalPages })}
            </div>
            <div className={s.productsCount}>
              {t("commonShownOf", {
                shown: currentProducts.length,
                total: filteredProducts.length,
              })}
            </div>
          </div>

          <ProductGrid products={currentProducts} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
            />
          )}
        </>
      ) : (
        <div className={s.emptyPage}>{t("commonEmptyPage")}</div>
      )}
    </>
  );
}

export default ProductList;
