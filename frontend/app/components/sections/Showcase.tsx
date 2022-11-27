import clsx from "clsx"

import type { Showcase as ShowcaseType } from '../shared/types'

import type { ShowcaseValues } from "./types"

type ShowcaseData = {
  data: ShowcaseType[]
}

type Props = {
  sectionData: ShowcaseValues
}

export function Showcase({ sectionData }: Props) {
  const showcases = sectionData.showcases as ShowcaseData | undefined
  return (
    <section
      className={clsx(
        "bg-base-100 flex flex-col gap-x-24 prose md:prose-lg lg:prose-xl",
        "py-24 px-10vw w-full md:flex-row flex-wrap !max-w-full"
      )}>
      <h1>{sectionData.title}</h1>
      <h3>{sectionData.description}</h3>
      <div className="flex flex-row gap-8">
        {showcases?.data.map((showcase, index) =>
          <div key={index} className={clsx("flex-1 h-48 bg-base-200 rounded-2xl", isModTwoOrThree(index) ? 'flex-[66%]' : 'flex-[34%]')}>{showcase.attributes.title}</div>
        )}
      </div>
    </section>
  )
}

function isModTwoOrThree(index: number,) {
  // 1 or 2 because of starting at index 0
  return index % 4 === 1 || index % 4 === 2
}