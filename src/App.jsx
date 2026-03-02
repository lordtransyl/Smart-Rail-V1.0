import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import PassengerDetails from "./pages/PassengerDetails"
import Ticket from "./pages/Ticket"
import Results from "./pages/Results"
import AuthProvider from "./context/AuthContext"
import Login from "./pages/Login"
import Seats from "./pages/Seats"
import Bookings from "./pages/MyBookings"

function App() {

return (
<AuthProvider>
<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>} />

<Route path="/passenger" element={<PassengerDetails/>} />

<Route path="/ticket" element={<Ticket/>} />
<Route path="/results" element={<Results />} />
<Route path="/login" element={<Login />} />
<Route path="/seats" element={<Seats />} />
<Route path="/bookings" element={<Bookings />} />


</Routes>

</BrowserRouter>
</AuthProvider>

)

}

export default App