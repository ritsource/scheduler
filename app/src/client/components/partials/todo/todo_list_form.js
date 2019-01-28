import React, { Component } from 'react';
// import Datepicker from 'awesome-react-datepicker';

class TodoListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  render() {
    return (
      <form className='any-list-comp-bottom-form-999' onSubmit={async (e) => {
        e.preventDefault();
        await this.props.asyncPostEvent({
          title: this.state.title,
          _group: this.props.activeGroup._id,
          hex_color: this.props.activeGroup.hex_color
        });
        this.setState({ title: '' });
        scrollToBottom('#the-event-list-inside-container');
      }}>
        <input
          name='title'
          autoComplete='off'
          className=''
          placeholder='+ Add a Task'
          value={this.state.title}
          onChange={(e) => {
            this.setState({ title: e.target.value });
          }}
        />
        {this.state.title !== '' && (
          <button name='Add a new Event'
            className='any-list-comp-form-submit-btn-003'
            type='submit'
          >Add</button>
        )}
      </form>
    );
  }
}

export default TodoListForm;