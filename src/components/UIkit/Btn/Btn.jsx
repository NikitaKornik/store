import React, { useState, useEffect } from "react";
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
  reduction,
  ...props
}) {
  const [width, setWidth] = useState(window.innerWidth);
  const [reductionWidth, setReductionWidth] = useState(window.innerWidth);
  const [reductionChildren, setReductionChildren] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    switch (reduction) {
      case "mobile":
        setReductionWidth(380);
        break;
      case "tablet_sm":
        setReductionWidth(540);
        break;
      case "tablet":
        setReductionWidth(768);
        break;
      case "desktop":
        setReductionWidth(1024);
        break;
      case "desktop_lg":
        setReductionWidth(1440);
        break;
    }

    if (width > reductionWidth) {
      setReductionChildren(true);
    } else {
      setReductionChildren(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width, reductionWidth]);

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
        [s.svgOnly]: !children || (reduction && !reductionChildren),
      })}
      style={style}
      data-notification={notification}
      {...props}
    >
      {children && reduction ? (reductionChildren ? children : "") : children}

      {icon && (
        <span
          className={cn(s.svg, {
            [s.svgWithText]: children && reduction && reductionChildren,
          })}
        >
          {icon}
        </span>
      )}
    </button>
  );
}

export default Btn;
