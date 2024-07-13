import { Button } from '@/components/ui/button';
import {useAuth} from '@/auth/AuthProvider';
import {Link, useLocation} from 'react-router-dom';

  
export default function NavBar() {

  const {token} = useAuth();
  const path = useLocation();

  return(
      <header className='border-b-2' hidden={path.pathname === '/auth'}>
        <div className='container flex items-center justify-between w-full py-3 font-medium'>

            <div className="items-center sm:flex-auto sm:items-start sm:justify-between">
              <Link to={token ? "/home": "" } className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img className='w-12 h-12' src="https://img.freepik.com/premium-vector/logo-bus-icon-school-bus-vector-isolated-transport-bus-silhouette-design-black-bus_653669-3055.jpg " alt="App logo" />
                  <span className="self-center font-bold md:text-2xl whitespace-nowrap dark:text-white">Busy Ah!</span>
              </Link>
            </div>
            
            <nav className='flex items-center w-2/3 h-full text-xs md:w-1/3 md:text-sm justify-evenly' >
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

