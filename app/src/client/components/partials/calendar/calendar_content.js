import React from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import Dropdown from 'react-dropdown-modal';

// import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';
import CalendarRowComp from './calendar_row';
import CalendarAddEventComp from './calendar_add_event';

class CalendarContentComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOneIndex: 0,
      dateDistMap: {},
      dateDistMapInverse: {},
      eventDistMap: {},
      theNewEvent: null,
      // dropdown_visible: false,
      dropdown_close: false
    };
  }

  newEventModalFunc = (eventObj) => {
    this.setState({ theNewEvent: eventObj });
  }

  asyncSetState = (obj) => {
    return new Promise((resolve) => {
      this.setState(obj, resolve)
    });
  }

  handleUrlNavigation = (year, month) => {
    const history = createBrowserHistory();
    history.push(`/calendar?year=${year}&month=${month}`);
  }

  updateDateDistribution = async (year, month) => {
    const { dayOneIndex, dateDistMap, dateDistMapInverse }  = this.state;
    // Loop for 42 Times - for 42 Box-es
    for (let k = 0; k < 42; k++) {
      const value = new Date(year, month, (k - dayOneIndex + 1)).valueOf();
      dateDistMap[k] = value;
      dateDistMapInverse[value] = k;
    }
    await this.asyncSetState({ dateDistMap, dateDistMapInverse });
  }

  updateEventDistribution = async () => {
    const eventDistMap = {};
    const { dateDistMapInverse, dateDistMap } = this.state;
    const { events } = this.props;

    if (events) {
      // Filter event's that are only from 3 current months - This, Prev, Next
      const myEvents = events.filter(({ date_from, date_to, title }) => {
        const x = (
          // date_from >= dateDistMap[0] && date_to <= dateDistMap[41]
          // || date_from >= dateDistMap[0] && date_from <= dateDistMap[41]
          // || date_to >= dateDistMap[0] && date_to <= dateDistMap[41]
          date_from >= dateDistMap[0] && date_to <= dateDistMap[41]
          || date_from >= dateDistMap[0] && date_from <= dateDistMap[41]
          || date_from <= dateDistMap[0] && date_to >= dateDistMap[0]
          // || date_from <= dateDistMap[0] && date_to <= dateDistMap[41]
          // || date_to >= dateDistMap[0] && date_to <= dateDistMap[41]
        );

        return x;
      });
  
      // Map over myEvents to build a Event-map
      await myEvents.map((event) => {
        // Event start and end timestamp
        const eventStart = new Date(event.date_from).setHours(0,0,0,0).valueOf();
        const eventEnd = new Date(event.date_to).setHours(0,0,0,0).valueOf();
  
        // Event start and end index (index on calendar => 0-to-41)
        const startIndex = eventStart < dateDistMap[0]
          ? 0 : dateDistMapInverse[eventStart];
        const endIndex = eventEnd > dateDistMap[41]
          ? 41 : dateDistMapInverse[eventEnd];
        
        // Setting startIndex & endIndex on the event object
        event.startIndex = startIndex;
        event.endIndex = endIndex;

        // console.log(event);

        // tempLength => records length of calendar-index (only where startIndex matches)
        let tempLength;
        if (Array.isArray(eventDistMap[startIndex])) {
          // tempLength = eventDistMap[startIndex].length;

          // setDone => saves from adding two same eventObj
          let setDone = false;
          // loop over elements of calendar-index (only where startIndex matches)
          for (let f = 0; f < eventDistMap[startIndex].length; f++) {
            // if some spot is { null } it sets the new event there
            if (eventDistMap[startIndex][f].val === null) {
              eventDistMap[startIndex][f] = { val: event };
              tempLength = f;
              setDone = true;
              break;
            }
          }
          // if no { null } element then concat the eventObj 
          if (!setDone) {
            tempLength = eventDistMap[startIndex].length;
            eventDistMap[startIndex] = [ ...eventDistMap[startIndex], { val: event } ];
          }
        } else {
          // If the value on eventDistMap is not an array
          tempLength = 0;
          eventDistMap[startIndex] = [ { val: event } ];
        }
  
        // For loop that iretates between { startIndex + 1 } and { endIndex } & sets the value to { false }
        for (let k = (startIndex + 1); k <= endIndex; k++) {
          // To ignore the null spaces
          for (let g = 0; g < tempLength; g++) {
            if (Array.isArray(eventDistMap[k]) && eventDistMap[k][g]) {
              if (k % 7 !== 0 && eventDistMap[k][g].val !== false) {
                eventDistMap[k][g] = { val: null };
              }
            } else {
              eventDistMap[k] = [ { val: null } ];
            }
          }

          // If finds all { false } on the loop, concat { false }
          // But if Calendar-index is start of row add rest of the same event to it
          if (k % 7 === 0) {
            const tempEvent = { ...event };
            tempEvent.startIndex = k;
            tempEvent.endIndex = endIndex;
            
            if (Array.isArray(eventDistMap[k])) {
              eventDistMap[k][tempLength] = { val: tempEvent };
            } else {
              eventDistMap[k] = [ { val: { ...tempEvent } } ];              
            }
            
          } else {
            if (Array.isArray(eventDistMap[k])) {
              eventDistMap[k][tempLength] = { val: false, refEvent: event };
            } else {
              eventDistMap[k] = [ { val: false, refEvent: event } ];
            }
          }
        }
      });
  
      await this.setState({ eventDistMap });
    }
  }

  updateStateDistributionMaps = async (props) => {
    const { year, month } = props.miniCalendarState ? props.miniCalendarState : props;
    const { dayOneIndex } = this.state;

    const tempDayOne = new Date(year, month, 1).getDay();
    if (tempDayOne !== dayOneIndex) await this.asyncSetState({ dayOneIndex: tempDayOne });
    
    await this.updateDateDistribution(year, month);
    await this.updateEventDistribution();
  }

  async componentWillReceiveProps(nextProps) {
    await this.updateStateDistributionMaps(nextProps);
  }
  
  async componentWillMount() {    
    await this.updateStateDistributionMaps(this.props);
  }

  render() {
    const tempProps = this.props.miniCalendarState ? this.props.miniCalendarState : this.props;
    const { year, month } = tempProps;

    const numDatesThis = new Date(year, month + 1, 0).getDate();
    const numDatesPrev = new Date(year, month, 0).getDate();
    const isFiveRows = (this.state.dayOneIndex + numDatesThis) <= 35;
    const rowArr = isFiveRows ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6];    
    
    return (
      <div className={this.props.miniCalendar ? 'calendar-content-000-mini' : 'calendar-content-000'}>
        {rowArr.map((x, i) => {
          return (
            <CalendarRowComp
              key={i}
              index={i}
              numDatesPrev={numDatesPrev} // Number of days in the Previous Month
              numDatesThis={numDatesThis} // Number of days in the This Month
              year={year} // { year } from Redux State
              month={month} // { month } from Redux State
              // rowFirstDate={((7 * (i - 1)) + 1) + (7 - this.state.dayOneIndex)} // First Date of The Row
              isFiveRows={isFiveRows} // if a 5-row-month { true } else { flase }
              // dayOneIndex={this.state.dayOneIndex} // First Day Of Month's Index in row-1
              handleUrlNavigation={this.handleUrlNavigation} // Function for Month Navigation + URL
              dateDistMap={this.state.dateDistMap} // { dateDistMap } from Component-State
              dateDistMapInverse={this.state.dateDistMapInverse} // { dateDistMapInverse } from Component-State
              eventDistMap={this.state.eventDistMap} // { eventDistMap } from Component-State
              // For Mini-Calendar Only
              miniCalendar={this.props.miniCalendar} // If it's Mini-Calendar or Not
              miniCalendarState={this.props.miniCalendarState} // Mini-Calendar State { year } and { month }
              // events={this.props.events || []}
              toggleEventDetails={this.props.toggleEventDetails}
              newEventModalFunc={this.newEventModalFunc}
            />
          );
        })}
        {(this.state.theNewEvent && !this.props.miniCalendar) && (
          <Dropdown
            visible={!!this.state.theNewEvent}
            onClose={() => {
              this.setState({ theNewEvent: null });
            }}
            // preventDefaultClose={false}
            animation={true}
            animeType='slideUp'
            animeDuration={200}
            animatedClose={this.state.dropdown_close}
            showArrow={false}
            centerPositioning={true}
            modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
            modalBorder={false}
            modalContent={() => (
              <CalendarAddEventComp
                addEvent={true}
                setParentState={(obj) => this.setState(obj)}
                event={this.state.theNewEvent}
                animatedClosing={async (someFunc) => {
                  this.setState({ dropdown_close: true });
                  await someFunc();
                  setTimeout(() => {
                    this.setState({ theNewEvent: null, dropdown_close: false });
                  }, 200);
                }}
              />
            )}
          >
            <div style={{ background: 'black', height: '300px', display: 'none' }}></div>
          </Dropdown>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ calendarMonth, events, groups }, props) => {
  if (props.miniCalendar) return {
    year: calendarMonth.year,
    month: calendarMonth.month,
  }
  return {
    year: calendarMonth.year,
    month: calendarMonth.month,
    events: events.filter((event) => groups.some(({ _id, _isOnCalendar }) => {
      return (event._group === _id) && _isOnCalendar;
    })).sort((a, b) => {
      if (a.date_from === b.date_from) {
        return (a.date_from - a.date_to) > (b.date_from - b.date_to) ? 1 : -1;
      }
      return a.date_from > b.date_from ? 1 : -1;
    })
  }
};

export default connect(mapStateToProps)(CalendarContentComp);