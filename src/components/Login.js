import React, {useState,} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function Login() {
  const context=useContext(NoteContext);
  const {showAlert}=context;
    const navigate=useNavigate();
    const [credentials,setCredentials]=useState({email:"", password:""});

    
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  const json = await response.json();

  if (response.ok && json.success) {
    localStorage.setItem("token", json.authToken);
    showAlert("Logged in successfully", "success");
    navigate("/");
  } else {
    showAlert(json.error || "Invalid credentials", "danger");
  }
};


  return (
    <div className="inb-auth">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card inb-auth-card">
            <div className="card-body p-4">
              <h1 className="h3 mb-1">Welcome back</h1>
              <p className="text-body-secondary mb-4">Log in to continue to iNotebook</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name='email'
                    value={credentials.email}
                    onChange={onChange}
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name='password'
                    value={credentials.password}
                    onChange={onChange}
                    autoComplete="current-password"
                    placeholder="Your password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>

              <div className="text-center mt-3">
                <span className="text-body-secondary">New here?</span>{" "}
                <Link to="/signup">Create an account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
