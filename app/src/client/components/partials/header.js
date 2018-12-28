import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import moment from 'moment';
import { createBrowserHistory } from 'history';

import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';
import { toggleSideBar } from '../../actions/side_bar_actions';
import CustomRodalComp from '../reusables/custom_rodal';

class HeaderComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options_rodal_visible: false,
      // year: parseInt(moment().format('YYYY')),
      // month: parseInt(moment().format('M'))
    }
  }

  stateMonthCursor = (bool) => {
    const funcHandleMonth = (prevMonth, bool) => {
      if (prevMonth === 1) return bool ? prevMonth + 1 : 12;
      else if (prevMonth === 12) return bool ? 1 : prevMonth - 1;
      else return bool ? prevMonth + 1 : prevMonth - 1;
    }

    const funcHandleYear = (prevYear, prevMonth, bool) => {
      if (prevMonth !== 1 && prevMonth !== 12) return prevYear;
      else if (prevMonth === 12) return bool ? prevYear + 1 : prevYear;
      else if (prevMonth === 1) return bool ? prevYear : prevYear - 1
    }

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
      year: parseInt(moment().format('YYYY')),
      month: parseInt(moment().format('M')),
    });
    const history = createBrowserHistory();
    history.push(`/calendar?year=${this.props.year}&month=${this.props.month}`);
  }

  month_name_dictionary = {
    0: 'January', 1: 'February', 2: 'March', 3: 'April',
    4: 'May', 5: 'June', 6: 'July', 7: 'August',
    8: 'September', 9: 'October', 10: 'November', 11: 'December',
  }

  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    await this.props.setReduxCalendar({
      year: parseInt(urlParams.get('year')) || parseInt(moment().format('YYYY')),
      month: parseInt(urlParams.get('month')) || parseInt(moment().format('M')),
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
          <Link to='/'><h2><ReactSVG src='/logo.svg'/>My Calendar</h2></Link>
        </div>

        {this.props.auth ? (
          <React.Fragment>
            {(this.props.appMode === 0) && (
              <div className='header-001-calendar-nav'>
                <button onClick={this.navigateToNow}>Today</button>

                <button style={{ marginRight: '0px' }} onClick={() => {
                  this.handleNavigation(false);
                }} className='header-002-nav-btn'>{'<'}</button>

                <button style={{ marginLeft: '0px' }} onClick={() => {
                  this.handleNavigation(true);
                }} className='header-002-nav-btn'>{'>'}</button>

                <p>{this.month_name_dictionary[this.props.month - 1]}&nbsp;{this.props.year}</p>

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

const mapStateToProps = ({ calendarMonth }) => ({
  year: calendarMonth.year,
  month: calendarMonth.month
});

const mapDispatchToProps = (dispatch) => ({
  toggleSideBar: () => dispatch(toggleSideBar()),
  setReduxCalendar: ({ year, month }) => dispatch({ type: SET_CALENDAR_MONTH_STATE, year, month })
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComp);