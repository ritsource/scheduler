import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import { createBrowserHistory } from 'history';
import { FaArrowRight, FaSortDown } from 'react-icons/fa';
import { MdSettings, MdInvertColors } from 'react-icons/md';
import { GoOrganization } from 'react-icons/go';  

import { month_name_dictionary } from '../../utils/constants';
import { funcHandleMonth, funcHandleYear } from '../../utils/funcs';
import changeAppTheme from '../../helpers/change_theme';
import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';
import { toggleSideBar } from '../../actions/side_bar_actions';
import Dropdown from 'react-dropdown-modal';

class HeaderComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown_visible: false,
      screenX: null,
      screenY: null
    }
  }

  stateMonthCursor = (bool) => {
    this.props.setReduxCalendar({
      year: funcHandleYear(this.props.year, this.props.month, bool),
      month: funcHandleMonth(this.props.month, bool)
    });
  }

  handleNavigation = async (bool) => {
    await this.stateMonthCursor(bool);
    const history = createBrowserHistory();
    history.push(`/calendar?year=${this.props.year}&month=${this.props.month}`);
  }

  navigateToNow = async () => {
    await this.props.setReduxCalendar({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    });
    const history = createBrowserHistory();
    history.push(`/calendar?year=${this.props.year}&month=${this.props.month}`);
  }

  render() {
    const myAppTheme = window.localStorage.getItem('myAppTheme');
    return (
      <div className='header-000'>
        <div className='header-001-left-div'>
          <div className='header-002-hamburger-div' onClick={this.props.toggleSideBar}>
            <div></div><div></div><div></div>
          </div>
          {/* <Link to='/'><h2><ReactSVG src='/logo.svg'/>My Calendar</h2></Link> */}
          <Link to='/'><h2>My Calendar</h2></Link>
        </div>

        {this.props.auth && (
          <React.Fragment>
            {(this.props.appMode === 0) && (
              <div className='header-001-calendar-nav'>
                <button onClick={this.navigateToNow}>Today</button>

                <button
                  style={{ marginRight: '0px' }}
                  className='header-002-nav-btn'
                  onClick={() => {
                    this.handleNavigation(false);
                  }}
                >{'<'}</button>

                <button
                  className='header-002-nav-btn'
                  style={{ marginLeft: '0px' }}
                  onClick={() => {
                    this.handleNavigation(true);
                  }}
                >{'>'}</button>

                <p>{month_name_dictionary[this.props.month]}&nbsp;{this.props.year}</p>
              </div>
            )}

            <div className='header-001-right-div'>
              <div className='header-002-app-mode-div'>
                <Link to='/calendar'><button disabled={this.props.appMode === 0}>Calendar</button></Link>
                <Link to='/todo'><button disabled={this.props.appMode === 1}>Todo</button></Link>
              </div>
              <Dropdown
                visible={this.state.dropdown_visible}
                onButtonClick={() => {
                  this.setState({ dropdown_visible: true });
                }}
                onClose={() => {
                  this.setState({ dropdown_visible: false });
                }}
                showArrow={true}
                arrowPosition={{ right: '0px' }}
                position={{
                  right: '20px',
                  top: '55px'
                }}
                modalBackground='var(--background-color)'
                modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
                modalBorder={false}
                modalContent={() => (
                  <div>
                    <p className='any-dropdown-content-item-999'
                    >Signed in as <span style={{fontWeight: 'bold'}}>
                      {this.props.auth.name.split(' ')[0]}</span>
                    </p>

                    {/* <Link to='/about'>
                      <p className='any-dropdown-content-item-999'><GoOrganization style={{
                        marginRight: '8px',
                        marginBottom: '-2px'
                      }}/>About</p>
                    </Link> */}

                    <Link to='/settings'>
                      <p className='any-dropdown-content-item-999'><MdSettings style={{
                        marginRight: '8px',
                        marginBottom: '-2px'
                      }}/>Settings</p>
                    </Link>

                    <p className='any-dropdown-content-item-999'
                      onClick={(e) => {
                        changeAppTheme(myAppTheme === 'darkOnly' ? 'lightOnly' : 'darkOnly')
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    ><MdInvertColors style={{
                      marginRight: '8px',
                      marginBottom: '-2px'
                    }}/>
                      Dark theme
                      <div style={myAppTheme === 'darkOnly' ? {
                        background: 'var(--theme-color)',
                        height: '13px',
                        width: '13px',
                        border: '1px solid var(--theme-color)',
                        marginLeft: '9px',
                        borderRadius: '50%'
                      } : {
                        height: '13px',
                        width: '13px',
                        border: '1px solid var(--theme-color)',
                        marginLeft: '9px',
                        borderRadius: '50%'
                      }}></div>
                    </p>

                    <a href='/auth/logout'>
                      <p className='any-dropdown-content-item-999'><FaArrowRight style={{
                        marginRight: '8px',
                        marginBottom: '-2px'
                      }}/>Logout</p>
                    </a>
                  </div>
                )}
              >
                <div
                  className='header-002-avatar-div'
                  onClick={() => this.setState({ options_rodal_visible: true })}
                >
                  <img src={this.props.auth.avatar_url}/>
                  <FaSortDown style={{
                    marginTop: '5px',
                    marginLeft: '5px'
                  }}/>
                </div>
              </Dropdown>
            </div>
          </React.Fragment>
        )/* : (
          <div className='header-unauth-button-row-001'>
            <Link className='the-hover-blue-text' to='/login'>Login</Link>
            <Link className='the-hover-blue-text' to='/about'>About</Link>
            <a
              target='_blank'
              className='the-hover-blue-text'
              href='https://github.com/ritwik310/my-calendar'
            >Github</a>
          </div>
        )*/}
      </div>
    );
  }
}

const mapStateToProps = ({ calendarMonth }) => ({
  year: calendarMonth.year,
  month: calendarMonth.month
});

const mapDispatchToProps = (dispatch) => ({
  toggleSideBar: () => dispatch(toggleSideBar()),
  setReduxCalendar: ({ year, month }) => dispatch({ type: SET_CALENDAR_MONTH_STATE, year, month })
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComp);