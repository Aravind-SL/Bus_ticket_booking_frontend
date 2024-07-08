import { Button } from '@/components/ui/button';
import {useAuth} from '@/auth/AuthProvider';
import {Link, useLocation} from 'react-router-dom';

  
export default function NavBar() {

  const {token} = useAuth();
  const path = useLocation();

  return(
      <header className='border-b-2' hidden={path.pathname === '/auth'}>
        <div className='container flex items-center w-full font-medium'>

            <div className="sm:flex-auto sm:items-start sm:justify-between">
              <Link to="/home" className="flex items-start mb-2 sm:mb-0 space-x-3 rtl:space-x-reverse">
                  <img className='mb-2 w-14 h-14 md:w-12 ' src="https://img.freepik.com/premium-vector/logo-bus-icon-school-bus-vector-isolated-transport-bus-silhouette-design-black-bus_653669-3055.jpg " alt="App logo" />
                  <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">Busy Ah!</span>
              </Link>
            </div>
            
            <nav className='flex items-center w-1/3 h-full text-sm justify-evenly' >
              {token && <Link to="/home" ><span className='h-full hover:bg-secondary'>Home</span></Link> }
              <Link to="/book">Book a Ride</Link>
              <Link to="#">Contact Us</Link>
            </nav>
            <Button asChild >
              {token ? <Link to="/logout">Logout</Link>
                : <Link to="/auth">Login</Link> }
            </Button>

        </div>
            
      </header>
  );
}

