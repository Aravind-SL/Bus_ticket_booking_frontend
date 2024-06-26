import EntityPage from "./EntityPage";
import RoutesForm from './forms/RoutesForm';
import { useRoutes } from "@/stores";

export const RoutePage  = () => {
  return (
    <EntityPage 
      pageTitle="Routes"
      useData={useRoutes}
      id={(r) => r.routeId}
      label={(r) => r.routeId.toString()}
      formTitle="Add Route"
      form={<RoutesForm />}
    />
  );
}


