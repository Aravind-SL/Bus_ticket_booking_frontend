import { toast } from "@/components/ui/use-toast";
import {Plus} from "lucide-react";
import { useState, useEffect } from "react";
import {useStations} from "@/stores";
import FormDialog from "@/components/FormDialog";
import { ListView } from "@/components/ListView";
import StationsForm from "./forms/StationsForm";

export const StationPage  = () => {

  const [loading, setLoading] = useState(false);
  const stations = useStations((state) => state.items);
  const fetchNow = useStations((state) => state.fetchAll);

  useEffect(() => {
    if (!stations){
      setLoading(true)
      fetchNow().finally(() => setLoading(false));
    }
  },  []);

  const addStation = useStations(state => state.add);

  const onSubmit = async (data) => {
    try {
      await addStation(data);
      toast({
        title: "Added Station " + data.stationName,
        description: (
          <p>The station {data.stationName} is added Successfully </p>
        )
      });

    } catch (e) {
      toast({
        title: "Failed to add Station " + data.stationName,
        description: (
          <p>{e.data ? e.data : e.message}</p>
        )
      });

    }
  }


  return (
    <section className="relative w-4/5 mx-auto mt-8 h-4/5">
    
      {loading && <p>Loading....</p>}

      { stations &&  
        <ListView 
          items={stations}
          heading="Stations"
          id={(st) => st.stationId}
          label={(st) => st.stationName}
        />
      }

      <FormDialog icon={<Plus  className="w-4 h-4"/>}>
        <StationsForm onSubmit={onSubmit} />
      </FormDialog>
    </section>
  );
}


