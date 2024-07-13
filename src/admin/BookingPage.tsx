import EntityPage from './EntityPage';
import { useBookings, useBuses} from '@/stores';

export const BookingPage = () => {

  const buses = useBuses(state => state.items);
  return (
    <EntityPage 
      pageTitle="Bookings"
      useData={useBookings}
      id={(b) => b.id}
      label={(b) =>{

        let bus = buses.find((b) => b.busId === b.busId);
        return bus && (
        <div className='w-full'>
          <span className='inline-flex justify-between w-full text-xs text-muted-foreground'>
            <span >Booking ID: {b.id}</span>
            <span >Bus: {bus.busNumber}</span>
            <span >Booked on: {b.bookingDate.toString()}</span>
            <span >Journey on: {b.journeyDate.toString()}</span>
          </span>
          <div className='flex items-center w-full py-2'>
            <div className='flex justify-between flex-1' >
              <span className='inline-flex flex-col'>
                <span>{b.user.firstName} {b.user.lastName}</span>
                <span className='text-xs text-muted-foreground'>{b.user.username}</span>
              </span>
              <span>Seats: {b.seatBookings.length}</span>
              <span>{bus.route.fromStation.stationName} - {bus.route.toStation.stationName}</span>
              <span style={{color: ColorMap[b.status]}}>{MessageMap[b.status]}</span>
            </div>
          </div>
        </div>
      )}}
    />
  );
}

export const ColorMap = {
  PENDING: "orange",
  COMPLETE: "green",
  FAILURE: "red"
}

export const MessageMap = {
  PENDING: "Waiting",
  COMPLETE: "Approved",
  FAILURE: "Rejected"
}
