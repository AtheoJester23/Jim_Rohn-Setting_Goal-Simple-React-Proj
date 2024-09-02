import React, { useRef, useEffect } from "react";
import * as bootstrap from "bootstrap";

const Tooltip = ({ children, text }) => {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (tooltipRef.current) {
      const tooltip = new bootstrap.Tooltip(tooltipRef.current, {
        title: text,
      });

      return () => {
        tooltip.dispose();
      };
    }
  }, [text]);

  return (
    <div ref={tooltipRef} data-bs-toggle="tooltip">
      {children}
    </div>
  );
};

export default Tooltip;
