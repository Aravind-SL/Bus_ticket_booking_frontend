import { ColorMap, MessageMap } from "@/admin/BookingPage";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import {ListView} from "@/components/ListView";
import {Button} from "@/components/ui/button";
import {useBuses} from "@/stores";
import {useFetch} from "@/utils/hooks";
import { Outlet, Link } from "react-router-dom";
import {DialogTitle} from "@radix-ui/react-dialog";
import {displayTime} from "@/utils";

/**
* A page for viewing and managing authenticated information.
*/
const UserPage = () => {
  const { data: user, error, isLoading } = useFetch<User>("api/v1/users/me");
  const {data: bookings, error: bookingError, isLoading: bookingLoading } = useFetch<Booking[]>("api/v1/bookings/me");
  const buses = useBuses(state => state.items);
  

  return isLoading ? <p>Loading..</p> : 
    error !== null ? <p>{error.message}</p>: 
    (
    <div className="container w-full py-8">
      <div className="flex items-center justify-between w-full py-6 gap-3">

        <span>
          <p className="text-base md:text-lg">Hello, {user?.firstName} {user?.lastName}</p>
          <p className="text-muted-foreground">{user?.username}</p>
        </span>
        <Button asChild className="text-sm md:text-lg">
          <Link to="/book">
            Make a booking
          </Link>
        </Button>
      </div>

      <ListView<Booking>
        id={b => b.id}
        items={bookings ?? []}
        link={false}
        heading="Your Bookings"
        label={(b) =>{

          let bus = buses.find((b) => b.busId === b.busId);
          return bus && (
            <Dialog>
              <DialogTrigger className="w-full">
                <div className='w-full'>
                  <span className='inline-flex justify-between w-full text-xs text-muted-foreground'>
                    <span >Booking ID: {b.id}</span>
                    <span >Booked on: {b.bookingDate.toString()}</span>
                    <span >Journey on: {b.journeyDate.toString()}</span>
                  </span>
                  <div className='flex items-center w-full py-2 text-sm md:text-base'>
                    <div className='flex justify-between flex-1' >
                      <span >Bus: {bus.busNumber}</span>
                      <span>Seats: {b.seatBookings.length}</span>
                      <span>{bus.route.fromStation.stationName} - {bus.route.toStation.stationName}</span>
                      <span style={{color: ColorMap[b.status]}}>{MessageMap[b.status]}</span>
                    </div>
                  </div>
                </div>

              </DialogTrigger>
              <DialogContent>

                <DialogHeader>
                    <DialogTitle className="text-muted-foreground">Booking ID: {b.id}</DialogTitle>
                </DialogHeader>
                    <h3 className="text-lg font-semibold">Info</h3>
                    <div className="flex items-center justify-between">
                      <div className='flex flex-col' >
                        <span >Bus: {bus.busNumber}</span>
                        <span>{bus.route.fromStation.stationName} - {bus.route.toStation.stationName}</span>
                      </div>
                      <span style={{color: ColorMap[b.status]}}>{MessageMap[b.status]}</span>
                    </div>

                    <h3 className="text-lg font-semibold">Timing</h3>
                    <div className="flex flex-col" >
                        <span>Booked on: {b.bookingDate.toString()}</span>
                        <span>Journey Date: {b.journeyDate.toString()}</span>
                        <span className="mt-3">
                          Departs on: {displayTime(bus.departureTime)} 
                        </span>
                        <span >
                          Arrives Destination on: {displayTime(bus.arrivalTime)} 
                        </span>
                    </div>

                    <h3 className="text-lg font-semibold">Seats</h3>
                    <ul className="items-stretch grid grid-cols-4">
                     {b.seatBookings.map(s => <li key={s.id}>Seat No. {s.seatNumber}</li> )}
                    </ul>



              </DialogContent>




            </Dialog>

          )}
        }


      />



      <Outlet />
    </div>
  )
}


export default UserPage;
