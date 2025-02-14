import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const host = 'http://localhost:4000';
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
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
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged in Successfully", "suceess");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const handleonchange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "auto", backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', animation: 'fadeIn 1s' }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .form-control:focus {
            border-color: #28a745;
            box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
          }
          .btn-primary {
            background-color: #28a745;
            border-color: #28a745;
          }
          .btn-primary:hover {
            background-color: #218838;
            border-color: #1e7e34;
          }
        `}
      </style>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{ color: '#343a40' }}>
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            autoComplete="email"
            value={credentials.email}
            onChange={handleonchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{ color: '#343a40' }}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            autoComplete="current-password"
            onChange={handleonchange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
