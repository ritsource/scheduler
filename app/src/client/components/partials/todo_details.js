import React from "react";

class TodoDetailsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
    }
  }

  componentWillReceiveProps(nextProps) {
    const activeGroup = nextProps.activeGroup;
    if (activeGroup && activeGroup.title !== this.state.title) {
      this.setState({ title: activeGroup.title });
    }
  }
  
  render() {
    const activeEvent = this.props.activeEvent;

    return (
      <div>TodoDetailsComp</div>
    );
  }
}

export default TodoDetailsComp;