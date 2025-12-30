import React, {useState,} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';


function SignUp() {
    const context=useContext(NoteContext);
  const {showAlert}=context;
      const navigate=useNavigate();
    const [credentials,setCredentials]=useState({name:"",email:"", password:"", cpassword:""});

    
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credentials.name,email:credentials.email, password:credentials.password})
    });
    const json = await response.json();
    const success=json.success;
    const authToken=json.authToken;
    if(success){
        //save the auth token and redirect
        localStorage.setItem('token',authToken);
        navigate("/");
        showAlert("Account Created Successfully","success");
    }
    else{
        alert("Invalid Credentials");
        showAlert("Invalid Credentials","danger");
    }
  };
  return (
    <div className="inb-auth">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card inb-auth-card">
            <div className="card-body p-4">
              <h1 className="h3 mb-1">Create your account</h1>
              <p className="text-body-secondary mb-4">Sign up to start saving notes securely</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name='name'
                    value={credentials.name}
                    onChange={onChange}
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                </div>
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
                    required
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
                    autoComplete="new-password"
                    placeholder="At least 5 characters"
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label">Confirm password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name='cpassword'
                    value={credentials.cpassword}
                    onChange={onChange}
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Create account</button>
              </form>

              <div className="text-center mt-3">
                <span className="text-body-secondary">Already have an account?</span>{" "}
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
