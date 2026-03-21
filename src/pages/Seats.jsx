import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Seats() {

const navigate = useNavigate()
const { user } = useContext(AuthContext)

const passengerData = JSON.parse(localStorage.getItem("passenger"))
const count = passengerData?.count || 1

const totalSeats = 40
const bookedSeats = [3,7,12,18,25,30,36]

const [selectedSeats,setSelectedSeats] = useState([])

const handleSeatClick = (seat)=>{

if(bookedSeats.includes(seat)) return

if(selectedSeats.includes(seat)){

setSelectedSeats(selectedSeats.filter(s=>s!==seat))

}else{

if(selectedSeats.length < count){
setSelectedSeats([...selectedSeats,seat])
}

}

}

const handleContinue = ()=>{

if(selectedSeats.length !== count){
alert(`Please select ${count} seats`)
return
}

localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats))

if(user){

const allBookings =
JSON.parse(localStorage.getItem("bookings_"+user.email)) || []

const newBooking = {

passenger: passengerData,
seats: selectedSeats,
journeyDate: passengerData.date,
timestamp: new Date().toLocaleString()

}

allBookings.push(newBooking)

localStorage.setItem(
"bookings_"+user.email,
JSON.stringify(allBookings)
)

}

navigate("/ticket")

}

const renderSeat = (seat,label)=>{

const isBooked = bookedSeats.includes(seat)
const isSelected = selectedSeats.includes(seat)

return(

<div style={{textAlign:"center"}}>

<button
onClick={()=>handleSeatClick(seat)}
disabled={isBooked}
style={{
backgroundColor:isBooked
? "#ff4d4d"
: isSelected
? "#2ecc71"
: "#6c757d",

color:"white",
height:"60px",
width:"70px",
borderRadius:"10px",
cursor:isBooked?"not-allowed":"pointer",
fontWeight:"bold",
fontSize:"16px"
}}
>

{seat}

</button>

<div style={{fontSize:"10px",marginTop:"4px"}}>
{label}
</div>

</div>

)

}

const bays = []

for(let i=1;i<=totalSeats;i+=8){

bays.push([
[i,i+1,i+2],      // lower middle upper
[i+3,i+4,i+5],    // lower middle upper
i+6,              // side lower
i+7               // side upper
])

}

return(

<div style={{padding:"120px",color:"white",textAlign:"center"}}>

<h2>Select Your Seats</h2>

<div style={{
display:"flex",
flexDirection:"column",
gap:"40px",
alignItems:"center",
marginTop:"30px"
}}>

{bays.map((bay,index)=>{

const [row1,row2,sideLower,sideUpper] = bay

return(

<div key={index} style={{display:"flex",gap:"80px"}}>

<div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

<div style={{display:"flex",gap:"10px"}}>
{renderSeat(row1[0],"LOWER")}
{renderSeat(row1[1],"MIDDLE")}
{renderSeat(row1[2],"UPPER")}
</div>

<div style={{display:"flex",gap:"10px"}}>
{renderSeat(row2[0],"LOWER")}
{renderSeat(row2[1],"MIDDLE")}
{renderSeat(row2[2],"UPPER")}
</div>

</div>

<div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

{renderSeat(sideLower,"SIDE LOWER")}
{renderSeat(sideUpper,"SIDE UPPER")}

</div>

</div>

)

})}

</div>

<div style={{marginTop:"30px"}}>

Selected Seats: {selectedSeats.join(", ") || "None"}

</div>

<button
onClick={handleContinue}
style={{
marginTop:"30px",
padding:"12px 30px",
fontSize:"16px",
cursor:"pointer",
borderRadius:"6px"
}}
>

Continue to Ticket

</button>

<div style={{marginTop:"20px"}}>

<span style={{color:"#2ecc71"}}>Selected</span>
<span style={{color:"#ff4d4d",marginLeft:"20px"}}>Booked</span>
<span style={{color:"#6c757d",marginLeft:"20px"}}>Available</span>

</div>

</div>

)

}