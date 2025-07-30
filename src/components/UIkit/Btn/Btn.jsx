import React from "react";
import s from "./Btn.module.scss";
import cn from "classnames";

function Btn({ children, icon, disable, color, onClickFunc }) {
  return (
    <button
      onClick={disable ? undefined : onClickFunc}
      className={cn(s.root, {
        [s.disable]: disable,
        [s.active]: !disable,
        [s.primary]: color === "primary",
        [s.secondary]: color === "secondary",
        [s.danger]: color === "danger",
        [s.clear]: color === "clear",
      })}
    >
      {children && children}
      {icon && (
        <span
          className={cn(s.svg, {
            [s.svgWithText]: children,
          })}
        >
          {icon}
        </span>
      )}
    </button>
  );
}

export default Btn;
