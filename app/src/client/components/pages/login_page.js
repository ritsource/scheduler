import React from 'react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      register_mode: true
    };
  }

  render() {
    return (
      <div className='login-page-000'>
        <div className='login-page-div-001'>
          <h3>{this.state.register_mode ? 'Create Account' : 'Just Login'}</h3>
          {this.state.register_mode ? (
            <form>
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
            <form>
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
      </div>
    );
  }
}

export default {
  component: LoginPage
};