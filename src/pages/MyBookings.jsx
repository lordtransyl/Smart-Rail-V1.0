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


  const cancelBooking = (index) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this ticket?"
    )

    if (!confirmCancel) return

    const updatedBookings = [...bookings]

    updatedBookings.splice(index, 1)

    localStorage.setItem(
      "bookings_" + user.email,
      JSON.stringify(updatedBookings)
    )

    setBookings(updatedBookings)
  }


  if (!user) return null


  return (

    <div style={{ padding: "120px", color: "white" }}>

      <h1>My Bookings</h1>

      {bookings.length === 0 ? (

        <p>No bookings found.</p>

      ) : (

        bookings
          .slice()
          .reverse()
          .map((booking, idx) => {

            const realIndex = bookings.length - 1 - idx

            return (

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
  <strong>Journey Date:</strong> {booking.journeyDate}
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
                  <strong>Number of Passengers:</strong> {booking.passenger.count}
                </p>

                <p>
                  <strong>Seats:</strong> {booking.seats.join(", ")}
                </p>

                <button
                  onClick={() => cancelBooking(realIndex)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 14px",
                    background: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Cancel Ticket
                </button>

              </div>

            )

          })

      )}

    </div>

  )

}