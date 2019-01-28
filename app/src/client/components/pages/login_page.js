import React from 'react';
import axios from 'axios';
import ReactSVG from 'react-svg';
import { connect } from 'react-redux';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ASYNC_FETCH_USER } from '../../actions/_action_types';
import { handleAppMode } from '../../actions/app_mode_actions';

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
    try {
      const response = await axios.post('/auth/register', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      });
      
      this.setState({ register_mode: false });
    } catch (error) {
      if (error.response.status === 409) {    
        return this.setState({ error_message: error.response.data.message })
      }
    }
  }

  loginUser = async (e) => {
    e.preventDefault();
    const response = await axios.post('/auth/local', {
      email: this.state.email,
      password: this.state.password,
    });

    if (response.data) {
      // this.props.setAuthState(response.data);
      window.location.replace('/');
    } else if (response.data === '') {
      this.setState({ error_message: 'Incorrect email or password' })
    }

  }

  componentDidMount() {
    this.props.handleAppMode(2);
  }

  render() {
    return (
      <div className='login-page-000'>
        {/* {this.props.auth ? (
          <Redirect to='/'/>
        ) : ( */}
          <div className='login-page--svg-div-001'>
            <ReactSVG src='/undraw_events.svg'/>
          </div>
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
                {this.state.error_message && (
                  <p className='login-page-div-error_message'>{this.state.error_message}</p>
                )}
                <div>
                  <button name='Register Account' type='submit'>Register</button>
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
                  <React.Fragment>
                    <p className='login-page-div-error_message'>{this.state.error_message}</p>
                    <p><span className='the-hover-blue-text'><Link to='/forgot'>Forgot password?</Link></span></p>
                  </React.Fragment>
                )}
                <div>
                  <button name='Login' type='submit'>Login</button>
                  <p>or <span className='the-hover-blue-text' onClick={() => {
                    this.setState({ register_mode: true, error_message: false })
                  }}>Create new account??</span></p>
                </div>
              </form>
            )}
            <div className='login-page-oauth-div-002'>
              <a href='/auth/google'>
                <button name='Signin with Google' className='login-page-buttons-002-google'>
                  <FaGoogle style={{
                    fontSize: '13px',
                    marginRight: '10px'
                  }} />
                  Google
                </button>
              </a>
              <a href='/auth/facebook'>
                <button name='Signin with Facebook' className='login-page-buttons-002-facebook'>
                  <FaFacebookF style={{
                    fontSize: '13px',
                    marginRight: '10px'
                  }} />
                  Facebook
                </button>
              </a>
            </div>
          </div>
        {/* )} */}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({
  setAuthState: (authObj) => dispatch({ type: ASYNC_FETCH_USER, auth: authObj }),
  handleAppMode: (x) => dispatch(handleAppMode(x))
})

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(LoginPage)
};