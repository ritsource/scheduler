import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';

import { intro_paragraph } from '../../utils/constants';
import { handleAppMode } from '../../actions/app_mode_actions';

export const AboutPage = (props) => {
  useEffect(() => {
    props.handleAppMode(3);
  }, []);

  return (
    <div className='about-page-000'>
      <div className='about-page-001-info-div' style={{ marginTop: '-40px' }}>
        <div style={{ width: '70%', marginLeft: '30%' }}>
          <h1 className='my-theme-gradient-text'><ReactSVG src='/calendar.svg'/>Schedular</h1>
          <p>{intro_paragraph}</p>
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Link to='/login'><button className='my-theme-gradient-btn'>Sign in</button></Link>
            <p style={{ marginLeft: '10px' }} className='the-hover-blue-text'>
              <a target='_blank' href='https://github.com/ritwik310/my-calendar'>view on Github!</a>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className='about-page--svg-div-001'>
          <ReactSVG src='/blueish/undraw_taking_notes.svg'/>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleAppMode: (x) => dispatch(handleAppMode(x))
})

export default {
  component: connect(null, mapDispatchToProps)(AboutPage)
};