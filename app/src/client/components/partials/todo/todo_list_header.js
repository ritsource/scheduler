import React from 'react';
import { FaEllipsisH } from 'react-icons/fa';

import GroupOptDropdownComp from '../../reusables/opt_dropdowns/group_opt';

class TodoListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || ' ',
      dropdown_visible: false,
      screenX: null,
      screenY: null,
      windowHeightDiff: 0,
      color_panel: {
        visible: false,
        screenX: null,
        screenY: null,
      }
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
    const { screenX, screenY, windowHeightDiff, color_panel } = this.state;

    return (
      <div className='list-002-header'>
        <form onSubmit={async (e) => {
          e.preventDefault();
          if (this.state.title !== '') {
            await this.props.asyncEditGroup(activeGroup._id, { title: this.state.title });
            if (document) document.querySelector('#list-002-header-input-inside-form').blur();
          }
        }}>
          <input
            id='list-002-header-input-inside-form'
            className='awesome-app-transparent-input-999'
            name='listname'
            autoComplete='off'
            placeholder='Title'
            value={this.state.title}
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
          />
        </form>

        {this.props.loading_anime && (
          <div style={{
            // border: '1px solid red',
            paddingRight: '32px',
            marginRight: '5px',
            marginTop: '-13px',
          }}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        )}

        <GroupOptDropdownComp
          { ...this.state }
          { ...this.props }
          group={activeGroup}
          positionObj={{
            right: `calc(100vw - ${this.state.screenX}px - 8px)`,
            top: (this.state.screenY - this.state.windowHeightDiff - 8)
          }}
          subPositionObj={{
            left: (color_panel.screenX - 185 + 8),
            bottom: `calc(100vh - ${color_panel.screenY - windowHeightDiff + 8}px)`
          }}
          setParentState={(obj) => {
            this.setState(obj);
          }}
          onRenameClick={() => {
            if (document) document.querySelector('#list-002-header-input-inside-form').focus();
          }}
        >
          <button name='View Group Options'
            className='calendar-sidebar-item-options-btn'
            onClick={() => {
              this.setState({ dropdown_visible: true });
            }}
          >
            <FaEllipsisH style={{
              marginBottom: '-2px'
            }} />
          </button>
        </GroupOptDropdownComp>
      </div>
    );
  }
}

export default TodoListHeader;