import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useBuses} from '@/stores';
import { displayTime } from '@/utils';

interface BusesFroRouteProps {
  start?: Station,
  destination?: Station,
}
const BusRouteList = ({start, destination}: BusesFroRouteProps) => {

  const buses  = useBuses(state => state.items);
  const [filteredBus, setFilteredBus] = useState(buses);

  useEffect(() => {
    if (start !== undefined || destination !== undefined)
      setFilteredBus(buses.filter(b => b.route.fromStation.stationId === start?.stationId || b.route.toStation.stationId === destination?.stationId ));
  }, [start, destination]);


  return  (
    <ul className='flex flex-col items-center w-full mt-2 space-y-3'>
      {filteredBus.length > 0 ? filteredBus.map(b => 
        <Link to={b.busId.toString()} className='w-full'>
          <li key={b.busId} className='flex w-full px-4 py-3 rounded transition hover:bg-gray-200 bg-background '>
            <span className='w-1/3'>{b.busNumber}</span>
            <span className='w-1/3 text-center'>{b.route.fromStation.stationName} - {b.route.toStation.stationName}</span>
            <span className='w-1/3 text-right'>{displayTime(b.departureTime)} - {displayTime(b.arrivalTime)}</span> 
          </li>
        </Link>) : <p>No Ride were found</p>}
    </ul>
  ) 
}


export default BusRouteList;
