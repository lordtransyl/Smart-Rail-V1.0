import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Seats() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const passengerData = JSON.parse(localStorage.getItem("passenger"))
  const count = passengerData?.count || 1

  const seats = Array.from({ length: 40 }, (_, i) => i + 1)
  const bookedSeats = [3, 7, 12, 18, 25, 30, 36]

  const [selectedSeats, setSelectedSeats] = useState([])

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return

    if (selectedSeats.includes(seat)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter((s) => s !== seat))
    } else {
      if (selectedSeats.length < count) {
        setSelectedSeats([...selectedSeats, seat])
      }
    }
  }

  const handleContinue = () => {
    if (selectedSeats.length !== count) {
      alert(`Please select ${count} seats`)
      return
    }

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats))

    // Save booking for logged-in user
    if (user) {
      const allBookings =
        JSON.parse(localStorage.getItem("bookings_" + user.email)) || []

      const newBooking = {
        passenger: passengerData,
        seats: selectedSeats,
        timestamp: new Date().toLocaleString(),
      }

      allBookings.push(newBooking)
      localStorage.setItem(
        "bookings_" + user.email,
        JSON.stringify(allBookings)
      )
    }

    navigate("/ticket")
  }

  return (
    <div style={{ padding: "120px", color: "white", textAlign: "center" }}>
      <h2>Select Your Seats</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 60px)",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {seats.map((seat) => {
          const isBooked = bookedSeats.includes(seat)
          const isSelected = selectedSeats.includes(seat)
          return (
            <button
              key={seat}
              onClick={() => handleSeatClick(seat)}
              disabled={isBooked}
              style={{
                backgroundColor: isBooked
                  ? "red"
                  : isSelected
                  ? "green"
                  : "gray",
                color: "white",
                height: "50px",
                width: "50px",
                borderRadius: "5px",
                cursor: isBooked ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              {seat}
            </button>
          )
        })}
      </div>

      <div style={{ marginTop: "20px", fontSize: "16px" }}>
        Selected Seats: {selectedSeats.join(", ") || "None"}
      </div>

      <button
        onClick={handleContinue}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Continue to Ticket
      </button>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <span>Legend: </span>
        <span style={{ color: "green", marginLeft: "10px" }}>Selected</span>
        <span style={{ color: "red", marginLeft: "10px" }}>Booked</span>
        <span style={{ color: "gray", marginLeft: "10px" }}>Available</span>
      </div>
    </div>
  )
}