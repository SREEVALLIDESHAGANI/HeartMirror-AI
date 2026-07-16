import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Upload from './pages/Upload'
import Loading from './pages/Loading'
import Results from './pages/Results'
import Particles from './components/Particles'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg relative overflow-hidden">
        <Particles />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
