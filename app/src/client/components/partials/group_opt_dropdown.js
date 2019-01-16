import React, { Component } from 'react';
import Dropdown from 'react-dropdown-modal';
import { IoIosBrush } from 'react-icons/io';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { FaEllipsisV } from 'react-icons/fa';

import CalendarSidebarColorComp from './calendar_sidebar_color';
import EnsureDeletionComp from '../reusables/ensure_deletion';

class GreopOptDropdownComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askforDelete: false,
      askforDelete_close: false
    }
  }

  render() {
    const { group } = this.props;
    const { screenX, screenY, windowHeightDiff, color_panel } = this.props;
  
    return (
      <Dropdown
        visible={this.props.dropdown_visible}
        onButtonClick={(e) => {
          const windowHeightDiff = window ? (window.outerHeight - window.innerHeight) : 0;
          this.props.setParentState({ screenX: e.screenX, screenY: e.screenY, dropdown_visible: true, windowHeightDiff });
        }}pro
        onClose={() => {
          this.props.setParentState({ screenX: null, screenY: null, dropdown_visible: false });
        }}
        preventDefaultClose={false}
        showArrow={false}
        arrowPosition={{ right: '0px' }}
        position={this.props.positionObj}
        modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
        modalBorder={false}
        modalContent={() => (
          <div>
            <div className='any-dropdown-content-item-999' onClick={async (e) => {
              e.stopPropagation();
              await this.props.setParentState({ dropdown_visible: false, input_disable: false });
              if (document) {             
                document.querySelector(`#calendar-sidebar-item-input-inside-form-${group._id}`).focus();
              }
            }}><MdModeEdit style={{
              marginRight: '8px',
              marginBottom: '-2px'
            }}/>Rename</div>
  
            {!group._isPermanent && (
              <EnsureDeletionComp
                visible={this.state.askforDelete}
                message='Are you sure you want to delete the group?'
                onClose={() => {
                  this.setState({ askforDelete_close: true, askforDelete: false });
                  setTimeout(() => {
                    this.setState({ askforDelete_close: false });
                    this.props.setParentState({ dropdown_visible: false });
                  }, 300);
                }}
                onDelete={() => this.props.asyncDeleteGroup(group._id)}
                onCancel={() => {
                  this.setState({ askforDelete_close: true });
                  setTimeout(() => {
                    this.setState({ askforDelete_close: false });
                  }, 300);
                }}
              >
                <div className='any-dropdown-content-item-999' onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ askforDelete: true });
                }}><MdDelete style={{
                  marginRight: '8px',
                  marginBottom: '-2px'
                }}/>Delete Group</div>
              </EnsureDeletionComp>
            )}
    
            <Dropdown
              visible={this.props.color_panel.visible}
              // onButtonClick={(e) => {
              //   const tempState = { screenX: e.screenX, screenY: e.screenY, visible: true };
              //   this.props.setParentState({ color_panel: tempState });
              // }}
              onClose={() => {
                const tempState = { screenX: null, screenY: null, visible: false };
                this.props.setParentState({ color_panel: tempState });
              }}
              showArrow={false}
              position={this.props.subPositionObj}
              modalBackground='var(--background-color)'
              modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
              modalBorder={false}
              customZIndex={21}
              modalContent={() => (
                <CalendarSidebarColorComp
                  color_options={this.props.color_options}
                  changeColorFunc={this.props.changeColorFunc}
                />
              )}
            >
              <div className='any-dropdown-content-item-999' onClick={(e) => {
                e.stopPropagation();
                const tempState = { screenX: e.screenX, screenY: e.screenY, visible: true };
                this.props.setParentState({ color_panel: tempState });
              }}>
                <IoIosBrush style={{ marginRight: '8px', marginBottom: '-2px' }}/>
                Color
              </div>
            </Dropdown>              
          </div>
        )}
      >
        {this.props.children}
      </Dropdown>
    );
  }
}

export default GreopOptDropdownComp;