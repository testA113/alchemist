import type { PropsWithChildren } from "react";
import { clsx } from "clsx";

type Props = {
  statistics: {
    value: string;
    label: string;
  }[];
  className?: string;
};

export const Statistics = ({
  statistics,
  children,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <section
      className={clsx(
        "text-base-content bg-base-200 container flex flex-col gap-2 rounded-2xl p-6 text-center",
        className
      )}
    >
      <div className="flex flex-wrap justify-around gap-2 text-center">
        {statistics.map(({ value, label }, index) => (
          <div key={index} className="w-min text-center">
            <h2 className="font-suez text-secondary-content text-3xl font-medium sm:text-4xl">
              {value}
            </h2>
            <p className="leading-relaxed">{label}</p>
          </div>
        ))}
      </div>
      {children}
    </section>
  );
};
