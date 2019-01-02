import React from 'react';
import moment from 'moment';

import { funcHandleMonth, funcHandleYear } from '../../utils/month_cursor_helpers';
import CalendarRowItem from './calendar_row_item';
import { Object } from 'core-js';

class CalendarRowComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // thisRowEvents: [],
      // prevRowEvents: [],
    };
  }

  // async componentWillReceiveProps(nextProps) {
  //   const { date_distribution_map, events, index } = nextProps;

  //   const startof_row = date_distribution_map[(index * 7)];
  //   const endof_row = date_distribution_map[6 + (index * 7)];

  //   await this.setState({
  //     thisRowEvents: events.filter((event) => {
  //       return moment(event.date_from).isSameOrBefore(endof_row, 'day') && moment(event.date_from).isSameOrAfter(startof_row, 'day');
  //     }),
  //     prevRowEvents: events.filter((event) => {
  //       return moment(event.date_to).isSameOrBefore(endof_row, 'day') && moment(event.date_from).isSameOrBefore(startof_row, 'day');
  //     })
  //   });

  //   // console.log(this.state.thisRowEvents);
  //   this.row_events_map = this.state.thisRowEvents;
  //   console.log('row_events_map', this.row_events_map);
    
    
  // }

  // row_events_map = [];

  

  render() {
    const { date_distribution_map } = this.props;

    let itemArr = [1, 2, 3, 4, 5, 6, 7];
  
    const miniCalendarStyle = this.props.isFiveRows ? {height: 'calc(100% / 5)'} : {height: 'calc(100% / 6)'};
    const calendarStyle_first = this.props.isFiveRows
      ? {height: 'calc((100% / 5) + 20px - 5px)'}
      : {height: 'calc((100% / 6) + 20px - 4px)'};
    const calendarStyle_rest = this.props.isFiveRows
      ? {height: 'calc(((100% - 20px) / 5) - 1px)'}
      : {height: 'calc(((100% - 20px) / 6) - 1px)'};
  
    return (
      <div className={this.props.miniCalendar ? 'calendar-row-000-mini' : 'calendar-row-000'}
        style={
          this.props.miniCalendar
          ? miniCalendarStyle
          : (this.props.index === 0) ? calendarStyle_first : calendarStyle_rest
        }
      >
        {itemArr.map((x, i) => {
          const dateStamp = date_distribution_map[i + (this.props.index * 7)];
          
          return (
            <CalendarRowItem
              key={i}
              index={i}
              rowIndex={this.props.index}
              date={parseInt(moment(dateStamp).format('DD'))}
              dateStamp={dateStamp}
              handleUrlNavigation={this.props.handleUrlNavigation}
              miniCalendar={this.props.miniCalendar}
              miniCalendarState={this.props.miniCalendarState}

              // itemEventMap={this.state.thisRowEvents.map((event, i) => {
              //   // const event = this.row_events_map.unshift();
              //   // if (Object.isObject(event)) {
              //     console.log('event event event', event);
              //     if (moment(event.date_from).isSame(dateStamp, 'day')) {
              //       // event.client_isVisible = true;
              //       return event;
              //     } else if (moment(event.date_from).isBefore(dateStamp, 'day') && moment(event.date_to).isSameOrAfter(dateStamp, 'day')) {
              //       // event.client_isVisible = false;
              //       // return event;
              //       return false;
              //     }
              //     return null;
                  
              //   // }
                
              // })}
            />
          );
        })}
      </div>
    );
  }
}

export default CalendarRowComp;


  // updateFreeSpacesMap = async (i, bool = true) => {
  //   const tempSpaceMap = this.state.free_spaces_map;

  //   if (bool) tempSpaceMap[i] = tempSpaceMap[i] + 1;
  //   else tempSpaceMap[i] = tempSpaceMap[i] - 1;

  //   await this.setState({ free_spaces_map: tempSpaceMap });
  //   console.log(this.state.free_spaces_map);    
  // }

// const rowItemEvents = row_events ? row_events.filter(({ date_from, date_to }) => {
          //   return moment(date_from).isSame(dateStamp, 'day') || moment(date_to).isSame(dateStamp, 'day');
          // }) : [];

// start_events={
//   events_startInRow
//   ? events_startInRow.filter(({ date_from }) => moment(date_from).isSame(dateStamp, 'day'))
//   : []
// }
// end_events={
//   events_onlyEndInRow
//   ? events_onlyEndInRow.filter(({ date_to }) => moment(date_to).isSame(dateStamp, 'day'))
//   : []
// }