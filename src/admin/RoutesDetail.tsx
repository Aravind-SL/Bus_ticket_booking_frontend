import {useRoutes, useStations} from '@/stores';
import {useParams} from 'react-router-dom';
import {EntityDetailPage} from './EntityDetailsPage';


export const RoutesDetailPage = () => {

  const {id} = useParams();
  const stations = useStations(state => state.items);


  return id ?  (
        <EntityDetailPage 
          deletable
          heading='Route'
          useData={useRoutes}
          getId={(r) => r.routeId}
          id={id}
          details={(entity) =>{ 
            return (
            <article className='flex flex-col items-center'>
              <div className='inline-flex justify-start w-full space-x-2'>
                <span className='w-1/2 text-right'>Route Id:</span>
                <span>{entity.routeId}</span>
              </div>
              <div className='inline-flex justify-start w-full space-x-2'>
                <span className='w-1/2 text-right'>Start Station :</span>
                <span>{stations.find((st) => entity.fromStation === st.stationId)?.stationName }</span>
              </div>
              <div className='inline-flex justify-start w-full space-x-2'>
                <span className='w-1/2 text-right'>Destination Station :</span>
                <span>{stations.find((st) => entity.toStation === st.stationId)?.stationName}</span>
              </div>
              <div className='inline-flex justify-start space-x-2 w-[250px]'>
                <span className='w-[128px] text-right'>Distance :</span>
                <span>{entity.distance}</span>
              </div>
            </article>
          );}}
          />
  ): <p>Error.... ID is {id} is not found</p>
};
