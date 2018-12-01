import React from 'react';

class HeaderComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <button style={{
          cursor: 'pointer',
          background: 'white',
          border: '0px solid white',
          margin: '0px 20px'
        }} onClick={this.props.toggleSidebar}>$$</button>

        <h2>Tasklendar</h2>
      </div>
    );
  }
}

export default HeaderComp;