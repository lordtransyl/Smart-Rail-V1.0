import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function PassengerDetails() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [count, setCount] = useState(1)

  const handleSubmit = () => {
    // VALIDATION
    if (!name.trim()) {
      alert("Please enter passenger name")
      return
    }
    if (!age || age <= 0) {
      alert("Please enter a valid age")
      return
    }
    if (!gender) {
      alert("Please select gender")
      return
    }
    if (!count || count < 1 || count > 6) {
      alert("Please enter number of passengers between 1 and 6")
      return
    }

    // Save passenger data
    const passengerData = {
      name: name.trim(),
      age: Number(age),
      gender,
      count: Number(count),
    }
    localStorage.setItem("passenger", JSON.stringify(passengerData))
    navigate("/seats")
  }

  return (
    <div className="passenger-wrapper">
      <div className="passenger-card">
        <h2>Passenger Details</h2>

        <input
          className="passenger-input"
          placeholder="Passenger Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="passenger-input"
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <select
          className="gender-select"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          className="passenger-input"
          type="number"
          min="1"
          max="6"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <button className="passenger-btn" onClick={handleSubmit}>
          Continue to Seat Selection
        </button>
      </div>
    </div>
  )
}