import type { ReactNode } from "react";

/** Centre le contenu et applique les marges latérales communes à toutes les sections. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
  );
}
