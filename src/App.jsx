import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Meetings from "./pages/Meetings"
import MeetingDetail from "./pages/MeetingDetail"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/ClassManager-microsite" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/ClassManager-microsite/meetings" element={<Meetings />} />
        <Route path="/ClassManager-microsite/meetings/:id" element={<MeetingDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App