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
            <button onClick={props.onCancel}>Cancel</button>
            <button className='ensure-deletion-del-btn-003' onClick={async () => {
              await props.onDelete();
              props.onCancel();
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