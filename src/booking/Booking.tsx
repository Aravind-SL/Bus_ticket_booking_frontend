import * as Card from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent  } from '@/components/ui/popover';
import {CommandInput, Command, CommandList, CommandItem, CommandEmpty, CommandGroup } from '@/components/ui/command';
import {ScrollArea} from '@/components/ui/scroll-area';
import {useFetch} from '@/utils/hooks';
import {useDeferredValue, useEffect, useRef, useState} from 'react';
import {Button} from '@/components/ui/button';
import {MapPin} from 'lucide-react';

const Booking = () => {

  const {isLoading, data: stations} = useFetch<Station[]>('api/v1/stations');

  const [start, setStart] = useState<Station>();
  const [destination, setDestination] = useState<Station>();

  // TODO: Search Buses  by start and destination route

  return (
    <main className="container py-32">

      <Card.Card>
        <Card.CardHeader>
          <Card.CardTitle>
            Search
          </Card.CardTitle>
        </Card.CardHeader>
        <Card.CardContent className='flex items-center justify-around gap-4'>
          {isLoading && <p>Loading...</p>}
          {stations &&
            <>
              <SelectItem 
                label='Select Start'
                items={stations} 
                valueTransform={(st) => st.stationName} 
                searchPlaceHolder='Search for Station'
                emptyMessage='No stations found'
                id={(st) => st.stationId.toString()}
                icon={
                  <MapPin className='w-5 h-5'/>
                 }
                getValueCallback={setStart}
              />
              <SelectItem 
                label='Select Destination'
                items={stations} 
                valueTransform={(st) => st.stationName} 
                searchPlaceHolder='Search for Station'
                emptyMessage='No stations found'
                icon={
                  <MapPin className='w-5 h-5'/>
                 }
                id={(st) => st.stationId.toString()}
                getValueCallback={setDestination}
              />
            </>
          }
        </Card.CardContent>

      </Card.Card>

    </main>
  );
};

interface SelectBoxProp<T> {
  items: T[],
  valueTransform: (d: T) =>  string,
  searchPlaceHolder: string,
  label: string,
  emptyMessage: string,
  id: (d:T) => string,
  icon: JSX.Element,
  getValueCallback: (d: T) => void
}
function SelectItem<T>({items, icon = <></>, id, searchPlaceHolder, getValueCallback, emptyMessage ,label, valueTransform}: SelectBoxProp<T>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<T|null>(null);

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
          <CommandInput placeholder={searchPlaceHolder}/>
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {
                items.map((e) => (
                  <CommandItem 
                    key={id(e)} 
                    value={id(e)} 
                    onSelect={(val) => {
                      setValue(val === id(e) ?  e: null);
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


interface SearchBoxProp<T> {
  items: T[],
  placeHolder: string,
  emptyMessage: string,
  searchCmp: (d: T) => string,
  repr: (d: T) => (JSX.Element | string),
  id?: (d: T) => number | string
}
function SearchBox<T>({items, placeHolder = "", emptyMessage = "", id, searchCmp, repr}: SearchBoxProp<T>) {
  const [boxVal, setBoxVal] = useState("");
  const searchQuery = useDeferredValue(boxVal);
  const [filteredItems, setFilterItems] = useState(items);
  const ref = useRef();


  useEffect(() => {

    setFilterItems(
      items.filter((i) => searchCmp(i).toLowerCase().includes(searchQuery.toLowerCase()))
    );

  }, [searchQuery])

  return (
    <div className='relative'>
      <Input placeholder={placeHolder} ref={ref} onChange={(e) => setBoxVal(e.target.value)} />
      <ScrollArea className='absolute top-0 left-0 w-full h-32 z-2' hidden={searchQuery.length === 0}>
        {(filteredItems.length === 0) && <div className='w-full text-center italics'>{emptyMessage}</div>}
        {filteredItems.map((e, i) =>
          <ul className='w-full'>
            <li className='w-full' key={id ? id(e) : i} >{repr(e)}</li>
          </ul>
        )}
      </ScrollArea>

    </div>
  );


};



export default Booking;
