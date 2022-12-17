import clsx from "clsx";
import { error } from "console";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { PropsWithChildren, useEffect, useState } from "react";

type Mode = "info" | "success" | "warning" | "error";

const modeIcon = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

const textClass = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

interface Props {
  mode?: Mode;
  isLoading?: boolean;
}

export const InputError = ({
  children,
  mode = "error",
  isLoading,
}: PropsWithChildren<Props>) => {
  const [show, setShow] = useState(!!children);

  useEffect(() => {
    const id = setTimeout(() => {
      const hasError = !!children;
      setShow(hasError && !isLoading);
    });
    return () => clearTimeout(id);
  }, [children, isLoading]);

  const ModeIcon = modeIcon[mode];
  return (
    <div
      className={clsx(
        "flex w-full items-center gap-1 bg-transparent py-2 text-xs transition duration-200 ease-in-out",
        textClass[mode],
        show ? "h-4 opacity-100" : "opacity-0"
      )}
    >
      {children && <ModeIcon className="h-4 w-auto shrink-0" />}
      {children}
    </div>
  );
};
