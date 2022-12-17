import clsx from "clsx";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { PropsWithChildren } from "react";

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
}

export const InputError = ({
  children,
  mode = "error",
}: PropsWithChildren<Props>) => {
  const ModeIcon = modeIcon[mode];
  return (
    <div className="w-full bg-transparent py-2 text-xs">
      <div className={clsx(textClass[mode])}>
        <div className="flex items-center gap-2">
          <ModeIcon className="h-4 w-auto shrink-0" />
          {children}
        </div>
      </div>
    </div>
  );
};
