import clsx from "clsx"

type Props = {
  children: React.ReactNode
  imageUrl: string
  imageClasses?: string
  childClasses?: string
}

export function ImageCard({ children, imageUrl, imageClasses, childClasses }: Props) {
  return (
    <div
      className={clsx("h-full rounded-2xl overflow-hidden text-center bg-cover bg-center transition ease-out transform duration-300 hover:opacity-90", imageClasses)}
      style={{
        backgroundImage: `url(${ENV.STRAPI_BASEURL}${imageUrl})`,
      }}
    >
      <div className={childClasses}>
        {children}
      </div>
    </div>
  )
}
