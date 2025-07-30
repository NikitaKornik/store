import React from "react";
import s from "./Btn.module.scss";
import cn from "classnames";

function Btn({ children, disable, color, onClickFunc }) {
  return (
    <button
      onClick={disable ? undefined : onClickFunc}
      className={cn(s.root, {
        [s.disable]: disable,
        [s.active]: !disable,
        [s.primary]: color === "primary",
        [s.secondary]: color === "secondary",
        [s.danger]: color === "danger",
      })}
    >
      {children && children}
    </button>
  );
}

export default Btn;
