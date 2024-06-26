import { FormField, FormItem, FormLabel, FormControl, FormMessage  } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import {toast} from '@/components/ui/use-toast';
import {useRoutes, useStations} from '@/stores';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {ReloadIcon} from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import SelectBoxSearch from '@/components/SelectBoxSearch';
import {Label} from '@radix-ui/react-label';

const RouteFormSchema = z.object({
  fromStationId:  z.string(),
  toStationId: z.string()
});


interface RouteFormProps { route? : Route};
export default ({route}: RouteFormProps) => {

  const addRoute = useRoutes(state => state.add);

  const [isLoading, setLoading] = useState(false);
  const stations =  useStations((state) => state.items);
  const fetchNow = useStations((state) => state.fetchAll);

  useEffect(() => {
    if (!stations){
      setLoading(true)
      fetchNow().finally(() => setLoading(false));
    }
  },  []);

  const [startList, setStartList] = useState<Station[]>([]);
  const [destinationList, setDestinationList] = useState<Station[]>([]);
  const [start, setStart] = useState<Station>();
  const [destination, setDestination] = useState<Station>();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  useEffect(() => {
    

    if (start && stations) 
      setDestinationList(stations.filter((s) => s !== start));
    else if (stations)
      setDestinationList(stations);

    if (destination && stations) 
      setStartList(stations.filter((s) => s !== destination));
    else if (stations)
      setStartList(stations);

  }, [start, destination, stations]);


  const onSubmit = async (event) => {
    event.preventDefault();
    let data = event.value;
    console.log(data);
    try {
      toast({
        title: "Added Route",
        description: (
          <p>New Route has been added</p>
        )
      });
    } catch (e) {
      toast({
        title: "Failed to add Route ",
        description: (
          <p>{e.data ? e.data : e.message}</p>
        )
      });
  }}

  return isLoading ? <p>Loading...</p>: (
    <form onSubmit={onSubmit} className='w-full space-y-5'>
          <Label >Start Station</Label>
          <SelectBoxSearch
            label='Select Station'
            items={startList}
            valueTransform={(st) => st.stationName}
            searchPlaceHolder='Search for Station'
            emptyMessage='No stations found'
            id={(st) => st.stationId.toString()}
            icon={
              <MapPin className='w-5 h-5' />
            }
            getValueCallback={setStart}
          />
          <input hidden value={start?.stationId} />
      <DialogClose asChild>
        <Button type="submit" disabled={isFormSubmitting} className="w-full mt-5">
          {isFormSubmitting && (<ReloadIcon className="w-4 h-4 mr-2 animate-spin"/>)}
          <span>{route ? "Edit" : "Add"}</span> 
        </Button>
      </DialogClose>
    </form>
  );
  
  /*
    *
        <DialogClose asChild>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5'>
            <FormField 
              name="fromStationId"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Starting Station</FormLabel>
                  <FormControl>
                    <SelectBoxSearch
                      label='Select Start'
                      items={startList}
                      valueTransform={(st) => st.stationName}
                      searchPlaceHolder='Search for Station'
                      emptyMessage='No stations found'
                      id={(st) => st.stationId.toString()}
                      icon={
                        <MapPin className='w-5 h-5' />
                      }
                      getValueCallback={setStart}
                    />
                    <Input hidden  {...field}  value={start?.stationId}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="toStationId"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Destination Station</FormLabel>
                  <FormControl>
                    <SelectBoxSearch<Station>
                      label='Select Destination'
                      items={destinationList}
                      valueTransform={(st) => st.stationName}
                      searchPlaceHolder='Search for Station'
                      emptyMessage='No stations found'
                      icon={
                        <MapPin className='w-5 h-5' />
                      }
                      id={(st) => st.stationId.toString()}
                      getValueCallback={setDestination}
                    />
                    <Input hidden  {...field}  value={destination?.stationId}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="distance"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Distance</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full mt-5">

              {form.formState.isSubmitting && (<ReloadIcon className="w-4 h-4 mr-2 animate-spin"/>)}
              <span>{route ? "Edit" : "Add"}</span> 
            </Button>
          </form>
        </DialogClose>
    */

}
