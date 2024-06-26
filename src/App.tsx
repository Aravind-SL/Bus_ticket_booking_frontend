import { Toaster } from './components/ui/toaster'
import './index.css'
import AuthProvider from './auth/AuthProvider';
import Routes from './Routes';
import NavBar from './components/ui/navbar';
import {Footer} from './components/ui/footer';

function App() {
  return (
    <>
      <NavBar />
      <div className='w-screen min-h-screen bg-gray-100 '>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </div>
      <Footer />
      <Toaster />
    </>
  )
}

export default App