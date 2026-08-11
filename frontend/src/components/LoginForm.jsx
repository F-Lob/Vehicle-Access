import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getCurrentUser } from '../services/auth.service';
import '../styles/Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response.status === 200) {
        const storedUser = getCurrentUser();
        const userRole = storedUser?.roles?.[0];
        if(userRole === 'operator') {
          navigate('/access-control');
        } else {
          navigate('/home');
        }
      }
    } catch (error) {
      setError('Credenciales incorrectas');
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <>
      <div className="background-image"></div>
      <div className="background-blur"></div>
      <div className="login-container">
        <div className="left-container">
          <div className="title-box">
                <h1>Control de acceso vehicular</h1>
          </div>
        </div>
        <div className="right-container">
          <div className="login-box">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='@email.com'
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  required
                />
              </div>
              {error && <div className="error">{error}</div>}
              <div className="button-container">
                <button type="submit" className="login-button">Ingresar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );  
};

export default LoginForm;
