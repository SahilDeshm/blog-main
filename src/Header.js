
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
        credentials: 'include', // Include credentials in the request
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(userInfo => {
        setUsername(userInfo.username);
    })
    .catch(error => {
        console.error('Fetch error:', error);
        // Handle the error, e.g., redirect to a login page
    });
}, []);

   
async function logout() {
  await fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
  });
  setUsername(null);
}

  
  return(
    <header>
      <Link to = "/">My-Blog</Link>
        <nav>
            {username && (
              <>
              <Link to= "/create">Create new post</Link>
              <a onClick={logout}>Logout</a>
              </>
            )}
            { !username && (
              <>
                <Link to="/login">Login</Link>
                <Link to = "/register"> Register</Link>
              </>
            )}
           
        </nav>
    </header>
   );
}
export default Header;