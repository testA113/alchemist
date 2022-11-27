import clsx from "clsx"
import { ChevronRight } from "lucide-react"
import { Button } from "../shared/Button"

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
        "bg-base-100 flex flex-col prose md:prose-lg lg:prose-xl",
        "py-24 px-10vw w-full !max-w-full items-center"
      )}>
      {sectionData.title && <h1>{sectionData.title}</h1>}
      {sectionData.description && <h3>{sectionData.description}</h3>}
      <div className="flex flex-wrap w-full gap-8 mb-8">
        {showcases?.data.map((showcase, index) =>
          <div key={index} className={clsx("flex-1 h-48 bg-base-200 rounded-2xl min-w-[200px]", isModTwoOrThree(index) ? 'flex-[30%]' : 'flex-[60%]')}>{showcase.attributes.title}</div>
        )}
      </div>
      {sectionData.seeMoreButton && <Button action={sectionData.seeMoreButton.path} mode="link" size={sectionData.seeMoreButton.size}>
        {sectionData.seeMoreButton.text}
        <ChevronRight />
      </Button>}
    </section>
  )
}

function isModTwoOrThree(index: number,) {
  // 1 or 2 because of starting at index 0
  return index % 4 === 1 || index % 4 === 2
}