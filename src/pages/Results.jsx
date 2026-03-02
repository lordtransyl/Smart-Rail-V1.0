import { useLocation, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import trains from "../data/trains"

export default function Results(){

const { user } = useContext(AuthContext)

const navigate = useNavigate()

const location = useLocation()

const { from, to } = location.state || { from:"", to:"" }

const filtered = trains.filter(train => {

if (!from || !to || !train.stops) return false

const fromIndex = train.stops.findIndex(
stop => stop && stop.toLowerCase() === from.toLowerCase()
)

const toIndex = train.stops.findIndex(
stop => stop && stop.toLowerCase() === to.toLowerCase()
)

return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex

})

return(

<div className="results-page">

<h2>
Trains from {from} to {to}
</h2>

{filtered.length === 0 && (
<p>No trains found</p>
)}

{filtered.map(train=>(

<div className="train-card" key={train.number}>

<h3>{train.name} ({train.number})</h3>

<p>{train.departure} → {train.arrival}</p>

<p>Duration: {train.duration}</p>

<p>Seats Available: {train.seats || 120}</p>

<button
onClick={()=>{

if(!user){
navigate("/login")
}else{
navigate("/passenger")
}

}}
>

Book Seat

</button>

</div>

))}

</div>

)

}