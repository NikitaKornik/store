import React from "react";
import s from "./Pagination.module.scss";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPrevPage,
}) {
  // Функция для генерации массива страниц для отображения
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7; // Максимальное количество видимых страниц

    if (totalPages <= maxVisiblePages) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Если страниц много, показываем с логикой
      if (currentPage <= 4) {
        // Показываем первые 5 страниц + ... + последняя
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Показываем первая + ... + последние 5 страниц
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Показываем первая + ... + текущая + ... + последняя
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={s.root}>
      {/* Кнопка "Предыдущая страница" */}
      <div
        className={`${s.btn} ${currentPage === 1 ? s.btnDisable : ""}`}
        onClick={currentPage === 1 ? undefined : onPrevPage}
      >
        ←
      </div>

      {/* Номера страниц */}
      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <div key={`ellipsis-${index}`} className={s.btnDisable}>
              ...
            </div>
          );
        }

        return (
          <div
            key={page}
            className={`${s.btn} ${currentPage === page ? s.btnActive : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </div>
        );
      })}

      {/* Кнопка "Следующая страница" */}
      <div
        className={`${s.btn} ${currentPage === totalPages ? s.btnDisable : ""}`}
        onClick={currentPage === totalPages ? undefined : onNextPage}
      >
        →
      </div>
    </div>
  );
}

export default Pagination;
