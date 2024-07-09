import { Toaster } from './components/ui/toaster'
import './index.css'
import Routes from './Routes';

function App() {
  return (
    <>
      <div className='w-screen min-h-screen '>
          <Routes />
      </div>

      <Toaster />
    </>
  )
}

export default App
