import { useEffect, useState } from "react"

export default function Ticket() {
  const [passenger, setPassenger] = useState(null)
  const [seats, setSeats] = useState([])

  useEffect(() => {
    const passengerData = JSON.parse(localStorage.getItem("passenger"))
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

    if (passengerData && selectedSeats) {
      setPassenger(passengerData)
      setSeats(selectedSeats)
    }
  }, [])

  if (!passenger || seats.length === 0) {
    return (
      <div style={{ padding: "120px", color: "white" }}>
        <h1>Ticket Confirmation</h1>
        <p>No ticket data found. Please select passenger details and seats.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: "120px", color: "white" }}>
      <h1>Ticket Confirmation</h1>

      <div style={{ marginTop: "30px" }}>
        <h2>Passenger Details</h2>
        <p><strong>Name:</strong> {passenger.name}</p>
        <p><strong>Age:</strong> {passenger.age}</p>
        <p><strong>Gender:</strong> {passenger.gender}</p>
        <p><strong>Number of Passengers:</strong> {passenger.count}</p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Selected Seats</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {seats.map((seat) => (
            <div
              key={seat}
              style={{
                padding: "10px 15px",
                backgroundColor: "green",
                color: "white",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              Seat {seat}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Thank you for booking!</h2>
        <p>Please save this ticket for your journey.</p>
      </div>
    </div>
  )
}