import * as lucide from "lucide-react";

interface Props {
  action: string | (() => void);
  children?: React.ReactNode;
  mode?: "primary" | "secondary" | "default" | "warning" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  icon?: keyof typeof lucide;
  submit?: boolean;
  title?: string;
}

const Icon = ({ icon }: { icon: keyof typeof lucide }) => {
  const Icon = lucide[icon] as React.FC<React.SVGProps<SVGSVGElement>>;
  return <Icon />;
};

export const Button = ({
  action,
  children,
  mode = "default",
  size = "md",
  className,
  icon,
  submit = false,
  title,
}: Props) => {
  const buttonClass = `btn btn-${mode} btn-${size} ${className}`;

  if (typeof action === "string") {
    return (
      <a href={action} className={buttonClass}>
        {icon && <Icon icon={icon} />}
        {children}
      </a>
    );
  }

  return (
    <button
      type={submit ? "submit" : "button"}
      title={title}
      className={buttonClass}
      onClick={() => {
        action && action();
      }}
    >
      {children}
    </button>
  );
};
