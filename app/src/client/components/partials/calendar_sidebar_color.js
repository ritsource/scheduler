import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IoIosBrush } from 'react-icons/io';

import { asyncAddCustomColor } from '../../actions/auth_actions';

class CalendarSidebarColorComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_color_hex: '#d4e1f4',
      input_visible: true,
      submit_error: false
    }
  }

  renderColorPreview() {
    return (
      <div
        style={{
          background: this.state.new_color_hex,
          width: '16px',
          height: '16px',
          marginRight: '5px'
        }}
      ></div>
    );
  }

  render() {
    return (
      <div>
        <p className='any-dropdown-content-item-999' onClick={(e) => {
          e.stopPropagation();
        }}>
          <IoIosBrush style={{ marginRight: '8px', marginBottom: '-2px' }}/>
          Color
        </p>

        <p style={{ padding: '0px 15px', maxWidth: '156px' }}>
          {this.props.color_options.map((hexVal, i) => {
            return (
              <span
                key={i}
                className='calendar-sidebar-color-spans-002'
                onClick={async () => {
                  await this.props.changeColorFunc(hexVal);
                }}
                style={{ background: hexVal }}
              ></span>
            );
          })}
        </p>

        {this.state.input_visible ? (
          <form style={{ maxWidth: '145px' }}
            className='calendar-sidebar-color-form-002'
            onSubmit={async (e) => {
              e.preventDefault();
              const value = this.state.new_color_hex;
              if (value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
                try {
                  const ret = await this.props.asyncAddCustomColor(value);
                  this.setState({ submit_error: false });
                  console.log('POSTED');                  
                } catch (error) {
                  this.setState({ submit_error: 'Something went wrong' });
                }
              } else {
                this.setState({ submit_error: 'Only hex-codes' });
              }
            }}
          >
            {this.state.new_color_hex && this.renderColorPreview()}
            <input
              type='text'
              placeholder='Hex value'
              onClick={(e) => e.stopPropagation()} 
              value={this.state.new_color_hex}
              onChange={(e) => {
                this.setState({ new_color_hex: e.target.value });
              }}
            />
          </form>
        ) : (
          <p onClick={() => this.setState({ input_visible: true })}>+</p>
        )}

        {this.state.submit_error && (
          <p className='calendar-sidebar-color-error_message'>{this.state.submit_error}</p>
        )}
        
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  asyncAddCustomColor: (xyz) => dispatch(asyncAddCustomColor(xyz))
});

export default connect(null, mapDispatchToProps)(CalendarSidebarColorComp);