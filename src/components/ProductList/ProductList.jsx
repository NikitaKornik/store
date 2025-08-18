import React, { useEffect, useState } from "react";
import s from "./ProductList.module.scss";
import Product from "../Product/Product";
import Pagination from "../Pagination/Pagination";
import { useProducts } from "../../hooks/useAPI";

function ProductList() {
  const { products, getAllProducts } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // Вычисляем индексы для текущей страницы
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Функция для изменения страницы
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Прокручиваем вверх страницы при смене страницы
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Функция для перехода на следующую страницу
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Функция для перехода на предыдущую страницу
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Индикатор страницы и количества товаров */}
      <div className={s.pageInfo}>
        <div className={s.pageIndicator}>
          Страница {currentPage} из {totalPages}
        </div>
        <div className={s.productsCount}>
          Показано {currentProducts.length} из {products.length} товаров
        </div>
      </div>

      <div className={s.root}>
        {currentProducts.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            imgUrl={product.imgUrl}
            title={product.title}
            desc={product.desc}
            price={product.price}
            currency={product.currency}
            discount={product.discount}
          />
        ))}
      </div>

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
  );
}

export default ProductList;
