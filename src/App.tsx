import { Toaster } from './components/ui/toaster'
import './index.css'
import Auth from './pages/Auth'

function App() {

  return (
      <>
          <div className='w-screen min-h-screen bg-gray-100 ' >
            <Auth />
          </div>
          <Toaster />
      </>
  )
}

export default App
