import React from 'react';

import CustomRodalComp from '../reusables/custom_rodal';

class TodoListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options_rodal_visible: false
    };
  }

  render() {
    return (
      <div className='list-002-header'>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.asyncEditGroup(
            this.props.activeGroup._id,
            { title: this.props.listTitle }
          ).then(() => {
            if (document) document.querySelector('#list-002-header-input-inside-form').blur();
          });
        }}>
          <input
            id='list-002-header-input-inside-form'
            name='listname'
            autoComplete='off'
            className={`
              ${(this.props.listTitle === '') && 'list-004-invalid-input'}
              ${!this.props.showFormButton && 'list-004-w-se-g-input'}
            `}
            value={this.props.listTitle}
            onChange={(e) => {
              this.props.setParentState({ listTitle: e.target.value });
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
              <i style={{ color: this.props.activeGroup.hex_color }} className="far fa-edit"></i>
              Rename
            </p>

            {!this.props.activeGroup._isPermanent && (
              <p onClick={() => {
                this.setState({ options_rodal_visible: false });
                this.props.asyncDeleteGroup(this.props.activeGroup._id);
              }}>
                <i className="far fa-trash-alt"
                  style={{ color: this.props.activeGroup.hex_color, marginRight: '8px' }}
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