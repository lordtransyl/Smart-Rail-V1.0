import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"


export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="logo">SmartRail</div>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/bookings" className="nav-link">
          Bookings
        </Link>

        {user ? (
          <>
            <span className="welcome">Hello, {user.username}</span>

            <button
              className="logout-btn"
              onClick={() => {
                logout()
                navigate("/")
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}