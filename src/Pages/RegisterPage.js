
import React from "react";
import { useState } from "react";

function RegisterPage(){
    const [ username ,setUsername] = useState('');
    const [password , setPassword] = useState('');
    async function register(ev) {
        ev.preventDefault();
        
        console.log(JSON.stringify({username,password}) ); 
        const response = await fetch("http://localhost:4000/register",{
                method: 'POST',
                body: JSON.stringify({username,password}),
                headers: { 'Content-Type' : 'application/json'},
           
            });
        console.log(response);   
        if (response.status === 200) {
            alert('Registration Successful');
        } else {
            alert('Registration Failed');
        }
    }
    return(
        <div className="background-image"> 
            <form className="register" 
            onSubmit={register}>
               
                <h1>Register</h1>
                    <input type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={ev => setUsername(ev.target.value)}>
                    </input>
                    <input type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    ></input>
                <button>Register</button>
               
            </form> 
            </div>
    );
}
///
//mongodb+srv://blog:WtaREZXTW9L0ScRW@cluster0.dunulw2.mongodb.net/?retryWrites=true&w=majority
export default RegisterPage;
