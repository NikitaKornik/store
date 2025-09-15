import React from "react";
import cn from "classnames";
import s from "./Btn.module.scss";

function Btn({
  children,
  icon,
  disable,
  color,
  onClickFunc,
  size,
  style,
  notification,
  ...props
}) {
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
        [s.sizeSmall]: size === "small",
        [s.sizeMiddle]: size === "middle",
        [s.sizeBig]: size === "big",
        [s.notification]: notification,
        [s.svgOnly]: !children,
      })}
      style={style}
      data-notification={notification}
      {...props}
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
