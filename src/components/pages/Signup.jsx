import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameValid, setNameValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEmailExists, setShowEmailExists] = useState(false);
  const navigate = useNavigate();

  const validName = (value) => {
    const regex = /^[A-Za-z\s\\-]{2,}$/;
    return regex.test(value);
  };

  const validEmail = (value) => {
    const regex = /^[a-z0-9\-\\.]+@([a-z0-9\\-]+\.)+[\w-]{2,4}$/g;
    return regex.test(value);
  };

  const validPassword = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return regex.test(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameValid(validName(value));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(validPassword(value));
  };

  const handleSignup = () => {
    if (nameValid && emailValid && passwordValid) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      const emailExists = users.some((user) => user.email === email);

      if (emailExists) {
        setShowEmailExists(true);
        setShowSuccess(false);
      } else {
        const newUser = {
          name,
          email,
          password,
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        setShowSuccess(true);
        setShowEmailExists(false);
        
        // Clear form
        setName('');
        setEmail('');
        setPassword('');
        setNameValid(null);
        setEmailValid(null);
        setPasswordValid(null);

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    }
  };

  const getInputClass = (isValid) => {
    if (isValid === null) return 'form-control my-3';
    return `form-control my-3 ${isValid ? 'is-valid' : 'is-invalid'}`;
  };

  return (
    <div className="group">
      <div className="container shadow shadow-lg rounded rounded-2 px-5">
        <h1 className="text-center py-4">Smart Sign Up System</h1>

        <input
          id="signupName"
          className={getInputClass(nameValid)}
          placeholder="Enter your name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />

        <input
          id="signupEmail"
          className={getInputClass(emailValid)}
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />

        <input
          id="signupPassword"
          className={getInputClass(passwordValid)}
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <p
          className={`alert alert-success text-danger bg-transparent border-0 text-center ${
            showEmailExists ? '' : 'd-none'
          }`}
          id="msgFind"
        >
          This Email is already registered.
        </p>

        <p
          className={`alert alert-success text-success bg-transparent border-0 text-center ${
            showSuccess ? '' : 'd-none'
          }`}
          id="msgSuccess"
        >
          Data Successfully
        </p>

        <button onClick={handleSignup} className="btn btn-outline-info w-100 mb-3">
          Sign Up
        </button>

        <p className="text-white text-center pb-4">
          You have an account?{' '}
          <a className="fw-bolder text-decoration-none" href="/login">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;