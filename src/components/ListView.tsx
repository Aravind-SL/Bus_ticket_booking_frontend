import {Link} from 'react-router-dom';


interface ListViewProp<T> {
  heading: string,
  description?: string,
  items: T[],
  id: (d: T) => string | number
  label: (d: T) => string
}
export function  ListView<T>({heading, id, items, label, description}: ListViewProp<T>) {

  return (
    <>
      <h3 className="text-2xl font-semibold">{heading}</h3>
      {description ?? <p className="text-muted">{description}</p>}
      <ul>
        {
          items.map(e => (
            <li key={id(e)}><Link to={id(e).toString()}>{label(e)}</Link></li>
          ))
        }
      </ul>
      
    </>
)}
