import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  imageUrl?: string;
  imageClasses?: string;
  childClasses?: string;
};

export function ImageCard({
  children,
  imageUrl,
  imageClasses,
  childClasses,
}: Props) {
  return (
    <div
      className={clsx(
        "h-full transform overflow-hidden rounded-2xl bg-cover bg-center text-center transition duration-300 ease-out hover:opacity-90",
        imageClasses
      )}
      style={{
        backgroundImage: imageUrl && `url(${imageUrl})`,
      }}
    >
      <div className={childClasses}>{children}</div>
    </div>
  );
}
