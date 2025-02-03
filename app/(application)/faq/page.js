import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

import faq from "@/content/faq"

export default function FAQ() {
  return (
    <article className='w-full pb-16 px-4'>
      <div
        className="mb-16 bg-cover bg-center bg-[url(/faq-header.webp)]"
      >
        <h1 className={cn(
          "text-3xl md:text-6xl text-white font-bold tracking-wider text-center",
          "block h-full w-full py-16 md:py-52 px-4 bg-black/50"
        )}>Frequently Asked Questions</h1>
      </div>
      <div className="border-2 border-[#222] shadow-retro p-6 md:p-12 max-w-screen-xl md:px-20 mx-auto bg-purple-100">
        <Accordion type="multiple" collapsible>
          {faq.map(({ title, description }, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="bg-white border-2 border-[#222] shadow-retro my-4 px-4">{title}</AccordionTrigger>
              <AccordionContent>{description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </article>
  )
}