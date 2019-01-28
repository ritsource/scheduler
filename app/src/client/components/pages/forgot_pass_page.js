import React from 'react';
import axios from 'axios';
import ReactSVG from 'react-svg';
import { connect } from 'react-redux';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

import { ASYNC_FETCH_USER } from '../../actions/_action_types';
import { handleAppMode } from '../../actions/app_mode_actions';

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      new_pass_1: '',
      new_pass_2: '',
      new_pass_mode: false,
      error_message: false
    };
  }

  // loginUser = async (e) => {
  //   e.preventDefault();
  //   const response = await axios.post('/auth/local', {
  //     email: this.state.email,
  //     password: this.state.password,
  //   });

  //   if (response.data) {
  //     // this.props.setAuthState(response.data);
  //     window.location.replace('/');
  //   } else if (response.data === '') {
  //     this.setState({ error_message: 'Incorrect email or password' })
  //   }
  // }

  componentDidMount() {
    this.props.handleAppMode(2);
  }

  render() {
    return (
      <div className='login-page-000'>
        <div className='login-page--svg-div-001'>
          <ReactSVG src='/undraw_security.svg'/>
        </div>
        <div className='login-page-div-001'>
          <h3>{this.state.new_pass_mode ? 'New Password' : 'Forgot Password'}</h3>
          {this.state.new_pass_mode ? (
            <form onSubmit={() => {}}>
              <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={(e) => {
                this.setState({ email: e.target.value });
              }}/>
              {this.state.error_message && (
                <p className='login-page-div-error_message'>{this.state.error_message}</p>
              )}
              <div>
                <button name='Submit Email' type='submit'>Submit</button>
              </div>
            </form>
          ) : (
            <form onSubmit={this.loginUser}>
              <input autoComplete='off' type='text' name='password_1' placeholder='New password' value={this.state.new_pass_1} onChange={(e) => {
                this.setState({ new_pass_1: e.target.value });
              }}/>
              <input type='password' name='password_2' placeholder='Confirm password' value={this.state.new_pass_2} onChange={(e) => {
                this.setState({ new_pass_2: e.target.value });
              }}/>
              {this.state.error_message && (
                <p className='login-page-div-error_message'>{this.state.error_message}</p>
              )}
              <div>
                <button name='Submit Password' type='submit'>Submit</button>
                {/* <p><span className='the-hover-blue-text' onClick={() => {
                  this.setState({ register_mode: true, error_message: false })
                }}>Another Email!</span></p> */}
              </div>
            </form>
          )}
        </div>
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
  component: connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage)
};