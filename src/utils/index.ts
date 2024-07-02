export function displayTime(val:string ) {
  const [hrs, min] = val.split(':');
  return `${parseInt(hrs) % 12}:${min} ${parseInt(hrs) > 12 ? 'PM' : 'AM'}`
}

export const  renderStation = (id: EntityID, stations: Station[]) => {

  return stations.find(st => st.stationId === id)

}

export function renderRoute(route: Route, stations: Station[]) {
  if (route.fromStation instanceof Station) {
    return `${route.fromStation.stationName} - ${route.toStation.stationName}`
  }
  return `${renderStation(route.fromStation, stations)} - ${renderStation(route.toStation, stations)}`
}
