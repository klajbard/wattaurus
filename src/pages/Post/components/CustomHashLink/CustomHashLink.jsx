import React from "react";
import { HashLink } from "react-router-hash-link";

export function CustomHashLink({ className, children }) {
  const title = children.replace(/\W/g, "");
  return (
    <h2 id={title}>
      <HashLink className={className} to={`#${title}`} smooth>
        {children}
      </HashLink>
    </h2>
  );
}
