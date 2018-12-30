import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { asyncFetchGroups, asyncPostGroup, asyncEditGroup, asyncDeleteGroup } from '../../actions/group_actions';
import CalendarContentComp from './calendar_content';
import CalendarSidebarNavigator from './calendar_sidebar_navigator';
import CalendarSidebarItem from './calendar_sidebar_item';

class CalendarSidebarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: parseInt(moment().format('YYYY')),
      month: parseInt(moment().format('M')),
      newGroupTitle: ''
    };
  }

  handleNavigation = (bool) => {
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

    this.setState((prevState) => ({
      year: funcHandleYear(prevState.year, prevState.month, bool),
      month: funcHandleMonth(prevState.month, bool)
    }));
  }

  navigateToNow = () => {
    this.setState((prevState) => ({
      year: parseInt(moment().format('YYYY')),
      month: parseInt(moment().format('M')),
    }));
  }

  async componentDidMount() {
    this.props.asyncFetchGroups();

    const urlParams = new URLSearchParams(window.location.search);
    await this.setState({
      year: parseInt(urlParams.get('year')) || parseInt(moment().format('YYYY')),
      month: parseInt(urlParams.get('month')) || parseInt(moment().format('M')),
    });
  }

  render() {
    return (
      <div className={`calendar-sidebar-000 ${this.props.visible ? 'sidebar-slided-right' : 'sidebar-slided-left'}`}>
        <CalendarSidebarNavigator
          miniCalendarState={{ year: this.state.year, month: this.state.month }}
          handleNavigation={this.handleNavigation}
          navigateToNow={this.navigateToNow}
        />
        <CalendarContentComp miniCalendarState={this.state} miniCalendar={true}/>

        <div className='any-list-comp-container-999'>
          <div style={{ height: 'calc(100% - 7px)' }} className='calendar-sidebar-001-the-list any-list-comp-the-list-999'>
            {this.props.groups.map((group, i) => (
              <CalendarSidebarItem
                key={i}
                index={i}
                group={group}
                asyncEditGroup={this.props.asyncEditGroup}
                asyncDeleteGroup={this.props.asyncDeleteGroup}
              />
            ))}
          </div>
          <form
            style={{ bottom: '0px' }}
            className='any-list-comp-bottom-form-999'
            onSubmit={async (e) => {
              e.preventDefault();
              if (this.state.newGroupTitle !== '') await this.props.asyncPostGroup({ title: this.state.newGroupTitle });
              this.setState({ newGroupTitle: '' });
              scrollToBottom('.calendar-sidebar-001-the-list');
            }}
          >
            <input
              style={{ margin: '1px 0px' }}
              name='title'
              autoComplete='off'
              placeholder='+ New Group'
              value={this.state.newGroupTitle}
              onChange={(e) => {
                this.setState({ newGroupTitle: e.target.value });
              }}
            />
            {this.state.newGroupTitle !== '' && (
              <button type='submit'>Add</button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ groups }) => ({ groups });

const mapDispatchToProps = (dispatch) => ({
  asyncFetchGroups: () => dispatch(asyncFetchGroups()),
  asyncPostGroup: (abc) => dispatch(asyncPostGroup(abc)),
  asyncEditGroup: (abc, xyz) => dispatch(asyncEditGroup(abc, xyz)),
  asyncDeleteGroup: (abc) => dispatch(asyncDeleteGroup(abc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarSidebarComp);