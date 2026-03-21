import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login(){

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")
const [phone,setPhone] = useState("")
const [aadhaar,setAadhaar] = useState("")
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

if(!username || !password || !phone || !aadhaar){
alert("Please fill all fields")
return
}

if(phone.length !== 10){
alert("Phone number must be 10 digits")
return
}

if(aadhaar.length !== 12){
alert("Aadhaar must be 12 digits")
return
}

const users = JSON.parse(localStorage.getItem("users")) || []

const exists = users.find(u => u.username === username)

if(exists){
alert("User already exists")
return
}

users.push({
username,
password,
phone,
aadhaar
})

localStorage.setItem("users", JSON.stringify(users))

alert("Account created successfully. Please login.")

setRegisterMode(false)

setUsername("")
setPassword("")
setPhone("")
setAadhaar("")
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

{registerMode && (

<>
<input
type="text"
placeholder="Phone Number"
maxLength="10"
inputMode="numeric"
pattern="[0-9]*"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<input
type="text"
placeholder="Aadhaar / ID Number"
maxLength="12"
inputMode="numeric"
pattern="[0-9]*"
value={aadhaar}
onChange={(e)=>setAadhaar(e.target.value)}
/>
</>

)}

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