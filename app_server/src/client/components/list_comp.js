import React from 'react';

class ListComp extends React.Component {
  render() {
    return (
      <div>
        <div>List...</div>
        {this.props.projects.map((project, i) => (
          <div key={i}>{i + 1}. {project.title}</div>
        ))}
      </div>
    );
  }
}

export default ListComp;