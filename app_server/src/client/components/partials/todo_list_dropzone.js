import React from 'react';
import { DropTarget } from 'react-dnd';

class TodoListDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    }
  }

  render() {
    return this.props.connectDropTarget(
      <div
        className={`
          todo-list-000-dropzone
          ${this.state.isHover && 'list-001-dropzone-on-drag-over'}
          ${this.props.last && 'list-001-dropzone-last'}
        `}
        onDragEnter={() => this.setState({ isHover: true })}
        onDragLeave={() => this.setState({ isHover: false })}
        onDrop={() => this.setState({ isHover: false })}
      >
        <div></div>
      </div>
    );
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default DropTarget('todo_list_item', {}, collect)(TodoListDropzone);