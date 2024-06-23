"use client"

import { useEffect, useState } from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Filter({ brands, onFilter }) {
  const [open, setOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedType, setSelectedType] = useState('')

  useEffect(() => {
    onFilter({
      brand: selectedBrand,
      switchType: selectedType,
    })
  }, [selectedBrand, selectedType])

  return (
    <div className="flex items-center justify-between gap-2 mb-8">
      <div>
        <p className="text-sm uppercasefont-bold mb-2">Switch Brand:</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between pe-2"
            >
              {selectedBrand
                ? brands.find((brand) => brand.slug.current === selectedBrand).name
                : "Select Brand..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search brands..." className="h-9" />
              <CommandList>
                <CommandEmpty>No brands found.</CommandEmpty>
                <CommandGroup>
                  {brands?.map((brand) => (
                    <CommandItem
                      key={brand?._id}
                      value={brand?.slug?.current}
                      className="cursor-pointer"
                      onSelect={(currentValue) => {
                        setSelectedBrand(currentValue === selectedBrand ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {selectedBrand === brand?.slug?.current && <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                        )}
                      />}
                      {brand?.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}