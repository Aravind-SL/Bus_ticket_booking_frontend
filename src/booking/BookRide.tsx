import {Button} from "@/components/ui/button";
import {useParams} from "react-router-dom";
import { useBuses, useStations } from "@/stores";
import {displayTime} from "@/utils";



export const BookRide = () => {

  const {id} = useParams();


  const bus = useBuses(state => state.items.find(b => b.busId.toString() === id));

  

  return (
    <main className="flex w-full min-h-screen px-12 py-4">
      
      <section className="flex flex-col items-center justify-center space-y-4 ">
          <span className="inline-flex flex-col items-center">
            <span>{bus?.route.toStation.stationName}</span>
            <span>Arrives at {displayTime(bus?.arrivalTime)}</span>
          </span>
          <div className="flex flex-col items-center justify-center space-y-1 h-3/4">
            <div className="w-3 h-3 bg-primary"></div>
            <div className="w-1 h-full bg-primary"></div>
            <div className="w-3 h-3 bg-primary"></div>
          </div>
          <span className="inline-flex flex-col items-center">
            <span>{bus?.route.fromStation.stationName}</span>
            <span>Departs at {displayTime(bus?.departureTime)}</span>
          </span>
      </section>
      <section className="flex flex-col items-center justify-center w-1/3 ">
        <Button>Book</Button>
      </section>
      <section className="w-1/3">

      </section>

    </main>
  );

}
