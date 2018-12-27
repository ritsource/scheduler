import React from 'react';

import CustomRodalComp from '../reusables/custom_rodal';

class TodoListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
      options_rodal_visible: false
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
        
        <button onClick={() => {
          this.setState({ options_rodal_visible: true });
        }}>
          <i className="fas fa-ellipsis-h"></i>
        </button>

        <CustomRodalComp
          borderRadius='0px'
          marginTop='126px'
          right='30px'
          visible={this.state.options_rodal_visible}
          toggleVisibility={() => {
            this.setState({ options_rodal_visible: false });
          }}
        >
          <div className='list-002-header-rodal-content'>
            <p onClick={() => {
              this.setState({ options_rodal_visible: false });
              if (document) document.querySelector('#list-002-header-input-inside-form').focus();
            }}>
              <i style={{ color: activeGroup.hex_color }} className="far fa-edit"></i>
              Rename
            </p>

            {!activeGroup._isPermanent && (
              <p onClick={() => {
                this.setState({ options_rodal_visible: false });
                this.props.asyncDeleteGroup(activeGroup._id);
              }}>
                <i className="far fa-trash-alt"
                  style={{ color: activeGroup.hex_color, marginRight: '8px' }}
                ></i>
                Delete Group
              </p>
            )}
          </div>
        </CustomRodalComp>
      </div>
    );
  }
}

export default TodoListHeader;