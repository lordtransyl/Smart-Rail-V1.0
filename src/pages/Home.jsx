import { useState } from "react"
import SplashCursor from "../components/SplashCursor"
import trains from "../data/trains"
import stations from "../data/stations"
import { useNavigate } from "react-router-dom"

export default function Home() {

const navigate = useNavigate()
const [from,setFrom] = useState("")
const [to,setTo] = useState("")
const [results,setResults] = useState([])

const [fromSuggestions,setFromSuggestions] = useState([])
const [toSuggestions,setToSuggestions] = useState([])

/* FROM INPUT */

const handleFromChange = (value) => {

setFrom(value)

const filtered = stations.filter(station =>
station.toLowerCase().includes(value.toLowerCase())
)

setFromSuggestions(filtered)

}

/* TO INPUT */

const handleToChange = (value) => {

setTo(value)

const filtered = stations.filter(station =>
station.toLowerCase().includes(value.toLowerCase())
)

setToSuggestions(filtered)

}

/* SEARCH */

const searchTrains = () => {

if(!from || !to){
alert("Please enter both stations")
return
}

navigate("/results",{
state:{
from:from,
to:to
}
})

}

return (

<div className="home-container">

{/* Background Animation */}
<div className="cursor-bg">
<SplashCursor
SIM_RESOLUTION={128}
DYE_RESOLUTION={1440}
DENSITY_DISSIPATION={3.5}
VELOCITY_DISSIPATION={2}
PRESSURE={0.1}
CURL={3}
SPLAT_RADIUS={0.2}
SPLAT_FORCE={6000}
COLOR_UPDATE_SPEED={10}
/>
</div>

{/* Page Content */}
<div className="content-layer">

<h1 className="title">
Smart Railway System
</h1>

<p className="subtitle">
Next Generation Train Ticket Booking Platform
</p>

<div className="search-box">

{/* FROM */}

<div className="input-box">

<input
type="text"
placeholder="From Station"
value={from}
onChange={(e)=>handleFromChange(e.target.value)}
/>

{fromSuggestions.length > 0 && (

<div className="suggestions">

{fromSuggestions.map((station,index)=>(

<div
key={index}
onClick={()=>{

setFrom(station)
setFromSuggestions([])

}}
>

{station}

</div>

))}

</div>

)}

</div>

{/* TO */}

<div className="input-box">

<input
type="text"
placeholder="To Station"
value={to}
onChange={(e)=>handleToChange(e.target.value)}
/>

{toSuggestions.length > 0 && (

<div className="suggestions">

{toSuggestions.map((station,index)=>(

<div
key={index}
onClick={()=>{

setTo(station)
setToSuggestions([])

}}
>

{station}

</div>

))}

</div>

)}

</div>

<button onClick={searchTrains}>
Search Trains
</button>

</div>

<div className="results">

{results.map(train=>(

<div className="train-card" key={train.id}>

<h3>{train.trainName} ({train.trainNumber})</h3>

<p>{train.from} → {train.to}</p>

<p>
Departure: {train.departure} | Arrival: {train.arrival}
</p>

<p>Duration: {train.duration}</p>

<button>Book Ticket</button>

</div>

))}

</div>

</div>

</div>

)

}