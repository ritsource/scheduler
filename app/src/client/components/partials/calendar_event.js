import React, { Component } from 'react';
import Dropdown from 'react-dropdown-modal';

import CalendarEventViewComp from './calendar_event_view';

class CalendarEventComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown_visible: false,
      screenX: null,
      screenY: null,
      windowHeightDiff: 0,
      date_from_panel: { visible: false, screenX: null, screenY: null },
      date_to_panel: { visible: false, screenX: null, screenY: null },
      color_panel: { visible: false, screenX: null, screenY: null }
    };
  }
  render() {
    const { event, visible } = this.props;
    const { startIndex, endIndex } = event;
    const widthExtra = (endIndex - startIndex);
    
    return (
      <Dropdown
        visible={this.state.dropdown_visible}
        onButtonClick={(e) => {
          const windowHeightDiff = window ? (window.outerHeight - window.innerHeight) : 0;
          this.setState({
            screenX: e.screenX, screenY: e.screenY, dropdown_visible: true, windowHeightDiff
          });
        }}
        onClose={() => {
          this.setState({ screenX: null, screenY: null, dropdown_visible: false });
        }}
        // preventDefaultClose={false}
        showArrow={false}
        position={{
          right: `calc(100vw - ${this.state.screenX}px - 8px)`,
          top: (this.state.screenY - this.state.windowHeightDiff - 8)
        }}
        modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
        modalBorder={false}
        modalContent={() => (
          <CalendarEventViewComp addEvent={false} event={event}/>
        )}
      >
        <div draggable
          className='calendar-event-comp-000'
          style={{
            overflowX: 'visible',
            width: `calc(${(widthExtra + 1) * 100}% - 10px - 4px)`,
            background: event.hex_color
          }}
          onClick={() => {
            console.log('lol');            
            this.setState({ dropdown_visible: true })
          }}
        >
          <div className='calendar-event-div-over-title-001'>
            <p>{event.title}</p>
          </div>
        </div>
      </Dropdown>
    );
  }
}

export default CalendarEventComp;