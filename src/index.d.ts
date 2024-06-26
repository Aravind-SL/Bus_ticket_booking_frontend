
type Station = {
  stationName: string,
  stationId: number,
  state: string
};

type Bus = {
  busNumber: number,
  busId: number,
  departureTime: Date,
  arrivalTime: Date
};

type Route = {
 routeId: number,
 fromStation: number,
 toStation:  number,
 distance: number
}

type User = {
  username: string,
}
