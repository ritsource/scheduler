import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import { createBrowserHistory } from 'history';

import { month_name_dictionary } from '../../utils/constants';
import { funcHandleMonth, funcHandleYear } from '../../utils/funcs';
import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';
import { toggleSideBar } from '../../actions/side_bar_actions';

import HeaderOptDropdownComp from '../reusables/opt_dropdowns/header_opt';

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
    return (
      <div className='header-000'>
        <div className='header-001-left-div'>
          <div className='header-002-hamburger-div' onClick={this.props.toggleSideBar}>
            <div></div><div></div><div></div>
          </div>
          <Link to='/'><h2 className='my-theme-gradient-text'><ReactSVG src='/calendar.svg'/>Schedular</h2></Link>
          {/* <Link to='/'><h2>My Calendar</h2></Link> */}
        </div>

        {this.props.auth ? (
          <React.Fragment>
            {(this.props.appMode === 0) && (
              <div className='header-001-calendar-nav'>
                <button name='Navigate to Today'
                  className='awesome-app-unique-btn-999'
                  onClick={this.navigateToNow}
                >Today</button>

                <button name='Navigate to Previous Month'
                  style={{ marginRight: '0px' }}
                  className='header-002-nav-btn'
                  onClick={() => {
                    this.handleNavigation(false);
                  }}
                >{'<'}</button>

                <button name='Navigate to Next Month'
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
                <Link to='/calendar'>
                  <button name='Chnage to Calendar Mode' className='awesome-app-unique-btn-999'
                    disabled={this.props.appMode === 0}>Calendar
                  </button>
                </Link>
                <Link to='/todo'>
                  <button name='Chnage to Todo Mode' className='awesome-app-unique-btn-999'
                    disabled={this.props.appMode === 1}>Todo
                  </button>
                </Link>
              </div>
              <HeaderOptDropdownComp
                { ...this.state }
                { ...this.props }
                setParentState={(obj) => this.setState(obj)}
              />
            </div>
          </React.Fragment>
        ) : (
          <div className='header-unauth-button-row-001'>
            {/* <Link className='the-hover-blue-text' to='/login'>Login</Link> */}
            {/* <Link className='the-hover-blue-text' to='/about'>About</Link> */}
            <a className='the-hover-blue-text' href='/about'>About</a>
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

const mapStateToProps = ({ calendarMonth }) => ({
  year: calendarMonth.year,
  month: calendarMonth.month
});

const mapDispatchToProps = (dispatch) => ({
  toggleSideBar: () => dispatch(toggleSideBar()),
  setReduxCalendar: ({ year, month }) => dispatch({ type: SET_CALENDAR_MONTH_STATE, year, month })
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComp);