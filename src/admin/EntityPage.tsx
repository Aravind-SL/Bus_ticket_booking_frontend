import {Plus} from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import type {Store} from '@/stores';
import FormDialog from "@/components/FormDialog";
import { ListView } from "@/components/ListView";


interface EntityPageProps<T> {
  id: (d: T) => number | string,
  label: (d: T) => string,
  useData: Store<T>,
  pageTitle: string,
  formTitle: string,
  form: ReactNode
}

export default function<T>({pageTitle, form, formTitle, useData , id, label}: EntityPageProps<T>) {

  const [loading, setLoading] = useState(false);
  const items =  useData((state) => state.items);
  const fetchNow = useData((state) => state.fetchAll);

  useEffect(() => {
    if (!items){
      setLoading(true)
      fetchNow().finally(() => setLoading(false));
    }
  },  []);

  return (
    <section className="relative w-4/5 mx-auto mt-8 h-4/5">
    
      {loading && <p>Loading....</p>}

      { items &&  
        <ListView 
          items={items}
          heading={pageTitle}
          id={id}
          label={label}
        />
      }

      <FormDialog formTitle={formTitle} icon={<Plus  className="w-4 h-4"/>}>
        {form}
      </FormDialog>
    </section>
  );
}


