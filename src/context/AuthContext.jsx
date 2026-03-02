import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null)

  useEffect(() => {

    try {

      const storedUser = localStorage.getItem("user")

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser))
      }

    } catch (error) {

      console.log("Invalid user data in storage")

      localStorage.removeItem("user")

    }

  }, [])

  const login = (username, password) => {

    const userData = {
      username: username,
      password: password
    }

    localStorage.setItem("user", JSON.stringify(userData))

    setUser(userData)
  }

  const logout = () => {

    localStorage.removeItem("user")

    setUser(null)
  }

  return (

    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>

  )
}