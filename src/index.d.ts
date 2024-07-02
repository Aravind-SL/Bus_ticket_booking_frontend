type EntityID = string | number;

type Station = {
  stationName: string,
  stationId: number,
  state: string
};

type Bus = {
  busNumber: number,
  totalSeats: number,
  busId: EntityID,
  departureTime: string,
  arrivalTime: string
  route: Route,
  pricePerUnitDistance: number,
  seats: any[]
};

type Route = {
  routeId: EntityID,
  fromStation: number | Station,
  toStation: number | Station,
  distance: number
}

type User = {
  username: string,
  firstName: string,
  lastName: string,
}

enum BookingStatus {
  Pending = "PENDING", 
  Complete = "COMPLETE", 
  Failure = "FAILURE"
}

type Booking = {
  id: EntityID,
  user: User,
  busId: EntityID,
  seatBookings: EntityID,
  bookingDate: Date,
  journeyDate: Date,
  status: BookingStatus
}


type DailyBookingStatus = {
  busId: number,
  date: Date,
  seatsAvailable: number
}
