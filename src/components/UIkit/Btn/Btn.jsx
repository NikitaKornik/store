import React, { useState, useEffect } from "react";
import cn from "classnames";
import s from "./Btn.module.scss";

const reductionBreakpoints = {
  mobile: 380,
  tablet_sm: 540,
  tablet: 768,
  desktop: 1024,
  desktop_lg: 1440,
};

const canShowReducedText = (reduction) => {
  if (!reduction || typeof window === "undefined") {
    return true;
  }

  return window.innerWidth > (reductionBreakpoints[reduction] || 0);
};

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
  className,
  ...props
}) {
  const [reductionChildren, setReductionChildren] = useState(() =>
    canShowReducedText(reduction)
  );

  useEffect(() => {
    if (!reduction) {
      setReductionChildren(true);
      return undefined;
    }

    const handleResize = () => {
      setReductionChildren(canShowReducedText(reduction));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [reduction]);

  return (
    <button
      onClick={disable ? undefined : onClickFunc}
      className={cn(
        s.root,
        {
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
        },
        className
      )}
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
