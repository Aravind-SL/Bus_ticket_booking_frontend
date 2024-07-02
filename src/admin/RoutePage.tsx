import EntityPage from "./EntityPage";
import RoutesForm from './forms/RoutesForm';
import { useRoutes, useStations } from "@/stores";

export const RoutePage  = () => {
  const stationName = useStations(state => (id: EntityID) => state.items.find((s) => s.stationId === id)?.stationName);
  return (
    <EntityPage 
      pageTitle="Routes"
      useData={useRoutes}
      id={(r) => r.routeId}
      label={(r) => <span className="inline-flex w-full"> <span className="w-1/3"> {stationName(r.fromStation)} - {stationName(r.toStation)}</span> <span>Distance: {r.distance}</span> </span>}
      formTitle="Add Route"
      form={<RoutesForm />}
    />
  );
}


