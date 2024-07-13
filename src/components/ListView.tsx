import {ReactNode} from 'react';
import {Link} from 'react-router-dom';


interface ListViewProp<T> {
  heading: string,
  description?: string,
  items: T[],
  id: (d: T) => string | number
  label: (d: T) => string | ReactNode,
  link?: boolean
}
export function  ListView<T>({heading, id, items, label, description, link = true}: ListViewProp<T>) {

  return (
    <>
      <h3 className="text-2xl font-semibold">{heading}</h3>
      {description ?? <p className="text-muted">{description}</p>}
      <ul className='flex flex-col w-full mt-6 space-y-2'>
        {
          items.map(e => (
            <li key={id(e)}>
              {link ? 
                <Link to={id(e).toString()} >
                  <div className='w-full px-4 py-3 rounded hover:bg-gray-200 transition transition-color bg-background '>
                    {label(e)}
                  </div>
                </Link>
                :
                <div className='w-full px-4 py-3 rounded hover:bg-gray-200 transition transition-color bg-background '>
                  {label(e)}
                </div>

              }
            </li>
          ))
        }
      </ul>
      
    </>
)}
