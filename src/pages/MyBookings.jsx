import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function MyBookings() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    const userBookings =
      JSON.parse(localStorage.getItem("bookings_" + user.email)) || []
    setBookings(userBookings)
  }, [user, navigate])

  if (!user) return null

  return (
    <div style={{ padding: "120px", color: "white" }}>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings
          .slice()
          .reverse() // show latest first
          .map((booking, idx) => (
            <div
              key={idx}
              style={{
                marginTop: "20px",
                padding: "20px",
                border: "1px solid white",
                borderRadius: "10px",
              }}
            >
              <p>
                <strong>Booking Time:</strong> {booking.timestamp}
              </p>
              <p>
                <strong>Name:</strong> {booking.passenger.name}
              </p>
              <p>
                <strong>Age:</strong> {booking.passenger.age}
              </p>
              <p>
                <strong>Gender:</strong> {booking.passenger.gender}
              </p>
              <p>
                <strong>Number of Passengers:</strong>{" "}
                {booking.passenger.count}
              </p>
              <p>
                <strong>Seats:</strong> {booking.seats.join(", ")}
              </p>
            </div>
          ))
      )}
    </div>
  )
}