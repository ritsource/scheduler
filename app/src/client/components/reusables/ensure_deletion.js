import React from 'react';
import Dropdown from 'react-dropdown-modal';

const EnsureDeletionComp = (props) => {
  return (
    <Dropdown
      visible={props.visible}
      onButtonClick={() => {}}
      onClose={props.onCancel}
      showArrow={false}
      arrowPosition={{ right: '0px' }}
      centerPositioning={true}
      // modalBackground
      backgroundMaskColor='rgba(1, 1, 1, 0.2)'
      customZIndex={30}
      animation={true}
      animeType='slideDown'
      animeDuration={300}
      modalBorderRadius='2px'
      modalContent={() => (
        <div className='ensure-deletion-comp-000'>
          <p>{props.message}</p>
          <button onClick={props.onCancel}>Cancel</button>
          <button onClick={async () => {
            await props.onDelete();
            props.onCancel();
          }}>Delete</button>
        </div>
      )}
    >
      {props.children}
    </Dropdown>
  )
}

export default EnsureDeletionComp;