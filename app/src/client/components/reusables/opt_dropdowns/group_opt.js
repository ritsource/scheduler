import React, { Component } from 'react';
import Dropdown from 'react-dropdown-modal';
import { IoIosBrush } from 'react-icons/io';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { FaEllipsisV } from 'react-icons/fa';

import SubOptColorComp from './sub_opt_color';
import EnsureDeletionComp from '../ensure_deletion';

class GroupOptDropdownComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askforDelete: false,
      askforDelete_close: false,
      color_panel: {
        visible: false,
        screenX: null,
        screenY: null,
      }
    }
  }

  render() {
    const { group } = this.props;
    const { screenX, screenY, windowHeightDiff } = this.props;
  
    return (
      <Dropdown
        visible={this.props.dropdown_visible}
        onButtonClick={(e) => {          
          this.props.showDropdown(e.screenX, e.screenY, window ? (window.outerHeight - window.innerHeight) : 0);
        }}
        onClose={this.props.hideDropdown}
        preventDefaultClose={false}
        showArrow={false}
        arrowPosition={{ right: '0px' }}
        position={this.props.positionObj}
        modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
        modalBorder={false}
        modalContent={() => (
          <div>
            <div className='any-dropdown-content-item-999' onClick={this.props.onRenameClick}>
              <MdModeEdit style={{
                marginRight: '8px',
                marginBottom: '-2px'
              }}/>Rename
            </div>
  
            {!group._isPermanent && (
              <EnsureDeletionComp
                visible={this.state.askforDelete}
                message='Are you sure you want to delete the group?'
                onClose={() => {
                  this.setState({ askforDelete_close: true, askforDelete: false });
                  setTimeout(() => {
                    this.props.hideDropdown();
                    this.setState({ askforDelete_close: false });
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
              visible={this.state.color_panel.visible}
              onButtonClick={(e) => {
                e.stopPropagation();
                const tempState = { screenX: e.screenX, screenY: e.screenY, visible: true };
                this.setState({ color_panel: tempState });
              }}
              onClose={() => {
                this.setState({ color_panel: { screenX: null, screenY: null, visible: false } });
              }}
              showArrow={false}
              position={{
                left: (this.state.color_panel.screenX - 185 + 8),
                bottom: `calc(100vh - ${this.state.color_panel.screenY - this.props.windowHeightDiff + 8}px)`
                // top: this.state.color_panel.screenY - this.props.windowHeightDiff + 8
              }}
              modalBackground='var(--background-color)'
              modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
              modalBorder={false}
              customZIndex={21}
              modalContent={() => (
                <SubOptColorComp
                  color_options={this.props.color_options}
                  changeColorFunc={this.props.changeColorFunc}
                />
              )}
            >
              <div className='any-dropdown-content-item-999' onClick={(e) => {
                // e.stopPropagation();
                // const tempState = { screenX: e.screenX, screenY: e.screenY, visible: true };
                // this.setState({ color_panel: tempState });
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

export default GroupOptDropdownComp;