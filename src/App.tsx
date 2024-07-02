import { Toaster } from './components/ui/toaster'
import './index.css'
import Routes from './Routes';
import NavBar from './components/ui/navbar';
import {Footer} from './components/ui/footer';

function App() {
  return (
    <>
      <div className='w-screen min-h-screen bg-gray-100 '>
          <Routes />
      </div>

      <Toaster />
    </>
  )
}

export default App