import React from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import CustomRodalComp from '../reusables/custom_rodal';
import Dropdown from 'react-dropdown-modal';

class TodoListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
      dropdown_visible: false,
      screenX: null,
      screenY: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const activeGroup = nextProps.activeGroup;
    if (activeGroup && activeGroup.title !== this.state.title) {
      this.setState({ title: activeGroup.title });
    }
  }

  render() {
    const activeGroup = this.props.activeGroup;

    return (
      <div className='list-002-header'>
        <form onSubmit={async (e) => {
          e.preventDefault();
          await this.props.asyncEditGroup(activeGroup._id, { title: this.state.title });
          if (document) document.querySelector('#list-002-header-input-inside-form').blur();
        }}>
          <input
            id='list-002-header-input-inside-form'
            name='listname'
            autoComplete='off'
            className={`${(this.state.title === '') && 'list-004-invalid-input'}`}
            value={this.state.title}
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
          />
        </form>

        <Dropdown
          visible={this.state.dropdown_visible}
          onButtonClick={(e) => {
            this.setState({ screenX: e.screenX, screenY: e.screenY, dropdown_visible: true });
          }}
          onClose={() => {
            this.setState({ screenX: null, screenY: null, dropdown_visible: false });
          }}
          showArrow={false}
          arrowPosition={{ right: '0px' }}
          position={{
            right: `calc(100vw - ${this.state.screenX}px - 8px)`,
            top: `calc(${this.state.screenY}px - 120px)`
          }}
          modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
          modalBorder={false}
          // backgroundMaskColor='rgba(1, 1, 1, 0.1)'
          modalContent={() => (
            <div>
              <p className='any-dropdown-content-item-999' onClick={async () => {
                await this.setState({ dropdown_visible: false, input_disable: false });
                if (document) document.querySelector('#list-002-header-input-inside-form').focus();
              }}><MdModeEdit style={{
                marginRight: '8px',
                marginBottom: '-2px'
              }}/>Rename</p>
              
              {!activeGroup._isPermanent && (
                <p className='any-dropdown-content-item-999' onClick={() => {
                  this.setState({ dropdown_visible: false });
                  this.props.asyncDeleteGroup(activeGroup._id);
                }}><MdDelete style={{
                  marginRight: '8px',
                  marginBottom: '-2px'
                }}/>Delete Group</p>
              )}
            </div>
          )}
        >
          <button onClick={() => {
            this.setState({ options_rodal_visible: true });
          }}>
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </Dropdown>
      </div>
    );
  }
}

export default TodoListHeader;