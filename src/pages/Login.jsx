import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login(){

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")
const [registerMode,setRegisterMode] = useState(false)

const { login } = useContext(AuthContext)

const navigate = useNavigate()

const handleLogin = () => {

const users = JSON.parse(localStorage.getItem("users")) || []

const user = users.find(
u => u.username === username && u.password === password
)

if(!user){
alert("Invalid username or password")
return
}

login(username)

navigate(-1)

}

const handleRegister = () => {

const users = JSON.parse(localStorage.getItem("users")) || []

const exists = users.find(u => u.username === username)

if(exists){
alert("User already exists")
return
}

users.push({
username,
password
})

localStorage.setItem("users", JSON.stringify(users))

alert("Account created. Please login.")

setRegisterMode(false)

}

return(

<div className="login-container">

<div className="login-card">

<h2>
{registerMode ? "Create Account" : "Login"}
</h2>

<input
type="text"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

{registerMode ? (

<button onClick={handleRegister}>
Create Account
</button>

) : (

<button onClick={handleLogin}>
Login
</button>

)}

<p
className="toggle-auth"
onClick={()=>setRegisterMode(!registerMode)}
>

{registerMode
? "Already have an account? Login"
: "Create new account"}

</p>

</div>

</div>

)

}