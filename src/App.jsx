import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Meetings from "./pages/Meetings"
import MeetingDetail from "./pages/MeetingDetail"

function App() {
  return (
    <BrowserRouter basename="/ClassManager-microsite">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documentation" element={<MeetingDetail />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/meetings/:id" element={<MeetingDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App