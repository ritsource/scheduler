import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactSVG from 'react-svg';
import { connect } from 'react-redux';

import { handleAppMode } from '../../actions/app_mode_actions';

const ForgotPasswordPage = (props) => {
  const [ email, setEmail ] = useState('');
  const [ normal_message, setNormalMessage ] = useState('');
  const [ error_message, setErrorMessage ] = useState('');
  const [ loading_anime, setLoadingAnime ] = useState('');

  useEffect(() => {
    props.handleAppMode(2);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoadingAnime(true);

    try {
      await axios.post('/api/request_a_mail', { email: email });

      setNormalMessage('An email has been sent');
      setErrorMessage(false);
    } catch (error) {
      if (error.response.status === 422) {
        setErrorMessage('No user found with this email');
        setNormalMessage(false);
      } else if (error.response.status === 405) {
        setErrorMessage('The Email couldn\'t be sent');
        setNormalMessage(false);
      } else {
        setErrorMessage('Unknown error occured');
        setNormalMessage(false);
      }
    }

    setLoadingAnime(false);
  }
  
  return (
    <div className='login-page-000'>
      <div className='login-page--svg-div-001'>
        <ReactSVG src='/undraw_security.svg'/>
      </div>
      <div className='login-page-div-001'>
        <h3>Forgot Password</h3>
        <form onSubmit={handleEmailSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error_message && (<p className='login-page-div-error_message'>{error_message}</p>)}
          {normal_message && (<p className='login-page-div-normal_message'>{normal_message}</p>)}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button name='Submit Email' type='submit'>Submit</button>
            {loading_anime && (
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleAppMode: (x) => dispatch(handleAppMode(x))
})

export default {
  component: connect(null, mapDispatchToProps)(ForgotPasswordPage)
};