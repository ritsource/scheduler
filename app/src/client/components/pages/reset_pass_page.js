import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactSVG from 'react-svg';
import { connect } from 'react-redux';

import { handleAppMode } from '../../actions/app_mode_actions';

export const ResetPasswordPage = (props) => {
  const [ new_pass_1, setNewPassword1 ] = useState('');
  const [ new_pass_2, setNewPassword2 ] = useState('');
  const [ pass_unmatch_err, setUnmatchError ] = useState(false);
  const [ pass_matched, setPasswordMatch ] = useState(false);
  const [ error_message, setErrorMessage ] = useState(false);
  const [ loading_anime, setLoadingAnime ] = useState(false);

  useEffect(() => {
    props.handleAppMode(2);
  }, []);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (new_pass_1 !== new_pass_2) {
      setUnmatchError(true);
      return setErrorMessage('Password mismatch');
    }

    if (new_pass_1.length < 8) return setErrorMessage('Atleast 8 characters needed');

    setLoadingAnime(true);
    const urlParams = new URLSearchParams(window.location.search);

    try {
      await axios.post('/api/password_reset', { token: urlParams.get('token'), password: new_pass_1 });
      window.location.replace('/');
    } catch (error) {
      if (error.response.status === 422) setErrorMessage('Unable to change password');
      else setErrorMessage('Unknown error occured');
    }
  }
  
  return (
    <div className='login-page-000'>
      <div className='login-page--svg-div-001'>
        <ReactSVG src='/undraw_security.svg'/>
      </div>
      <div className='login-page-div-001'>
        <h3>New Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <input
            autoComplete='off'
            type='text'
            name='password_1'
            placeholder='New password'
            value={new_pass_1}
            onChange={(e) => setNewPassword1(e.target.value)}
          />
          <input
            type='password'
            name='password_2'
            placeholder='Confirm password'
            value={new_pass_2}
            onChange={(e) => {
              setNewPassword2(e.target.value);
              setUnmatchError((e.target.value.length > 3) && (new_pass_1 !== e.target.value));
              setPasswordMatch(new_pass_1 === e.target.value);
            }}
            style={pass_unmatch_err ? {
              border: '1px solid var(--danger-red-color)'
            } : pass_matched ? { border: '1px solid var(--safe-green-color)' } : {}}
          />
          {error_message && (
            <p className='login-page-div-error_message'>{error_message}</p>
          )}
          <div>
            <button name='Submit Password' type='submit'>Submit</button>
            {loading_anime && (
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleAppMode: (x) => dispatch(handleAppMode(x))
})

export default {
  component: connect(null, mapDispatchToProps)(ResetPasswordPage)
};