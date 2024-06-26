import FormDialog from "@/components/FormDialog";
import { Plus } from 'lucide-react';
import { ListView } from "@/components/ListView";
import { toast } from '@/components/ui/use-toast';
import { useState, useEffect } from "react";
import { useRoutes } from '@/stores';

export const RoutePage  = () => {

  const [loading, setLoading] = useState(false);
  const routes = useRoutes((state) => state.items);
  const fetchNow = useRoutes((state) => state.fetchAll);

  useEffect(() => {
    if (!routes){
      setLoading(true)
      fetchNow().finally(() => setLoading(false));
    }
  },  []);

  const addRoute = useRoutes(state => state.add);

  const onSubmit = async (data) => {
    try {
      await addRoute(data);
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

      { routes &&  
        <ListView 
          items={routes}
          heading="Routes"
          id={(rt) => rt.routeId}
          label={(rt) => rt.routeId.toString()}
        />
      }

      <FormDialog icon={<Plus  className="w-4 h-4"/>}>
        <p>Hell</p>
      </FormDialog>
    </section>
  );
}


