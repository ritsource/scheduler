import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { toggleSideBar } from '../../actions/side_bar_actions';

export const HeaderComp = (props) => (
  <div className='header-000'>
    <div className='header-001-left-div'>
      <div
        className='header-002-hamburger-div'
        onClick={props.toggleSideBar}
      >
        <div></div><div></div><div></div>
      </div>
      <h2><span>✅❎</span>Tasklendar</h2>
    </div>
    {(props.appMode === 0) && (
      <div className='header-001-calendar-nav'>
        <Link to='/today'><button>Today</button></Link>
        <Link to='/today'><button className='header-002-nav-btn'>{'<'}</button></Link>
        <h3>December 2018</h3>
        <Link to='/today'><button className='header-002-nav-btn'>{'>'}</button></Link>
      </div>
    )}
    <div className='header-001-app-mode-div'>
      <Link to='/calendar'><button disabled={props.appMode === 0}>Calendar</button></Link>
      <Link to='/todo'><button disabled={props.appMode === 1}>Todo</button></Link>
    </div>
  </div>
);

// const mapDispatchToProps = (dispatch) => ({
//   toggleSideBar: () => dispatch(toggleSideBar())
// })

export default connect(null, { toggleSideBar })(HeaderComp);