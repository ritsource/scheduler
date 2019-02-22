import React from 'react';
import Dropdown from 'react-dropdown-modal';

const EnsureDeletionComp = (props) => {
  return (
    <Dropdown
      visible={props.visible}
      onButtonClick={() => {}}
      // preventDefaultClose={true}
      onClose={props.onClose}
      showArrow={false}
      arrowPosition={{ right: '0px' }}
      centerPositioning={true}
      modalBackground='var(--background-color)'
      backgroundMaskColor='var(--modal-mask-color)'
      customZIndex={30}
      animation={true}
      animeType='slideDown'
      animeDuration={300}
      modalBorderRadius='2px'
      modalContent={() => (
        <div className='ensure-deletion-comp-000'>
          <p>{props.message}</p>
          <div className='ensure-deletion-btn-div-002'>
            <button name='Cancel Deletion' onClick={props.onCancel}>Cancel</button>
            <button name='Delete it'
              className='ensure-deletion-del-btn-003'
              onClick={async () => {
              props.onCancel();
              await props.onDelete();
            }}>Delete</button>
          </div>
        </div>
      )}
    >
      {props.children}
    </Dropdown>
  )
}

export default EnsureDeletionComp;