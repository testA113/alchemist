import clsx from "clsx";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface Props {
  message: string;
  mode?: "info" | "success" | "warning" | "error";
}
export const Alert = ({ message, mode = "info" }: Props) => {
  const modeClass = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  };
  const modeIcon = {
    info: <Info />,
    success: <CheckCircle2 />,
    warning: <AlertTriangle />,
    error: <XCircle />,
  };

  return (
    <div className="px-8 py-4">
      <div className={clsx("alert", modeClass[mode], "shadow-lg")}>
        <div>
          {modeIcon[mode]}
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};
