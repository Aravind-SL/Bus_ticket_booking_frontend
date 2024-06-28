import EntityPage from "./EntityPage";
import BusForm from './forms/BusForm';
import {useBuses } from "@/stores";

export const BusPage  = () => {
  return (
    <EntityPage 
      pageTitle="Buses"
      useData={useBuses}
      id={(b) => b.busId}
      label={(b) => <span className="inline-flex w-full px-4">
          <span className="w-1/3">
            {b.busNumber}
          </span>
          <span className="w-1/3 text-center"> {b.route.fromStation.stationName} - {b.route.toStation.stationName}</span> 
          <span className="w-1/3 text-right">
            {b.pricePerUnitDistance}
          </span>
        </span>
      }
      formTitle="Add Bus"
      form={<BusForm />}
    />
  );
}


