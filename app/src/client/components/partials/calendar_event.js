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
      // windowHeightDiff: 0,
      windowHeight: null,
      // windowWidth: null
      dropdown_close: false // For animated close of dropdown
    };
  }

  returnModalPosition = () => {
    const { screenX, screenY, windowHeight } = this.state;
    const mHeight = 178;
    const mWidth = 340;

    const toBeDown = windowHeight && (screenY + 200) < windowHeight;
    const toBeRight = screenX < 350;

    return {
      left: toBeRight ? (screenX - 8) : (screenX - mWidth + 8),
      top: toBeDown ? (screenY - 8) : (screenY - mHeight + 8)
    }
  }

  render() {
    const { event, visible } = this.props;
    const { startIndex, endIndex } = event;
    const widthExtra = (endIndex - startIndex);

    const { screenX, screenY, windowHeight } = this.state;
    
    return (
      <Dropdown
        visible={this.state.dropdown_visible}
        onButtonClick={(e) => {
          e.stopPropagation();
          const windowHeightDiff = window ? (window.outerHeight - window.innerHeight) : 0;
          this.setState({
            screenX: e.screenX,
            screenY: e.screenY - windowHeightDiff,
            dropdown_visible: true,
            windowHeight: window ? document.documentElement.offsetHeight : null,
            // windowWidth: window ? document.documentElement.offsetWidth : null,
          });
        }}
        onClose={() => {
          this.setState({ screenX: null, screenY: null, dropdown_visible: false });
        }}
        // preventDefaultClose={false}
        animation={true}
        animeType={screenX < 350 ? 'slideRight' : 'slideLeft'}
        animeDuration={200}
        animatedClose={this.state.dropdown_close}
        showArrow={false}
        position={this.returnModalPosition()}
        modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
        modalBorder={false}
        modalContent={() => (
          <CalendarEventViewComp
            addEvent={false}
            event={event}
            animatedClosing={(someFunc) => {
              this.setState({ dropdown_close: true });
              someFunc();
              setTimeout(() => {
                this.setState({ dropdown_visible: false, dropdown_close: false });
              }, 200);
            }}
            toggleEventDetails={this.props.toggleEventDetails}
          />
        )}
      >
        {visible ? (
          <div draggable
            className='calendar-event-comp-000'
            style={{
              overflowX: 'visible',
              width: `calc(${(widthExtra + 1) * 100}% - 10px - 4px)`,
              background: event.hex_color,
            }}
            onClick={() => {        
              this.setState({ dropdown_visible: true })
            }}
          >
            <div className='calendar-event-div-over-title-001'>
              <p>{event.title}</p>
            </div>
          </div>
        ) : (
          <div className='calendar-row-item-empty-event'></div>
        )}
        
      </Dropdown>
    );
  }
}

export default CalendarEventComp;