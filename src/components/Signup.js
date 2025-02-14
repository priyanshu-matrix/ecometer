import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const host = "http://localhost:4000";
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("User already exists or Error", "danger");
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
      <form onSubmit={handlesubmit}> {/* replace handlesubmit with your signup submit function */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label" style={{ color: '#343a40' }}> {/* Added label styling */}
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleonchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{ color: '#343a40' }}> {/* Added label styling */}
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleonchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{ color: '#343a40' }}> {/* Added label styling */}
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleonchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label" style={{ color: '#343a40' }}> {/* Added label styling */}
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={handleonchange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
