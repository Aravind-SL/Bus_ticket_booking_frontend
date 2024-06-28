import {useState, useEffect} from 'react';
import {useBuses} from '@/stores';

interface BusesFroRouteProps {
  start?: Station,
  destination?: Station,
}
const BusRouteList = ({start, destination}: BusesFroRouteProps) => {

  const buses  = useBuses(state => state.items);
  const [filteredBus, setFilteredBus] = useState(buses);

  useEffect(() => {

    console.log(start);
    console.log(filteredBus);
    if (start !== undefined || destination !== undefined)
      setFilteredBus(buses.filter(b => b.route.fromStation.stationId === start?.stationId || b.route.toStation.stationId === destination?.stationId ));

  }, [start, destination]);


  return  (
    <ul className='flex flex-col items-center w-full mt-2'>
      {filteredBus.length > 0 ? filteredBus.map(b => 
        <li key={b.busId} className='flex w-full py-3 rounded transition hover:bg-gray-200 bg-background justify-evenly'>
          <span>{b.busNumber}</span>
          <span>{b.route.fromStation.stationName} - {b.route.toStation.stationName}</span>
          <span>{displayTime(b.departureTime)} - {displayTime(b.arrivalTime)}</span> 
        </li>) : <p>No Ride were found</p>}
    </ul>
  ) 
}

function displayTime(val:string ) {
  const [hrs, min] = val.split(':');
  return `${parseInt(hrs) % 12}:${min} ${parseInt(hrs) > 12 ? 'PM' : 'AM'}`
}


export default BusRouteList;
