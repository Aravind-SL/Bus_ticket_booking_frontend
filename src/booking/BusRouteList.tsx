import {useState, useEffect} from 'react';
import {useFetch} from '@/utils/hooks';

interface BusesFroRouteProps {
  start: Station,
  destination: Station,
}
const BusRouteList = ({start, destination}: BusesFroRouteProps) => {

  const [path, setPath] = useState(`api/v1/buses/search?start=${start.stationId}&destination=${destination.stationId}`);
  const {isLoading, error, data: buses} = useFetch<Bus[]>(path);

  useEffect(() => {
    setPath(`api/v1/buses/search?start=${start.stationId}&destination=${destination.stationId}`);
  }, [start, destination]);



  return (start && destination) ? (
    <ul className='flex flex-col items-center w-full'>
      {isLoading ? <p>Loading...</p> :
        error ? <p>{error.message}</p>
          : buses && buses.length > 0 ? buses.map(b => <li key={b.busId}>{b.busNumber} {displayTime(b.departureTime)} - {displayTime(b.arrivalTime)} </li>) : <p>No Ride were found</p>}
    </ul>
  ) : <></>
}

function displayTime(val: Date | string) {
  let d = new Date(val);

  return `${d.getHours() % 12}:${d.getMinutes()} ${d.getHours() > 12 ? 'PM' : 'AM'}`
}


export default BusRouteList;
