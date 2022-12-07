import * as lucide from "lucide-react";

type IconProps = {
  icon?: keyof typeof lucide;
};

export function Icon({ icon }: IconProps) {
  // if you need to print out all the icons, uncomment this:
  // console.log(Object.keys(lucide).join("\n"));
  if (!icon) {
    return null;
  }

  const Component = lucide[icon] as React.FC<React.SVGProps<SVGSVGElement>>;
  return <Component />;
}
