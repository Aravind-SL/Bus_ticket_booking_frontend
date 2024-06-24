import {useEffect, useState} from "react";
import * as Card from '@/components/ui/card';
import { useFetch } from "@/utils/hooks";

const Browse = () => {

  const [stations, setStations] = useState<Station[]>([]);

  const reprRoutes = (route: Route) => {
    return <>{findStation(stations, route.fromStation).stationName} - {findStation(stations, route.toStation).stationName}</>
  }


  return (
  
    <main className="container py-4">
      <ListEntities<Station> path="api/v1/stations" repr={(d) => d.stationName} setData={setStations} />
      <ListEntities<Bus> path="api/v1/buses" repr={(d) => d.busNumber} />
      <ListEntities<Route> path="api/v1/routes" repr={reprRoutes} />
    </main>

 )
};

interface ListEntitiesProps<T> {
  path: string,
  repr: (d: T) => (string | number |JSX.Element),
  dataId?: (d: T) => number,
  setData?: (d: T[]) => void
}
function ListEntities<T>({path, repr , dataId, setData = () => {}}: ListEntitiesProps<T>) {

  const {isLoading, data, error} = useFetch<T[]>(path);
  useEffect(() => {
    if (data !== null){
      setData(data);
    }
  }, [data, setData]);

  return (
      <Card.Card className="w-[300px]">
        <Card.CardHeader>
          <Card.CardTitle>Stations</Card.CardTitle>
        </Card.CardHeader>
        <Card.CardContent >
          {isLoading && <p>Loading...</p> }
          {error && <p>Error {error.message}</p>} 
          {data && 
            <ul className="flex flex-col items-center">
              {data.map((d, k) => <li key={dataId? dataId(d): k }>{repr(d)}</li>)}
            </ul>
          }
        </Card.CardContent>
      </Card.Card>
  );
};


function findStation(stations: Station[], id: number): Station {
  let station = stations.find((s) => s.stationId === id);
  if (!station) throw new Error("Station not found");
  return station;
}

export default Browse;
