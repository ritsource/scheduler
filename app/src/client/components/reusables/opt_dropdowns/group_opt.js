import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown-modal';
import { IoIosBrush } from 'react-icons/io';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { FaEllipsisV } from 'react-icons/fa';

import SubOptColorComp from './sub_opt_color';
import EnsureDeletionComp from '../ensure_deletion';

export const GroupOptDropdownComp = (props) => {
  const [ askforDelete, setAskforDelete ] = useState(false);
  const [ askforDelete_close, setAskforDelete_close ] = useState(false);
  const [ color_panel, setColorPanelState ] = useState({
    visible: false,
    screenX: null,
    screenY: null,
  });

  const { group } = props;

  return (
    <Dropdown
      visible={props.dropdown_visible}
      onButtonClick={(e) => {          
        props.showDropdown(e.screenX, e.screenY, window ? (window.outerHeight - window.innerHeight) : 0);
      }}
      onClose={props.hideDropdown}
      preventDefaultClose={false}
      showArrow={false}
      arrowPosition={{ right: '0px' }}
      position={props.positionObj}
      modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
      modalBorder={false}
      modalContent={() => (
        <div>
          <div className='any-dropdown-content-item-999' onClick={props.onRenameClick}>
            <MdModeEdit style={{
              marginRight: '8px',
              marginBottom: '-2px'
            }}/>Rename
          </div>

          {!group._isPermanent && (
            <EnsureDeletionComp
              visible={askforDelete}
              message='Are you sure you want to delete the group?'
              onClose={() => {
                // setState({ askforDelete_close: true, askforDelete: false });
                setAskforDelete(false);
                setAskforDelete_close(true);
                setTimeout(() => {
                  props.hideDropdown();
                  // setState({ askforDelete_close: false });
                  setAskforDelete_close(false);
                }, 300);
              }}
              onDelete={() => props.asyncDeleteGroup(group._id)}
              onCancel={() => {
                setAskforDelete(true);
                setTimeout(() => {
                  setAskforDelete_close(false);
                }, 300);
              }}
            >
              <div className='any-dropdown-content-item-999' onClick={(e) => {
                e.stopPropagation();
                setAskforDelete(true);
              }}><MdDelete style={{
                marginRight: '8px',
                marginBottom: '-2px'
              }}/>Delete Group</div>
            </EnsureDeletionComp>
          )}
  
          <Dropdown
            visible={color_panel.visible}
            onButtonClick={(e) => {
              e.stopPropagation();
              setColorPanelState({ screenX: e.screenX, screenY: e.screenY, visible: true });
              // console.log({ screenX: e.screenX, screenY: e.screenY, visible: true });              
            }}
            onClose={() => {
              setColorPanelState({ screenX: null, screenY: null, visible: false });
              props.hideDropdown();
            }}
            showArrow={false}
            position={props.calendar_sidebar_item ? {
              left: `calc(${color_panel.screenX}px - 8px)`,
              bottom: `calc(100vh - ${color_panel.screenY - props.windowHeightDiff + 8}px)`
            } : {
              left: (color_panel.screenX - 185 + 8),
              bottom: `calc(100vh - ${color_panel.screenY - props.windowHeightDiff + 8}px)`
            }}
            modalBackground='var(--background-color)'
            modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
            modalBorder={false}
            customZIndex={21}
            modalContent={() => (
              <SubOptColorComp
                hex_color={props.hex_color}
                color_options={props.color_options}
                changeColorFunc={props.changeColorFunc}
              />
            )}
          >
            <div className='any-dropdown-content-item-999' onClick={(e) => {}}>
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

};

export default GroupOptDropdownComp;