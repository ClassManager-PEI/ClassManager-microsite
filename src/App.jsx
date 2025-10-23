import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Meetings from "./pages/Meetings"
import MeetingDetail from "./pages/MeetingDetail"
import Documentation from "./pages/Documentation"
import Calendar from "./pages/Calendar"

function App() {
  return (
    <BrowserRouter basename="/ClassManager-microsite">
      <Navbar />
      <div className="pt-16 md:pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/meetings/:id" element={<MeetingDetail />} />
          <Route path="/calendar/" element={<Calendar />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App