import clsx from "clsx";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type Mode = "info" | "success" | "warning" | "error";

const modeIcon = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

const modeClass = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

interface Props {
  message: string;
  mode?: Mode;
}

export const Alert = ({ message, mode = "info" }: Props) => {
  const ModeIcon = modeIcon[mode];
  return (
    <div className="max-w-[1000px] px-8 pt-36 pb-4">
      <div className={clsx("alert", modeClass[mode], "shadow-lg")}>
        <div className="flex items-stretch">
          <ModeIcon className="shrink-0" />
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};
