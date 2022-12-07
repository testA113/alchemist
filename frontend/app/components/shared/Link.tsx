import { Link } from "@remix-run/react";




export function LinkButton() {
  return (
    <Link prefetch="intent" to={action} className={buttonClass}>
      {icon}
      {children}
    </Link>
  );
}
