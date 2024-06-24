type EntityID = string | number;

type Station = {
  stationName: string,
  stationId: number,
  state: string
};

type Bus = {
  busNumber: number,
  busId: number,
  departureTime: string,
  arrivalTime: string
  route: Route,
  pricePerUnitDistance: number,
  seats: any[]
};

type Route = {
 routeId: number,
 fromStation: number | Station,
 toStation:  number | Station,
 distance: number
}

type User = {
  username: string,
  firstName: string,
  lastName: string,
}
