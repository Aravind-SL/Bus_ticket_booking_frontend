import { Toaster } from './components/ui/toaster'
import './index.css'
import AuthProvider from './auth/AuthProvider';
import Routes from './Routes';

function App() {
  return (
    <>
      <div className='w-screen min-h-screen bg-gray-100 '>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </div>
      <Toaster />
    </>
  )
}

export default App