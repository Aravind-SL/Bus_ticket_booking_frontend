import {useBuses} from '@/stores';
import {EntityDetailPage} from './EntityDetailsPage';
import BusForm from './forms/BusForm';
import {useParams} from 'react-router-dom';

export const BusDetailPage = () => {

  const {id} = useParams();
  
  return <EntityDetailPage
    heading='Bus'
    deletable
    useData={useBuses}
    getId={b => b.busId}
    id={id}
    details={(b) => (
      <></>
    )}

    form={(b) => <BusForm bus={b}/> }
  />
}
