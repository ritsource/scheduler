import React from 'react';
import axios from 'axios';
import ReactSVG from 'react-svg';
import { connect } from 'react-redux';

import { handleAppMode } from '../../actions/app_mode_actions';

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_pass_1: '',
      new_pass_2: '',
      pass_unmatch_err: false,
      pass_matched: false,
      error_message: false,
      loading_anime: false,
    };
  }

  handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (this.state.new_pass_1 !== this.state.new_pass_2) {
      return this.setState({
        pass_unmatch_err: true, error_message: 'Password mismatch'
      });
    }

    if (this.state.new_pass_1.length < 8) {
      return this.setState({ error_message: 'Atleast 8 characters needed' });
    }

    this.setState({ loading_anime: true });
    let error_message;

    const urlParams = new URLSearchParams(window.location.search);

    try {
      const response = await axios.post('/api/password_reset', {
        token: urlParams.get('token'),
        password: this.state.new_pass_1
      });
      
      window.location.replace('/');
    } catch (error) {
      // console.log(error.response);
      if (error.response.status === 422) {
        error_message = 'Unable to change password';
      } else {
        error_message = 'Unknown error occured';
      }
    }

    this.setState({ loading_anime: false, error_message });
  }

  componentDidMount() {
    this.props.handleAppMode(2);
  }

  render() {
    const { new_pass_1, new_pass_2, pass_unmatch_err, pass_matched, error_message, loading_anime } = this.state;

    return (
      <div className='login-page-000'>
        <div className='login-page--svg-div-001'>
          <ReactSVG src='/undraw_security.svg'/>
        </div>
        <div className='login-page-div-001'>
          <h3>New Password</h3>
          <form onSubmit={this.handlePasswordSubmit}>
            <input autoComplete='off' type='text' name='password_1' placeholder='New password' value={new_pass_1} onChange={(e) => {
              this.setState({ new_pass_1: e.target.value });
            }}/>
            <input
              type='password'
              name='password_2'
              placeholder='Confirm password'
              value={new_pass_2}
              onChange={(e) => {
                this.setState({
                  new_pass_2: e.target.value,
                  pass_unmatch_err: (e.target.value.length > 3) && (new_pass_1 !== e.target.value),
                  pass_matched: (new_pass_1 === e.target.value)
                });
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
  component: connect(null, mapDispatchToProps)(ResetPasswordPage)
};