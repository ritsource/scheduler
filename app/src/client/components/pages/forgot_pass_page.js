import React from 'react';
import axios from 'axios';
import ReactSVG from 'react-svg';
import { connect } from 'react-redux';

import { handleAppMode } from '../../actions/app_mode_actions';

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      normal_message: false,
      error_message: false,
      loading_anime: false
    };
  }

  handleEmailSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading_anime: true });

    let normal_message, error_message;

    try {
      const response = await axios.post('/api/request_a_mail', {
        email: this.state.email
      });

      // if (response.status === 200) {
        error_message = false;
        normal_message = 'An email has been sent';
      // }
    } catch (error) {
      // console.log(error.response);
      if (error.response.status === 422) {
        error_message = 'No user found with this email';
        normal_message = false
      } else if (error.response.status === 405) {
        error_message = 'The Email couldn\'t be sent';
        normal_message = false;
      } else {
        error_message = 'Unknown error occured';
        normal_message = false;
      }
    }

    this.setState({ loading_anime: false, error_message, normal_message });
  }

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
          <h3>Forgot Password</h3>
          <form onSubmit={this.handleEmailSubmit}>
            <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={(e) => {
              this.setState({ email: e.target.value });
            }}/>
            {this.state.error_message && (
              <p className='login-page-div-error_message'>{this.state.error_message}</p>
            )}
            {this.state.normal_message && (
              <p className='login-page-div-normal_message'>{this.state.normal_message}</p>
            )}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              <button name='Submit Email' type='submit'>Submit</button>
              {this.state.loading_anime && (
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleAppMode: (x) => dispatch(handleAppMode(x))
})

export default {
  component: connect(null, mapDispatchToProps)(ForgotPasswordPage)
};