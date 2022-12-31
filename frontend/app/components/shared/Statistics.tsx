type Props = {
  statistics: {
    value: string;
    label: string;
  }[];
};

export const Statistics = ({ statistics }: Props) => {
  return (
    <section className="body-font text-base-content">
      <div className="container mx-auto px-5">
        <div className="-m-4 flex flex-wrap justify-around text-center">
          {statistics.map(({ value, label }, index) => (
            <div key={index} className="w-1/2 p-4 text-center sm:w-1/4">
              <h2 className="font-suez text-secondary-content text-3xl font-medium sm:text-4xl">
                {value}
              </h2>
              <p className="leading-relaxed">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
