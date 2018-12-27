import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ASYNC_FETCH_USER } from '../../actions/_action_types';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      register_mode: false,
      error_message: false
    };
  }

  registerUser = async (e) => {
    e.preventDefault();
    const response = await axios.post('/auth/register', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    });
    
    this.setState({ register_mode: false });
  }

  loginUser = async (e) => {
    e.preventDefault();
    const response = await axios.post('/auth/local', {
      email: this.state.email,
      password: this.state.password,
    });

    if (response.data) {
      this.props.setAuthState(response.data);
    } else if (response.data === '') {
      this.setState({ error_message: 'Incorrect email or password' })
    }

  }

  render() {
    return (
      <div className='login-page-000'>
        {this.props.auth ? (
          <Redirect to='/'/>
        ) : (
          <div className='login-page-div-001'>
            <h3>{this.state.register_mode ? 'Create Account' : 'Just Login'}</h3>
            {this.state.register_mode ? (
              <form onSubmit={this.registerUser}>
                <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}/>
                <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}/>
                <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}/>
                <div>
                  <button type='submit'>Register</button>
                  <p>or <span className='the-hover-blue-text' onClick={() => {
                    this.setState({ register_mode: false, error_message: false })
                  }}>just Login??</span></p>
                </div>
              </form>
            ) : (
              <form onSubmit={this.loginUser}>
                <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}/>
                <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}/>
                {this.state.error_message && (
                  <p className='login-page-div-error_message'>{this.state.error_message}</p>
                )}
                <div>
                  <button type='submit'>Login</button>
                  <p>or <span className='the-hover-blue-text' onClick={() => {
                    this.setState({ register_mode: true, error_message: false })
                  }}>Create new account??</span></p>
                </div>
              </form>
            )}
            <div className='login-page-oauth-div-002'>
              <a href='/auth/google'>
                <button className='login-page-buttons-002-google'>
                  <i className="fab fa-google"></i>
                  Google
                </button>
              </a>
              <a href='/auth/facebook'>
                <button className='login-page-buttons-002-facebook'>
                  <i className="fab fa-facebook-f"></i>
                  Facebook
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({
  setAuthState: (authObj) => dispatch({ type: ASYNC_FETCH_USER, auth: authObj })
})

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(LoginPage)
};