import {useLocation} from "react-router-dom";



export const BookRide = () => {

  const location = useLocation();




  return (<>BookRide {location.state}</>);

}
