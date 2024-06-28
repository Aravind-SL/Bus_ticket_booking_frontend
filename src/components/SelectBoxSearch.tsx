import {Button} from '@/components/ui/button';
import {Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover';
import {CommandInput, Command, CommandList, CommandItem, CommandEmpty, CommandGroup} from '@/components/ui/command';
import { useEffect, useState } from "react";
interface SelectBoxProp<T> {
  items: T[],
  valueTransform: (d: T) => string,
  searchPlaceHolder: string,
  label: string,
  emptyMessage: string,
  id: (d: T) => string,
  icon: JSX.Element,
  getValueCallback: (d: T) => void
}

function SelectBoxSearch<T>({items, icon = <></>, id, searchPlaceHolder, getValueCallback, emptyMessage, label, valueTransform}: SelectBoxProp<T>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    if (value)
      getValueCallback(value);
  }, [value, getValueCallback]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className='justify-start w-full space-x-4'
        >
          {icon}<span>
            {
              value === null ? label : valueTransform(value)
            }</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent >
        <Command>
          <CommandInput placeholder={searchPlaceHolder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {
                items.map((e) => (
                  <CommandItem
                    key={id(e)}
                    value={valueTransform(e)}
                    onSelect={(val) => {
                      setValue(val === valueTransform(e) ? e : null);
                      setOpen(false);
                    }}
                  >
                    {valueTransform(e)}
                  </CommandItem>
                ))
              }

            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectBoxSearch;
