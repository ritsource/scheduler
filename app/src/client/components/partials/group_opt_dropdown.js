import React from 'react';
import Dropdown from 'react-dropdown-modal';
import { IoIosBrush } from 'react-icons/io';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { FaEllipsisV } from 'react-icons/fa';

import CalendarSidebarColorComp from './calendar_sidebar_color';

const GreopOptDropdownComp = (props) => {
  const { group } = props;
  const { screenX, screenY, windowHeightDiff, color_panel } = props;

  return (
    <Dropdown
      visible={props.dropdown_visible}
      onButtonClick={(e) => {
        const windowHeightDiff = window ? (window.outerHeight - window.innerHeight) : 0;
        props.setParentState({ screenX: e.screenX, screenY: e.screenY, dropdown_visible: true, windowHeightDiff });
      }}pro
      onClose={() => {
        props.setParentState({ screenX: null, screenY: null, dropdown_visible: false });
      }}
      preventDefaultClose={false}
      showArrow={false}
      arrowPosition={{ right: '0px' }}
      position={props.positionObj}
      modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
      modalBorder={false}
      modalContent={() => (
        <div>
          <div className='any-dropdown-content-item-999' onClick={async (e) => {
            e.stopPropagation();
            await props.setParentState({ dropdown_visible: false, input_disable: false });
            if (document) {             
              document.querySelector(`#calendar-sidebar-item-input-inside-form-${group._id}`).focus();
            }
          }}><MdModeEdit style={{
            marginRight: '8px',
            marginBottom: '-2px'
          }}/>Rename</div>

          {!group._isPermanent && (
            <div className='any-dropdown-content-item-999' onClick={(e) => {
              e.stopPropagation();
              props.setParentState({ dropdown_visible: false });
              props.asyncDeleteGroup(group._id);
            }}><MdDelete style={{
              marginRight: '8px',
              marginBottom: '-2px'
            }}/>Delete Group</div>
          )}
  
          <Dropdown
            visible={props.color_panel.visible}
            // onButtonClick={(e) => {
            //   const tempState = { screenX: e.screenX, screenY: e.screenY, visible: true };
            //   props.setParentState({ color_panel: tempState });
            // }}
            onClose={() => {
              const tempState = { screenX: null, screenY: null, visible: false };
              props.setParentState({ color_panel: tempState });
            }}
            showArrow={false}
            position={props.subPositionObj}
            modalBackground='var(--background-color)'
            modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
            modalBorder={false}
            customZIndex={21}
            modalContent={() => (
              <CalendarSidebarColorComp
                color_options={props.color_options}
                changeColorFunc={props.changeColorFunc}
              />
            )}
          >
            <div className='any-dropdown-content-item-999' onClick={(e) => {
              e.stopPropagation();
              const tempState = { screenX: e.screenX, screenY: e.screenY, visible: true };
              props.setParentState({ color_panel: tempState });
            }}>
              <IoIosBrush style={{ marginRight: '8px', marginBottom: '-2px' }}/>
              Color
            </div>
          </Dropdown>              
        </div>
      )}
    >
      {props.children}
    </Dropdown>
  );
}

export default GreopOptDropdownComp;