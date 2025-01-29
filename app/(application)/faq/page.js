import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const data = [
  { title: 'Question 1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos magni recusandae sunt dolore quis hic cum, aperiam, at quam accusamus iusto voluptatibus eius numquam a officiis quasi! Officiis, ducimus alias.' },
  { title: 'Question 2', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos magni recusandae sunt dolore quis hic cum, aperiam, at quam accusamus iusto voluptatibus eius numquam a officiis quasi! Officiis, ducimus alias.' },
  { title: 'Question 3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos magni recusandae sunt dolore quis hic cum, aperiam, at quam accusamus iusto voluptatibus eius numquam a officiis quasi! Officiis, ducimus alias.' },
]

export default function FAQ() {
  return (
    <article className='w-full pb-16'>
      <div
        className="mb-16 bg-cover bg-center bg-[url(/faq-header.webp)]"
      >
        <h1 className={cn(
          "text-3xl md:text-6xl text-white font-bold tracking-wider text-center",
          "block h-full w-full py-16 md:py-64 px-4 bg-black/50"
        )}>Frequently Asked Questions</h1>
      </div>
      <div className="max-w-4xl w-full mx-auto px-4">
        <Accordion type="multiple" collapsible>
          {data.map(({ title, description }, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </article>
  )
}