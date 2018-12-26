import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg'

import { toggleSideBar } from '../../actions/side_bar_actions';
import CustomRodalComp from '../reusables/custom_rodal';

class HeaderComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options_rodal_visible: false
    }
  }

  render() {
    return (
      <div className='header-000'>
        <div className='header-001-left-div'>
          <div className='header-002-hamburger-div' onClick={this.props.toggleSideBar}>
            <div></div><div></div><div></div>
          </div>
          <Link to='/'>
          {/* <a href='/'> */}
            <h2><ReactSVG src='/logo.svg'/>My Calendar</h2>
          {/* </a> */}
          </Link>
        </div>

        {this.props.auth ? (
          <React.Fragment>
            {(this.props.appMode === 0) && (
              <div className='header-001-calendar-nav'>
                <Link to='/today'><button>Today</button></Link>
                <Link to='/today'>
                  <button className='header-002-nav-btn'><i className="fas fa-less-than"></i></button>
                </Link>
                <h3>December 2018</h3>
                <Link to='/today'>
                  <button className='header-002-nav-btn'><i className="fas fa-greater-than"></i></button>
                </Link>
              </div>
            )}

            <div className='header-001-right-div'>
              <div className='header-002-app-mode-div'>
                <Link to='/calendar'><button disabled={this.props.appMode === 0}>Calendar</button></Link>
                <Link to='/todo'><button disabled={this.props.appMode === 1}>Todo</button></Link>
              </div>
              <div
                className='header-002-avatar-div'
                onClick={() => this.setState({ options_rodal_visible: true })}
              >
                <img src={this.props.auth.avatar_url}/>
                <i className="fas fa-sort-down"></i>
              </div>
            </div>
        
            <CustomRodalComp
              borderRadius='0px'
              marginTop='55px'
              right='20px'
              visible={this.state.options_rodal_visible}
              toggleVisibility={() => {
                this.setState({ options_rodal_visible: false });
              }}
            >
              <div className='header-rodal-content-003'>
                <Link onClick={() => {
                  this.setState({ options_rodal_visible: false });
                }} to='/settings'><p>Settings</p></Link>
                <a href='/auth/logout'><p>Logout</p></a>
              </div>
            </CustomRodalComp>
          </React.Fragment>
        ) : (
          <div className='header-unauth-button-row-001'>
            <Link className='the-hover-blue-text' to='/login'>Login</Link>
            <Link className='the-hover-blue-text' to='/about'>About</Link>
            <a
              target='_blank'
              className='the-hover-blue-text'
              href='https://github.com/ritwik310/my-calendar'
            >Github</a>
          </div>
        )}
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   toggleSideBar: () => dispatch(toggleSideBar())
// })

export default connect(null, { toggleSideBar })(HeaderComp);