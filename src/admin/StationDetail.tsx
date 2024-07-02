import {useStations} from '@/stores';
import {useParams} from 'react-router-dom';
import {EntityDetailPage} from './EntityDetailsPage';
import StationsForm from './forms/StationsForm';


export const StationDetailPage = () => {

  const {id} = useParams();


  return id ?  (
        <EntityDetailPage 
          form={(st) => <StationsForm  station={st} />}
          deletable
          heading='Station'
          useData={useStations}
          getId={(s) => s.stationId}
          id={id}
          details={(entity) => (
            <article className='flex flex-col items-center'>
              <div className='inline-flex justify-start w-full space-x-2 '>
                <span className='w-1/2 text-right '>Station Name :</span>
                <span>{entity.stationName}</span>
              </div>
              <div className='inline-flex justify-start w-full space-x-2 '>
                <span className='w-1/2 text-right '>Station ID :</span>
                <span>{entity.stationId}</span>
              </div>
              <div className='inline-flex justify-start w-full space-x-2 '>
                <span className='w-1/2 text-right '>State :</span>
                <span>{entity.state}</span>
              </div>
            </article>
          )}
          />
  ): <p>Error.... ID is {id}</p>
};
