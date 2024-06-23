import { ArrowRight } from "lucide-react";
export const loader = async () => {
    return {

    }
}

const UserHistory = () => {
    return <>
      <h1 className="text-2xl">My Booking</h1>
      <ul className="flex flex-col items-center w-full px-3 py-8">
        <UserHistoryListItem from="placeA" to="placeB"  />
      </ul>   
    </>
}


interface ItemProp {
  from: string;
  to: string;
  takeOff?: Date;
  estimatedDropOff?: Date;
}
type IUserHistoryListItem = (props: ItemProp) => JSX.Element
const UserHistoryListItem: IUserHistoryListItem = ({from, to, takeOff, estimatedDropOff}) => {
  return (
      <li className="flex items-center justify-between w-full px-8 border-2 rounded border-secondary-foreground">
        <span className="inline-flex items-center justify-start py-3 space-x-4 text-gray-900/70">
          <span>{from}</span>
          <span><ArrowRight className="w-4 h-4" /></span>
          <span>{to}</span>
        </span>
        {(!takeOff || !estimatedDropOff ?
        <p className="text-rose-500">Booking Pending</p>: 
        <span className="flex flex-col items-end">
          <span>
            Departs at: {takeOff.toDateString()}
          </span>
          <span>
             Reachs at: {estimatedDropOff.toDateString()}
          </span>
        </span>
        )}
        <a href="ome">View</a>
      </li>
  );
};



export default UserHistory;
