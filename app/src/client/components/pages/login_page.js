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
      register_mode: false
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

    try {
      const response = await axios.post('/auth/local', {
        email: this.state.email,
        password: this.state.password,
      });

      // console.log('response', response.data);
      this.props.setAuthState(response.data);

      // this.setState({});
    } catch (error) {
      console.log('LLLLLL', error);
    }
  }

  render() {
    return (
      <div className='login-page-000'>
        {this.props.auth === false ? (
          <div className='login-page-div-001'>
            <h3>{this.state.register_mode ? 'Create Account' : 'Just Login'}</h3>
            {this.state.register_mode ? (
              <form onSubmit={this.registerUser}>
                <input type='text' placeholder='Name' value={this.state.name} onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}/>
                <input type='email' placeholder='Email' value={this.state.email} onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}/>
                <input type='password' placeholder='Password' value={this.state.password} onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}/>
                <div>
                  <button type='submit'>Register</button>
                  <p>or <span className='the-hover-blue-text' onClick={() => {
                    this.setState({ register_mode: false })
                  }}>just Login??</span></p>
                </div>
              </form>
            ) : (
              <form onSubmit={this.loginUser}>
                <input type='email' placeholder='Email' value={this.state.email} onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}/>
                <input type='password' placeholder='Password' value={this.state.password} onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}/>
                <div>
                  <button type='submit'>Login</button>
                  <p>or <span className='the-hover-blue-text' onClick={() => {
                    this.setState({ register_mode: true })
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
        ) : (
          <Redirect to='/'/>
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