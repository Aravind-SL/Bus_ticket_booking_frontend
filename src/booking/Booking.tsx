import * as Card from '@/components/ui/card';
import {useEffect, useState} from 'react';
import SelectBoxSearch from '@/components/SelectBoxSearch';
import BusRouteList from './BusRouteList';
import {MapPin} from 'lucide-react';
import {useStations} from '@/stores';

const Booking = () => {

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
              <SelectBoxSearch<Station>
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
            </>
          }
        </Card.CardContent>
        {start && destination &&
          <BusRouteList start={start} destination={destination} />
        }

      </Card.Card>


    </main>
  );
};

export default Booking;
