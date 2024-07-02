import {useStations} from "@/stores";
import StationsForm from "./forms/StationsForm";
import EntityPage from "./EntityPage";

export const StationPage  = () => {
  return (
    <EntityPage 
      pageTitle="Stations"
      formTitle="Add Station"
      useData={useStations} 
      form={<StationsForm />}
      id={st => st.stationId}
      label={st => st.stationName}
    />
  );
}


