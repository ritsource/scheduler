import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactSVG from 'react-svg';
import { connect } from 'react-redux';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ASYNC_FETCH_USER } from '../../actions/_action_types';
import { handleAppMode } from '../../actions/app_mode_actions';

export const LoginPage = (props) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ register_mode, setRegisterMode ] = useState('');
  const [ error_message, setErrorMessage ] = useState('');
  const [ loading_anime, setLoadingAnime ] = useState(false);

  useEffect(() => {
    props.handleAppMode(2);
  }, []);

  const registerUser = async (e) => {
    e.preventDefault();
    setLoadingAnime(true);

    try {
      await axios.post('/auth/register', { name, email, password });
      setRegisterMode(false);
    } catch (error) {
      if (error.response.status === 409) setErrorMessage(error.response.data.message);
    }

    setLoadingAnime(false);
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setLoadingAnime(true);

    const response = await axios.post('/auth/local', { email, password });

    if (response.data) return window.location.replace('/calendar');
    else if (response.data === '') setErrorMessage('Incorrect email or password');

    setLoadingAnime(false);
  }

  return (
    <div className='login-page-000'>
      <div className='login-page--svg-div-001'>
        <ReactSVG src='/blueish/undraw_events.svg'/>
      </div>
      <div className='login-page-div-001'>
        <h3>{register_mode ? 'Create Account' : 'Just Login'}</h3>
        {register_mode ? (
          <form onSubmit={registerUser}>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error_message && (<p className='login-page-div-error_message'>{error_message}</p>)}
            <div>
              <button name='Register Account' type='submit'>Register</button>
              {loading_anime ? (
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              ) : (
                <p>or <span className='the-hover-blue-text' onClick={() => {
                  setRegisterMode(false);
                  setErrorMessage(false);
                }}>just Login??</span></p>
              )}
            </div>
          </form>
        ) : (
          <form onSubmit={loginUser}>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error_message && (
              <React.Fragment>
                <p className='login-page-div-error_message'>{error_message}</p>
                <p><span className='the-hover-blue-text'>
                  <Link to='/forgot_password'>Forgot password?</Link>
                </span></p>
              </React.Fragment>
            )}
            <div>
              <button name='Login' type='submit'>Login</button>
              {loading_anime ? (
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              ) : (
                <p>or <span className='the-hover-blue-text' onClick={() => {
                  setRegisterMode(true);
                  setErrorMessage(false);
                }}>Create new account??</span></p>
              )}
            </div>
          </form>
        )}
        <div className='login-page-oauth-div-002'>
          <a href='/auth/google' onClick={() => setLoadingAnime(true)}>
            <button name='Signin with Google' className='login-page-buttons-002-google'>
              <FaGoogle style={{ fontSize: '13px', marginRight: '10px' }} />
              Google
            </button>
          </a>
          <a href='/auth/facebook' onClick={() => setLoadingAnime(true)}>
            <button name='Signin with Facebook' className='login-page-buttons-002-facebook'>
              <FaFacebookF style={{ fontSize: '13px', marginRight: '10px' }} />
              Facebook
            </button>
          </a>
        </div>
      </div>
    </div>
  );

};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({
  setAuthState: (authObj) => dispatch({ type: ASYNC_FETCH_USER, auth: authObj }),
  handleAppMode: (x) => dispatch(handleAppMode(x))
})

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(LoginPage)
};