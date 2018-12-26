import React from 'react';
import Rodal from 'rodal';

const CustomRodalComp = (props) => {

  return (
    <Rodal
      className='custom-rodal-000'
      enterAnimation={props.enterAnimation || 'slideDown'}
      leaveAnimation={props.leaveAnimation || 'slideDown'}
      customMaskStyles={props.customMaskStyles || { opacity: 0 }}
      showMask={true}
      showCloseButton={false}
      visible={props.visible}
      onClose={props.toggleVisibility}
      customStyles={{
        border: props.border || '0px solid #bbb',
        borderBottom: props.borderBottom || '1px solid #bbb',
        height: 'auto',
        width: props.width || 'auto',
        top: 'auto',
        left: 'auto',
        right: props.right || '5%',
        bottom: 'auto',
        marginTop: props.marginTop || '60px',
        padding: props.padding || '0px',
        borderRadius: props.borderRadius || '4px',
        boxShadow: 'none',
        // zIndex: 10
      }}
    >
      {props.children}
    </Rodal>
  );
}

export default CustomRodalComp;