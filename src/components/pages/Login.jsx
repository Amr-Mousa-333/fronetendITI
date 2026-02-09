import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const validEmail = (value) => {
    const regex = /^[a-z0-9\-\\.]+@([a-z0-9\\-]+\.)+[\w-]{2,4}$/g;
    return regex.test(value);
  };

  const validPassword = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return regex.test(value);
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

  const handleLogin = () => {
    if (emailValid && passwordValid) {
      const store = JSON.parse(localStorage.getItem('users')) || [];
      const user = store.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/home');
      } else {
        setShowError(true);
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
        <h1 className="text-center py-4">Smart Login System</h1>
        
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
          className={`alert alert-danger text-danger bg-transparent border-0 text-center ${
            showError ? '' : 'd-none'
          }`}
          id="msgFalse"
        >
          Data invalid
        </p>

        <button
          onClick={handleLogin}
          className="btn btn-outline-info w-100 my-3"
        >
          Login
        </button>

        <p className="text-white text-center pb-4">
          Don't have an account?{' '}
          <a className="fw-bolder text-decoration-none" href="/signup">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;