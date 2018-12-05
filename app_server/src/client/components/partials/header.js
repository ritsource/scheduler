import React from 'react';
import { Link } from 'react-router-dom';

export const HeaderComp = (props) => (
  <div className='header-000'>
    <h2><span>✅❎</span>Tasklendar</h2>
    {(props.appMode === 0) && (
      <div className='header-001-calendar-nav'>
        <Link to='/today'><button>Today</button></Link>
        <Link to='/today'><button className='header-002-nav-btn'>{'<'}</button></Link>
        <h3>December 2018</h3>
        <Link to='/today'><button className='header-002-nav-btn'>{'>'}</button></Link>
      </div>
    )}
    <div className='header-001-app-mode-div'>
      <Link to='/me'><button disabled={props.appMode === 0}>Calendar</button></Link>
      <Link to='/me'><button disabled={props.appMode === 1}>Todo</button></Link>
    </div>
  </div>
);

export default HeaderComp;