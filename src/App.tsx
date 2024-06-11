import { Toaster } from './components/ui/toaster'
import './index.css'
import AuthProvider from './auth/AuthProvider';
import Navbar from './components/ui/navbar';
import Routes from './Routes';


function App() {

  return (
      <>
          <div className='w-screen min-h-screen bg-gray-100 ' >
            <Navbar/>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
          </div>
          <Toaster />
      </>
  )
}

export default App
